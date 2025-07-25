/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin, lazy } from '@nocobase/client';
// import { Configuration } from './Configuration';
const { Configuration } = lazy(() => import('./Configuration'), 'Configuration');

export class PluginAPIKeysClient extends Plugin {
  async load() {
    this.pluginSettingsManager.add('api-keys', {
      icon: 'KeyOutlined',
      title: this.t('API keys'),
      Component: Configuration,
      aclSnippet: 'pm.api-keys.configuration',
    });
  }
}

export default PluginAPIKeysClient;
