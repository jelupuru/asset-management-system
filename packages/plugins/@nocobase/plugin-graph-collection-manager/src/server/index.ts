/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/server';

export class PluginGraphCollectionManagerServer extends Plugin {
  async load() {
    this.app.acl.registerSnippet({
      name: 'pm.data-source-manager.graph-collection-manager',
      actions: ['graphPositions:*'],
    });
  }
}

export default PluginGraphCollectionManagerServer;
