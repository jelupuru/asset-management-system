/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import PluginFileManagerServer from '@nocobase/plugin-file-manager';
import { InstallOptions, Plugin } from '@nocobase/server';
import { resolve } from 'path';

export class PluginSystemSettingsServer extends Plugin {
  getInitAppLang(options) {
    return options?.cliArgs?.[0]?.opts?.lang || process.env.INIT_APP_LANG || 'en-US';
  }

  async install(options?: InstallOptions) {
    const plugin = this.pm.get('file-manager') as PluginFileManagerServer;
    const logo = plugin
      ? await plugin.createFileRecord({
          filePath: resolve(__dirname, './logo.png'),
          collectionName: 'attachments',
          values: {
            title: 'nocobase-logo',
            extname: '.png',
            mimetype: 'image/png',
          },
        })
      : {
          title: 'nocobase-logo',
          filename: '682e5ad037dd02a0fe4800a3e91c283b.png',
          extname: '.png',
          mimetype: 'image/png',
          url: '/nocobase.png',
        };
    await this.db.getRepository('systemSettings').create({
      values: {
        title: 'NocoBase',
        appLang: this.getInitAppLang(options),
        enabledLanguages: [this.getInitAppLang(options)],
        logo,
      },
    });
  }

  beforeLoad() {
    const cmd = this.app.findCommand('install');
    if (cmd) {
      cmd.option('-l, --lang [lang]');
    }

    this.app.acl.registerSnippet({
      name: `pm.${this.name}.system-settings`,
      actions: ['systemSettings:update'],
    });
  }

  async load() {
    await this.importCollections(resolve(__dirname, 'collections'));

    this.app.acl.addFixedParams('systemSettings', 'destroy', () => {
      return {
        'id.$ne': 1,
      };
    });

    this.app.acl.allow('systemSettings', 'get', 'public');
  }
}

export default PluginSystemSettingsServer;
