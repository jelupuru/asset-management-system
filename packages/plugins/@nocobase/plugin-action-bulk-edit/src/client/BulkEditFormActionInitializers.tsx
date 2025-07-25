/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CompatibleSchemaInitializer } from '@nocobase/client';
import { BulkEditSubmitActionInitializer } from './BulkEditSubmitActionInitializer';

const commonOptions = {
  title: '{{t("Configure actions")}}',
  icon: 'SettingOutlined',
  items: [
    {
      type: 'itemGroup',
      title: '{{t("Enable actions")}}',
      name: 'enableActions',
      children: [
        {
          name: 'submit',
          title: '{{t("Submit")}}',
          Component: BulkEditSubmitActionInitializer,
          schema: {
            'x-action-settings': {},
          },
        },
      ],
    },
  ],
};

/**
 * @deprecated
 * use `bulkEditFormActionInitializers` instead
 */
export const BulkEditFormActionInitializers_deprecated = new CompatibleSchemaInitializer({
  name: 'BulkEditFormActionInitializers',
  ...commonOptions,
});

export const bulkEditFormActionInitializers = new CompatibleSchemaInitializer(
  {
    name: 'bulkEditForm:configureActions',
    ...commonOptions,
  },
  BulkEditFormActionInitializers_deprecated,
);
