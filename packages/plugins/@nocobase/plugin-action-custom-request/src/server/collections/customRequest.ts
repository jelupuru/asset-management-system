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
  name: 'customRequests',
  autoGenId: false,
  fields: [
    {
      type: 'uid',
      name: 'key',
      primaryKey: true,
    },
    {
      type: 'belongsToMany',
      name: 'roles',
      onDelete: 'CASCADE',
      through: 'customRequestsRoles',
      target: 'roles',
      foreignKey: 'customRequestKey',
      otherKey: 'roleName',
      sourceKey: 'key',
      targetKey: 'name',
    },
    {
      type: 'json',
      name: 'options', // 配置的请求参数都放这里
    },
  ],
});
