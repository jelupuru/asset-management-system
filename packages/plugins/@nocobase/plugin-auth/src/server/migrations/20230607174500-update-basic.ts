/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Migration } from '@nocobase/server';
import { presetAuthenticator } from '../../preset';

export default class UpdateBasicAuthMigration extends Migration {
  appVersion = '<0.14.0-alpha.1';
  async up() {
    const SystemSetting = this.context.db.getRepository('systemSettings');
    const setting = await SystemSetting.findOne();
    const allowSignUp = setting.get('allowSignUp') ? true : false;
    const repo = this.context.db.getRepository('authenticators');
    await repo.update({
      values: {
        options: {
          public: {
            allowSignUp,
          },
        },
      },
      filter: {
        name: presetAuthenticator,
      },
    });
  }

  async down() {}
}
