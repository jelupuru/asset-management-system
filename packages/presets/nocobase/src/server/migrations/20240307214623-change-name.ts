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
  appVersion = '<0.20.0-alpha.7';

  async up() {
    await this.pm.repository.destroy({
      filter: {
        packageName: '@nocobase/plugin-workflow-form-trigger',
      },
    });
  }
}
