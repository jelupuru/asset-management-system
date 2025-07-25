/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { deprecatedPrintActionSettings, printActionSettings } from './PrintAction.Settings';
import { PrintActionPluginProvider } from './PrintActionPluginProvider';
export class PluginActionPrintClient extends Plugin {
  async load() {
    this.app.use(PrintActionPluginProvider);
    this.app.schemaSettingsManager.add(deprecatedPrintActionSettings);
    this.app.schemaSettingsManager.add(printActionSettings);

    const initializerData = {
      title: '{{t("Print")}}',
      Component: 'PrintActionInitializer',
      schema: {
        'x-component': 'Action',
        'x-toolbar': 'ActionSchemaToolbar',
        'x-settings': 'actionSettings:print',
        'x-action': 'print',
      },
    };

    this.app.schemaInitializerManager.addItem('details:configureActions', 'enableActions.print', initializerData);
    this.app.schemaInitializerManager.addItem('CalendarFormActionInitializers', 'enableActions.print', initializerData);
  }
}

export default PluginActionPrintClient;
