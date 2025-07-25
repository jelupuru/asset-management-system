/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Application } from '@nocobase/server';

describe('MainDataSource', () => {
  let app: Application;

  beforeEach(async () => {
    app = new Application({
      database: {
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
      },
      resourcer: {
        prefix: '/api',
      },
      acl: false,
      dataWrapping: false,
      registerActions: false,
    });
  });

  afterEach(async () => {
    await app.destroy();
  });

  it('should create main data source when create application', async () => {
    const dataSourceManager = app.dataSourceManager;
    const mainDataSource = dataSourceManager.dataSources.get('main');

    expect(mainDataSource).toBeTruthy();
  });
});
