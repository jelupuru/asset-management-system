/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaSettings } from '@nocobase/client';
import { editTabItemSettingsItem, removeTabItemSettingsItem } from '../../MobileTabBar.Item';

export const mobileTabBarPageSettings = new SchemaSettings({
  name: 'mobile:tab-bar:page',
  items: [
    editTabItemSettingsItem(),
    {
      name: 'divider',
      type: 'divider',
    },
    removeTabItemSettingsItem,
  ],
});
