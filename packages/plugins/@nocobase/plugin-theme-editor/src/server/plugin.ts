/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { InstallOptions, Plugin } from '@nocobase/server';
import { compact, compactDark, dark, defaultTheme } from './builtinThemes';
import { updateTheme } from './actions/update-user-theme';

export class PluginThemeEditorServer extends Plugin {
  theme: any;

  afterAdd() {}

  async beforeLoad() {}

  async load() {
    this.app.resourceManager.registerActionHandler('users:updateTheme', updateTheme);
    this.app.acl.allow('users', 'updateTheme', 'loggedIn');

    this.app.acl.allow('themeConfig', 'list', 'public');
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.themeConfig`,
      actions: ['themeConfig:*'],
    });
  }

  async install(options?: InstallOptions) {
    const themeRepo = this.db.getRepository('themeConfig');

    if (!themeRepo) {
      throw new Error(`themeConfig repository does not exist`);
    }

    if ((await themeRepo.count()) === 0) {
      await themeRepo.create({
        values: [defaultTheme, dark, compact, compactDark],
      });
    }
  }

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginThemeEditorServer;
