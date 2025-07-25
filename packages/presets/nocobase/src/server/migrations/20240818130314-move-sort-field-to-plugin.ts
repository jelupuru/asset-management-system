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
  on = 'beforeLoad'; // 'beforeLoad' or 'afterLoad'

  async up() {
    const existed = await this.pm.repository.findOne({
      filter: {
        packageName: '@nocobase/plugin-field-sort',
      },
    });

    if (!existed) {
      await this.pm.repository.create({
        values: {
          name: 'field-sort',
          packageName: '@nocobase/plugin-field-sort',
          version: this.appVersion,
          enabled: true,
          installed: true,
          builtIn: true,
        },
      });
    }
  }
}
