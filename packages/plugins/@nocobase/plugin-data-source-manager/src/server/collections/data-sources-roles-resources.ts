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
  name: 'dataSourcesRolesResources',
  model: 'DataSourcesRolesResourcesModel',
  fields: [
    {
      name: 'dataSourceKey',
      type: 'string',
      defaultValue: 'main',
    },
    {
      type: 'belongsTo',
      name: 'dataSources',
      foreignKey: 'dataSourceKey',
      onDelete: 'CASCADE',
    },
    {
      type: 'belongsTo',
      name: 'role',
      target: 'roles',
      foreignKey: 'roleName',
      onDelete: 'CASCADE',
    },
    {
      type: 'string',
      name: 'name',
    },
    {
      type: 'boolean',
      name: 'usingActionsConfig',
    },
    {
      type: 'hasMany',
      name: 'actions',
      target: 'dataSourcesRolesResourcesActions',
      foreignKey: 'rolesResourceId',
    },
  ],
});
