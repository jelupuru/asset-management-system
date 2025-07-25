/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { InstallOptions, Plugin } from '@nocobase/server';
import logger from './resourcer/logger';

export class PluginLoggerServer extends Plugin {
  afterAdd() {}

  beforeLoad() {}

  async load() {
    this.app.resource(logger);
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.logger`,
      actions: ['logger:*'],
    });
  }

  async install(options?: InstallOptions) {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginLoggerServer;
