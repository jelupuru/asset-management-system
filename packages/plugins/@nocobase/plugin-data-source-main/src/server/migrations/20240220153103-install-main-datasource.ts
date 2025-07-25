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

export default class extends Migration {
  on = 'afterLoad'; // 'beforeLoad' or 'afterLoad'
  appVersion = '<0.20.0-alpha.1';

  async up() {
    const dataSourcesCollection = this.app.db.getCollection('dataSources');

    await dataSourcesCollection.repository.firstOrCreate({
      filterKeys: ['key'],
      values: {
        key: 'main',
        type: 'main',
        displayName: 'Main',
        fixed: true,
        options: {},
      },
    });
  }
}
