/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Context, Next } from '@nocobase/actions';
import { getLoggerFilePath } from '@nocobase/logger';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import stream from 'stream';
import { pack } from 'tar-fs';
import zlib from 'zlib';
import lodash from 'lodash';

const envVars = [
  'APP_ENV',
  'APP_PORT',
  'API_BASE_PATH',
  'API_BASE_URL',
  'DB_DIALECT',
  'DB_TABLE_PREFIX',
  'DB_UNDERSCORED',
  'DB_TIMEZONE',
  'DB_LOGGING',
  'LOGGER_TRANSPORT',
  'LOGGER_LEVEL',
];

const getLastestLogs = async (path: string) => {
  const files = await readdir(path);
  const prefixes = ['request', 'sql', 'system', 'system_error'];
  const logs = files.filter((file) => file.endsWith('.log') && prefixes.some((prefix) => file.startsWith(prefix)));
  if (!logs.length) {
    return [];
  }
  const mtime = async (file: string) => {
    const info = await stat(join(path, file));
    return [file, info.mtime];
  };
  const logsWithTime = await Promise.all(logs.map(mtime));
  const getLatestLog = (prefix: string) => {
    const logs = logsWithTime.filter((file) => (file[0] as string).startsWith(prefix));
    if (!logs.length) {
      return null;
    }
    return logs.reduce((a, b) => (a[1] > b[1] ? a : b))[0] as string;
  };
  return prefixes.map(getLatestLog).filter((file) => file);
};

const tarFiles = (path: string, files: string[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    const passthrough = new stream.PassThrough();
    const gz = zlib.createGzip();
    pack(path, {
      entries: files,
    })
      .on('data', (chunk) => {
        passthrough.write(chunk);
      })
      .on('end', () => {
        passthrough.end();
      })
      .on('error', (err) => reject(err));
    passthrough
      .on('data', (chunk) => {
        gz.write(chunk);
      })
      .on('end', () => {
        gz.end();
        resolve(gz);
      })
      .on('error', (err) => reject(err));
    gz.on('error', (err) => reject(err));
  });
};

export default {
  name: 'logger',
  actions: {
    list: async (ctx: Context, next: Next) => {
      const path = getLoggerFilePath(ctx.app.name || 'main');
      const readDir = async (path: string) => {
        const fileTree = [];
        try {
          const files = await readdir(path, { withFileTypes: true });
          for (const file of files) {
            if (file.isDirectory()) {
              const subFiles = await readDir(join(path, file.name));
              if (!subFiles.length) {
                continue;
              }
              fileTree.push({
                name: file.name,
                files: subFiles,
              });
            } else if (file.name.endsWith('.log')) {
              fileTree.push(file.name);
            }
          }
          return fileTree;
        } catch (err) {
          ctx.log.error('readDir error', { err, path });
          return [];
        }
      };
      const files = await readDir(path);
      ctx.body = files;
      await next();
    },
    download: async (ctx: Context, next: Next) => {
      const path = getLoggerFilePath(ctx.app.name || 'main');
      let { files = [] } = ctx.action.params.values || {};
      const invalid = files.some((file: string) => !file.endsWith('.log'));
      if (invalid) {
        ctx.throw(400, ctx.t('Invalid file type: ') + invalid);
      }
      files = files.map((file: string) => {
        if (file.startsWith('/')) {
          return file.slice(1);
        }
        return file;
      });
      try {
        ctx.attachment('logs.tar.gz');
        ctx.body = await tarFiles(path, files);
      } catch (err) {
        ctx.log.error(`download error: ${err.message}`, { files, err: err.stack });
        ctx.throw(500, ctx.t('Download logs failed.'));
      }
      await next();
    },
    collect: async (ctx: Context, next: Next) => {
      const { error, ...info } = ctx.action.params.values || {};
      const { message, ...e } = error || {};
      ctx.log.error({ message: `Diagnosis, frontend error, ${message}`, ...e });
      ctx.log.error(`Diagnostic information`, info);
      ctx.log.error('Diagnosis, environment variables', lodash.pick(process.env, envVars));

      const path = getLoggerFilePath(ctx.app.name || 'main');
      const files = await getLastestLogs(path);
      if (!files.length) {
        ctx.throw(
          404,
          ctx.t('No log files found. Please check the LOGGER_TRANSPORTS environment variable configuration.'),
        );
      }
      try {
        ctx.attachment('logs.tar.gz');
        ctx.body = await tarFiles(path, files);
      } catch (err) {
        ctx.log.error(`download error: ${err.message}`, { files, err: err.stack });
        ctx.throw(500, ctx.t('Download logs failed.'));
      }
      await next();
    },
  },
};
