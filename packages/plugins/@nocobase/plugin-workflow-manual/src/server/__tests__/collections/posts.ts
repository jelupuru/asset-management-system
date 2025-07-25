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
  name: 'posts',
  createdBy: true,
  updatedBy: true,
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'boolean',
      name: 'published',
      defaultValue: false,
    },
    {
      type: 'integer',
      name: 'read',
      defaultValue: 0,
    },
    {
      type: 'belongsTo',
      name: 'category',
    },
    {
      type: 'hasMany',
      name: 'comments',
    },
    {
      type: 'belongsToMany',
      name: 'tags',
    },
    {
      type: 'integer',
      name: 'read',
      defaultValue: 0,
    },
  ],
} as CollectionOptions;
