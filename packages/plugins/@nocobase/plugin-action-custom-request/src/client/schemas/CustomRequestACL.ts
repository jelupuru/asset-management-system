/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { DEFAULT_DATA_SOURCE_KEY } from '@nocobase/client';
import { generateNTemplate } from '../locale';

export const CustomRequestACLSchema = {
  type: 'object',
  properties: {
    roles: {
      type: 'array',
      title: generateNTemplate('Roles'),
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        tooltip: generateNTemplate('If not set, all roles can see this action'),
      },
      'x-component': 'RemoteSelect',
      'x-component-props': {
        multiple: true,
        objectValue: true,
        dataSource: DEFAULT_DATA_SOURCE_KEY,
        service: {
          resource: 'roles',
        },
        manual: false,
        fieldNames: {
          label: 'title',
          value: 'name',
        },
      },
    },
  },
};
