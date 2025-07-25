/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { InstallOptions, Plugin } from '@nocobase/server';

export class HelloPlugin extends Plugin {
  beforeLoad() {
    // TODO
  }

  async load() {
    // TODO
    // Visit: http://localhost:13000/api/testHello:getInfo
    this.app.resource({
      name: 'testHello',
      actions: {
        async getInfo(ctx, next) {
          ctx.body = `Hello hello!`;
          next();
        },
      },
    });
    this.app.acl.allow('testHello', 'getInfo');
  }

  async disable() {
    // this.app.resourcer.removeResource('testHello');
  }

  async install(options: InstallOptions) {
    // TODO
  }
}

export default HelloPlugin;
