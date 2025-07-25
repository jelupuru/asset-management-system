/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaInitializer } from '@nocobase/client';
import { WorkbenchLinkActionSchemaInitializerItem } from './WorkbenchLinkActionSchemaInitializerItem';

export const workbenchConfigureActions = new SchemaInitializer({
  name: 'workbench:configureActions',
  title: '{{t("Configure actions")}}',
  // 插入位置
  insertPosition: 'beforeEnd',
  items: [
    {
      name: 'link',
      title: '{{t("Link")}}',
      Component: WorkbenchLinkActionSchemaInitializerItem,
    },
  ],
});
