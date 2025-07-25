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
  name: 'publicForms',
  filterTargetKey: 'key',
  createdBy: true,
  updatedBy: true,
  fields: [
    {
      type: 'uid',
      name: 'key',
      unique: true,
    },
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'string',
      name: 'type',
    },
    {
      type: 'string',
      name: 'collection',
    },
    {
      type: 'string',
      name: 'description',
    },
    {
      type: 'boolean',
      name: 'enabled',
    },
    {
      type: 'string',
      name: 'password',
    },
  ],
});
