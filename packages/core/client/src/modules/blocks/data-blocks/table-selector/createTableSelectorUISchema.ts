/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema } from '@formily/react';
import { uid } from '@formily/shared';

export const createTableSelectorUISchema = (options: {
  collectionName: string;
  dataSource: string;
  rowKey: string;
}): ISchema => {
  const { collectionName, dataSource, rowKey } = options;

  if (!collectionName || !dataSource || !rowKey) {
    throw new Error('collectionName, dataSource, rowKey is required');
  }

  return {
    type: 'void',
    'x-acl-action': `${collectionName}:list`,
    'x-decorator': 'TableSelectorProvider',
    'x-use-decorator-props': 'useTableSelectorDecoratorProps',
    'x-decorator-props': {
      collection: collectionName,
      dataSource,
      action: 'list',
      params: {
        pageSize: 20,
      },
      rowKey,
    },
    'x-toolbar': 'BlockSchemaToolbar',
    'x-settings': 'blockSettings:tableSelector',
    'x-component': 'CardItem',
    properties: {
      [uid()]: {
        type: 'void',
        'x-initializer': 'table:configureActions',
        'x-component': 'ActionBar',
        'x-component-props': {
          style: {
            marginBottom: 'var(--nb-spacing)',
          },
        },
      },
      value: {
        type: 'array',
        'x-initializer': 'table:configureColumns',
        'x-component': 'TableV2.Selector',
        'x-use-component-props': 'useTableSelectorProps',
        'x-component-props': {
          rowSelection: {
            type: 'checkbox',
          },
        },
      },
    },
  };
};
