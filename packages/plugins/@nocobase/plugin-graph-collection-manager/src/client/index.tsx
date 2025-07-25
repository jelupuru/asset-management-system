/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
// import { GraphCollectionPane } from './GraphCollectionShortcut';
import { NAMESPACE } from './locale';
import { lazy } from '@nocobase/client';

const { GraphCollectionPane } = lazy(() => import('./GraphCollectionShortcut'), 'GraphCollectionPane');
export class PluginGraphCollectionPlugin extends Plugin {
  async load() {
    this.app.pluginSettingsManager.add(`data-source-manager/main.graph`, {
      title: `{{t("Graphical interface", { ns: "${NAMESPACE}" })}}`,
      Component: GraphCollectionPane,
      topLevelName: `data-source-manager/main`,
      pluginKey: NAMESPACE,
      skipAclConfigure: true,
      aclSnippet: 'pm.data-source-manager.graph-collection-manager',
    });
  }
}

export default PluginGraphCollectionPlugin;
