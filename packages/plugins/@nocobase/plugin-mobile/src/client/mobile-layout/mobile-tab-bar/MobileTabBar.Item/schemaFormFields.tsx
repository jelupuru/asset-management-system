/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema } from '@nocobase/client';
import { generatePluginTranslationTemplate } from '../../../locale';

export const getMobileTabBarItemSchemaFields = (values: any = {}): Record<string, ISchema> => ({
  title: {
    title: generatePluginTranslationTemplate('Title'),
    type: 'string',
    default: values.title,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    required: true,
  },
  icon: {
    title: generatePluginTranslationTemplate('Icon'),
    type: 'string',
    default: values.icon,
    'x-decorator': 'FormItem',
    'x-component': 'IconPicker',
    required: true,
  },
});
