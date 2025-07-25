/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const field_o2m = {
  foreignKey: 'fk_table_b',
  onDelete: 'SET NULL',
  name: 'field_o2m',
  type: 'hasMany',
  uiSchema: {
    'x-component': 'RecordPicker',
    'x-component-props': { multiple: true, fieldNames: { label: 'id', value: 'id' } },
    title: 'field_o2m',
  },
  interface: 'o2m',
  target: 'table_a',
  collectionName: 'table_b',
};
