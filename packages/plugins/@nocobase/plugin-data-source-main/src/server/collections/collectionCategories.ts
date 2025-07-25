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
  dumpRules: {
    group: 'required',
  },
  shared: true,
  name: 'collectionCategories',
  autoGenId: true,
  sortable: true,
  fields: [
    {
      type: 'string',
      name: 'name',
      translation: true,
    },
    {
      type: 'string',
      name: 'color',
      defaultValue: 'default',
    },
    {
      type: 'belongsToMany',
      name: 'collections',
      target: 'collections',
      foreignKey: 'categoryId',
      otherKey: 'collectionName',
      targetKey: 'name',
      through: 'collectionCategory',
    },
  ],
} as CollectionOptions;
