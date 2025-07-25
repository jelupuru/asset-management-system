/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { extendCollection } from '@nocobase/database';

export default extendCollection({
  name: 'systemSettings',
  fields: [
    {
      interface: 'checkbox',
      type: 'boolean',
      name: 'enableEditProfile',
      uiSchema: {
        type: 'boolean',
        'x-component': 'Checkbox',
        title: '{{t("Allow edit profile")}}',
        default: true,
      },
    },
    {
      interface: 'checkbox',
      type: 'boolean',
      name: 'enableChangePassword',
      uiSchema: {
        type: 'boolean',
        'x-component': 'Checkbox',
        title: '{{t("Allow Change Password")}}',
        default: true,
      },
    },
  ],
});
