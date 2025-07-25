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
  name: 'uiSchemaServerHooks',
  model: 'ServerHookModel',
  // autoGenId: false,
  timestamps: false,
  fields: [
    { type: 'belongsTo', name: 'uiSchema', target: 'uiSchemas', foreignKey: 'uid' },
    { type: 'string', name: 'type' },
    {
      type: 'string',
      name: 'collection',
    },
    {
      type: 'string',
      name: 'field',
    },
    {
      type: 'string',
      name: 'method',
    },
    {
      type: 'json',
      name: 'params',
    },
  ],
} as CollectionOptions;
