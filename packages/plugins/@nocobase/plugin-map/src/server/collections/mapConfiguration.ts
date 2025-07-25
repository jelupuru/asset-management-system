/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { defineCollection } from '@nocobase/database';
import { MapConfigurationCollectionName } from '../constants';

export default defineCollection({
  dumpRules: {
    group: 'third-party',
  },
  name: MapConfigurationCollectionName,
  shared: true,
  fields: [
    {
      title: 'Access key',
      comment: '访问密钥',
      name: 'accessKey',
      type: 'string',
    },
    {
      title: 'securityJsCode',
      comment: 'securityJsCode or serviceHOST',
      name: 'securityJsCode',
      type: 'string',
    },
    {
      title: 'Map type',
      comment: '地图类型',
      name: 'type',
      type: 'string',
    },
  ],
});
