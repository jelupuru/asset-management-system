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
  name: 'userDataSyncRecordsResources',
  fields: [
    {
      name: 'recordId',
      type: 'bigInt',
      interface: 'id',
    },
    {
      name: 'resource',
      interface: 'Select',
      type: 'string',
      allowNull: false,
    },
    {
      name: 'resourcePk',
      interface: 'Input',
      type: 'string',
      allowNull: true,
    },
  ],
});
