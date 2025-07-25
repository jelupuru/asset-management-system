/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Migration } from '@nocobase/server';

export default class extends Migration {
  on = 'afterLoad'; // 'beforeLoad' or 'afterLoad'
  appVersion = '<0.21.0-alpha.7';

  async up() {
    const Field = this.context.db.getRepository('fields');
    const field = await Field.findOne({
      filter: {
        name: 'phone',
        collectionName: 'users',
        interface: 'phone',
      },
    });
    if (!field) {
      return;
    }
    await field.update({
      interface: 'input',
      options: {
        ...field.options,
        uiSchema: {
          type: 'string',
          title: '{{t("Phone")}}',
          'x-component': 'Input',
          required: true,
        },
      },
    });
  }
}
