/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginDisablePmAddServer extends Plugin {
  beforeLoad() {
    // TODO
  }

  async load() {
    this.app.resourcer.use(async (ctx, next) => {
      const { resourceName, actionName } = ctx.action;
      if (resourceName === 'pm' && actionName === 'add') {
        ctx.throw(403, 'The current environment does not allow adding plugins online');
      }
      await next();
    });
  }

  async disable() {
    // this.app.resourcer.removeResource('testHello');
  }

  async install(options: InstallOptions) {
    // TODO
  }
}

export default PluginDisablePmAddServer;
