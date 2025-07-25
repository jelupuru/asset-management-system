/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaInitializer, useSchemaInitializerRender } from '@nocobase/client';
import { mobileTabBarSchemaInitializerItem, mobileTabBarLinkInitializerItem } from './types';

export const mobileTabBarInitializer = new SchemaInitializer({
  name: 'mobile:tab-bar',
  icon: 'PlusOutlined',
  style: {
    marginRight: 12,
  },
  items: [mobileTabBarSchemaInitializerItem, mobileTabBarLinkInitializerItem],
});

export const MobileTabBarInitializer = () => {
  const { render } = useSchemaInitializerRender(mobileTabBarInitializer.name);
  return render({ 'data-testid': 'schema-initializer-MobileTabBar' });
};
