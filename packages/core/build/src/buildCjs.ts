/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { build } from 'tsup';
import fg from 'fast-glob';
import path from 'path';
import chalk from 'chalk';
import { globExcludeFiles, EsbuildSupportExts } from './constant';
import { PkgLog, UserConfig } from './utils';

export function buildCjs(cwd: string, userConfig: UserConfig, sourcemap: boolean = false, log: PkgLog) {
  log('build cjs');

  const entry = fg.globSync(['src/**', ...globExcludeFiles], { cwd, absolute: true });
  const outDir = path.join(cwd, 'lib');
  const otherExts = Array.from(new Set(entry.map((item) => path.extname(item)).filter((item) => !EsbuildSupportExts.includes(item))));
  if (otherExts.length) {
    log('%s will not be processed, only be copied to the lib directory.', chalk.yellow(otherExts.join(',')));
  }
  return build(userConfig.modifyTsupConfig({
    entry,
    splitting: false,
    clean: true,
    bundle: false,
    silent: true,
    sourcemap,
    treeshake: false,
    target: 'node16',
    keepNames: true,
    outDir,
    loader: {
      ...otherExts.reduce((prev, cur) => ({ ...prev, [cur]: 'copy' }), {}),
      '.json': 'copy',
    },
    format: 'cjs',
    skipNodeModulesBundle: true,
  }));
}
