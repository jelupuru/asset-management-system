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
  name: 'dataSources',
  model: 'DataSourceModel',
  autoGenId: false,
  shared: true,
  dumpRules: 'required',
  fields: [
    {
      type: 'string',
      name: 'key',
      primaryKey: true,
    },
    {
      type: 'string',
      name: 'displayName',
    },
    {
      type: 'string',
      name: 'type',
    },
    {
      type: 'json',
      name: 'options',
    },
    {
      type: 'boolean',
      name: 'enabled',
      defaultValue: true,
    },
    {
      type: 'boolean',
      name: 'fixed',
      defaultValue: false,
    },
    {
      type: 'hasMany',
      name: 'collections',
      target: 'dataSourcesCollections',
      foreignKey: 'dataSourceKey',
      targetKey: 'name',
    },
    {
      type: 'hasMany',
      name: 'rolesResourcesScopes',
      target: 'dataSourcesRolesResourcesScopes',
      foreignKey: 'dataSourceKey',
    },
  ],
});
