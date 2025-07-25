/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CollectionOptions } from '@nocobase/database';

export default {
  dumpRules: 'required',
  shared: true,
  name: 'fields',
  autoGenId: false,
  model: 'FieldModel',
  timestamps: false,
  sortable: {
    name: 'sort',
    scopeKey: 'collectionName',
  },
  indexes: [
    {
      type: 'UNIQUE',
      fields: ['collectionName', 'name'],
    },
  ],
  fields: [
    {
      type: 'uid',
      name: 'key',
      primaryKey: true,
    },
    {
      type: 'uid',
      name: 'name',
      prefix: 'f_',
    },
    {
      type: 'string',
      name: 'type',
    },
    {
      type: 'string',
      name: 'interface',
      allowNull: true,
    },
    {
      type: 'string',
      name: 'description',
      allowNull: true,
    },
    {
      type: 'belongsTo',
      name: 'collection',
      target: 'collections',
      foreignKey: 'collectionName',
      targetKey: 'name',
      onDelete: 'CASCADE',
    },
    {
      type: 'hasMany',
      name: 'children',
      target: 'fields',
      sourceKey: 'key',
      foreignKey: 'parentKey',
    },
    {
      type: 'hasOne',
      name: 'reverseField',
      target: 'fields',
      sourceKey: 'key',
      foreignKey: 'reverseKey',
    },
    {
      type: 'json',
      name: 'options',
      defaultValue: {},
      translation: true,
    },
  ],
} as CollectionOptions;
