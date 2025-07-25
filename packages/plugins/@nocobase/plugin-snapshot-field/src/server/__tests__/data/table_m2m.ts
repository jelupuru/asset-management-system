/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const table_m2m = {
  logging: true,
  autoGenId: true,
  createdBy: true,
  updatedBy: false,
  createdAt: false,
  updatedAt: false,
  sortable: true,
  name: 'table_m2m',
  template: 'general',
  fields: [
    {
      name: 'id',
      type: 'bigInt',
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      uiSchema: { type: 'number', title: '{{t("ID")}}', 'x-component': 'InputNumber', 'x-read-pretty': true },
      interface: 'id',
    },
    {
      name: 'createdBy',
      interface: 'createdBy',
      type: 'belongsTo',
      target: 'users',
      foreignKey: 'createdById',
      uiSchema: {
        type: 'object',
        title: '{{t("Created by")}}',
        'x-component': 'RecordPicker',
        'x-component-props': { fieldNames: { value: 'id', label: 'nickname' } },
        'x-read-pretty': true,
      },
    },
  ],
  title: 'table_m2m',
};
