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
  name: 'graphPositions',
  shared: true,
  fields: [
    {
      type: 'string',
      name: 'collectionName',
      unique: true,
    },
    {
      type: 'double',
      name: 'x',
    },
    {
      type: 'double',
      name: 'y',
    },
  ],
});
