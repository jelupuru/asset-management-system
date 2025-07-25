/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

/* istanbul ignore file -- @preserve */

import { Migration } from '@nocobase/server';

export default class UpdateCollectionsHiddenMigration extends Migration {
  appVersion = '<0.8.0-alpha.11';

  async up() {
    const result = await this.app.version.satisfies('<=0.8.0-alpha.9');
    if (!result) {
      return;
    }
    try {
      await this.app.db.getRepository('collections').update({
        filter: {
          options: {
            autoCreate: true,
            isThrough: true,
          },
        },
        values: {
          hidden: true,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
