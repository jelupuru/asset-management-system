/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin, SchemaComponentOptions } from '@nocobase/client';
import React from 'react';
import { MapBlockOptions } from './block';
import { mapActionInitializers, mapActionInitializers_deprecated } from './block/MapActionInitializers';
import { mapBlockSettings } from './block/MapBlock.Settings';
import { useMapBlockProps } from './block/MapBlockProvider';
// import { Configuration, Map } from './components';
import { lazy } from '@nocobase/client';
const { Configuration, Map } = lazy(() => import('./components'), 'Configuration', 'Map');

import { fields } from './fields';
import { fieldSettingsComponentMap } from './fields/fieldSettingsComponentMap';
import { NAMESPACE, generateNTemplate } from './locale';
const MapProvider = React.memo((props) => {
  return (
    <SchemaComponentOptions components={{ Map }}>
      <MapBlockOptions>{props.children}</MapBlockOptions>
    </SchemaComponentOptions>
  );
});
MapProvider.displayName = 'MapProvider';

export class PluginMapClient extends Plugin {
  async load() {
    this.app.use(MapProvider);

    this.app.dataSourceManager.addFieldInterfaces(fields);
    this.app.dataSourceManager.addFieldInterfaceGroups({
      map: {
        label: generateNTemplate('Map-based geometry'),
        order: 51,
      },
    });
    this.app.schemaInitializerManager.add(mapActionInitializers_deprecated);
    this.app.schemaInitializerManager.add(mapActionInitializers);
    this.schemaSettingsManager.add(mapBlockSettings);
    this.schemaSettingsManager.add(fieldSettingsComponentMap);

    const blockInitializers = this.app.schemaInitializerManager.get('page:addBlock');
    blockInitializers?.add('dataBlocks.map', {
      title: generateNTemplate('Map'),
      Component: 'MapBlockInitializer',
    });
    this.app.schemaInitializerManager.addItem('mobile:addBlock', 'dataBlocks.map', {
      title: generateNTemplate('Map'),
      Component: 'MapBlockInitializer',
    });
    this.app.pluginSettingsManager.add(NAMESPACE, {
      title: `{{t("Map Manager", { ns: "${NAMESPACE}" })}}`,
      icon: 'EnvironmentOutlined',
      Component: Configuration,
      aclSnippet: 'pm.map.configuration',
    });

    this.app.addScopes({
      useMapBlockProps,
    });
  }
}

export default PluginMapClient;
