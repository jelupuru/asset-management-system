/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { lang } from './locale';
// import { LogsDownloader } from './LogsDownloader';
import { lazy } from '@nocobase/client';
const { LogsDownloader } = lazy(() => import('./LogsDownloader'), 'LogsDownloader');

export class PluginLoggerClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    this.app.pluginSettingsManager.add('logger', {
      title: lang('Logger'),
      icon: 'FileTextOutlined',
      Component: LogsDownloader,
    });
  }
}

export default PluginLoggerClient;
