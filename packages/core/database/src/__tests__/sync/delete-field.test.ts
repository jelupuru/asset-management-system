/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Database, mockDatabase } from '../../index';

describe.skip('delete field', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase({});

    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  it('should delete field', async () => {
    const User = db.collection({
      name: 'users',
      fields: [
        { type: 'string', name: 'name' },
        { type: 'string', name: 'email' },
      ],
    });

    await db.sync();

    const userTableInfo = await db.sequelize.getQueryInterface().describeTable(User.getTableNameWithSchema());

    expect(userTableInfo.email).toBeDefined();

    User.removeField('email');

    await db.sync();

    const userTableInfo2 = await db.sequelize.getQueryInterface().describeTable(User.getTableNameWithSchema());
    expect(userTableInfo2.email).toBeUndefined();
  });
});
