/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { SchemaInitializerItem, useSchemaInitializer, useSchemaInitializerItem } from '@nocobase/client';

export const MMenuBlockInitializer = () => {
  const itemConfig = useSchemaInitializerItem();
  const { insert } = useSchemaInitializer();
  return (
    <SchemaInitializerItem
      icon={<MenuOutlined />}
      onClick={async () => {
        insert({
          type: 'void',
          'x-component': 'MMenu',
          'x-designer': 'MMenu.Designer',
          'x-component-props': {},
        });
      }}
      {...itemConfig}
    />
  );
};
