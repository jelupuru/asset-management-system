/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'dataSourcesFields',
  model: 'DataSourcesFieldModel',
  dumpRules: 'required',
  shared: true,
  autoGenId: false,
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['name', 'collectionName', 'dataSourceKey'],
    },
  ],
  fields: [
    {
      type: 'uid',
      name: 'key',
      primaryKey: true,
    },
    {
      type: 'string',
      name: 'name',
    },
    {
      type: 'string',
      name: 'collectionName',
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
      type: 'json',
      name: 'uiSchema',
      default: {},
    },
    {
      type: 'belongsTo',
      name: 'collection',
      target: 'dataSourcesCollections',
      foreignKey: 'collectionKey',
      targetKey: 'key',
      onDelete: 'CASCADE',
    },
    {
      type: 'belongsTo',
      name: 'dataSources',
      foreignKey: 'dataSourceKey',
      onDelete: 'CASCADE',
    },
    {
      type: 'json',
      name: 'options',
      defaultValue: {},
      translation: true,
    },
  ],
});
