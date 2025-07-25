/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { LineOutlined } from '@ant-design/icons';
import React from 'react';
import { SchemaInitializerItem, useSchemaInitializer, useSchemaInitializerItem } from '../../../../application';

export const DividerFormItemInitializer = () => {
  const { insert } = useSchemaInitializer();
  const itemConfig = useSchemaInitializerItem();
  return (
    <SchemaInitializerItem
      {...itemConfig}
      icon={<LineOutlined />}
      onClick={() => {
        insert({
          type: 'void',
          'x-decorator': 'FormItem',
          'x-toolbar': 'FormItemSchemaToolbar',
          'x-settings': 'blockSettings:divider',
          'x-component': 'Divider',
          'x-component-props': {
            children: '{{t("Group")}}',
          },
        });
      }}
    />
  );
};
