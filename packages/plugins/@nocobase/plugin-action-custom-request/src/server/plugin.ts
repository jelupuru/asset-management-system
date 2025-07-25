/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Logger, LoggerOptions } from '@nocobase/logger';
import { InstallOptions, Plugin } from '@nocobase/server';
import { resolve } from 'path';
import { listByCurrentRole } from './actions/listByCurrentRole';
import { send } from './actions/send';

export class PluginActionCustomRequestServer extends Plugin {
  logger: Logger;

  afterAdd() {}

  beforeLoad() {
    this.logger = this.getLogger();
  }

  getLogger(): Logger {
    const logger = this.createLogger({
      dirname: 'custom-request',
      filename: '%DATE%.log',
    } as LoggerOptions);

    return logger;
  }

  async load() {
    await this.importCollections(resolve(__dirname, 'collections'));

    this.app.resource({
      name: 'customRequests',
      actions: {
        send: send.bind(this),
        listByCurrentRole,
      },
    });

    this.app.acl.registerSnippet({
      name: `ui.${this.name}`,
      actions: ['customRequests:*', 'roles:list'],
    });

    this.app.acl.allow('customRequests', ['send', 'listByCurrentRole'], 'loggedIn');
  }

  async install(options?: InstallOptions) {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginActionCustomRequestServer;
