/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { generateNTemplate } from '../../../../locale';

export const menuItemSchema = {
  properties: {
    name: {
      type: 'string',
      title: generateNTemplate('Menu name'),
      required: true,
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    icon: {
      'x-decorator': 'FormItem',
      'x-component': 'IconPicker',
      title: generateNTemplate('Icon'),
      'x-component-props': {},
    },
  },
};
