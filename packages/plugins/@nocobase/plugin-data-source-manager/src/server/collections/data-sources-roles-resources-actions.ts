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
  dumpRules: 'required',
  name: 'dataSourcesRolesResourcesActions',
  model: 'DataSourcesRolesResourcesActionModel',
  fields: [
    {
      type: 'belongsTo',
      name: 'resource',
      foreignKey: 'rolesResourceId',
      target: 'dataSourcesRolesResources',
    },
    {
      type: 'string',
      name: 'name',
    },
    {
      type: 'array',
      name: 'fields',
      defaultValue: [],
    },
    {
      type: 'belongsTo',
      name: 'scope',
      target: 'dataSourcesRolesResourcesScopes',
      onDelete: 'RESTRICT',
      foreignKey: 'scopeId',
    },
  ],
});
