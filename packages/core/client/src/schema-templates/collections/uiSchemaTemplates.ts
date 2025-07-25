/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CollectionOptions } from '../../collection-manager';

export const uiSchemaTemplatesCollection: CollectionOptions = {
  name: 'uiSchemaTemplates',
  filterTargetKey: 'key',
  targetKey: 'key',
  fields: [
    {
      type: 'integer',
      name: 'name',
      interface: 'input',
      uiSchema: {
        title: '{{ t("Template name") }}',
        type: 'number',
        'x-component': 'Input',
        required: true,
      },
    },
  ],
};
