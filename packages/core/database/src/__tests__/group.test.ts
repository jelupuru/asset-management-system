/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Database, mockDatabase } from '@nocobase/database';
import sequelize from 'sequelize';

describe('migrator', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase({
      tablePrefix: 'test_',
    });

    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  test('addMigrations', async () => {
    db.collection({
      name: 'test',
      fields: [
        {
          type: 'string',
          name: 'status',
        },
      ],
    });

    await db.sync();

    const r = db.getRepository('test');

    await r.create({
      values: [{ status: 's1' }, { status: 's1' }, { status: 's1' }, { status: 's2' }, { status: 's3' }],
    });

    const result = await r.find({
      attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      sort: 'status',
      group: 'status',
    });

    expect(result.map((r) => r.toJSON())).toMatchObject([
      { status: 's1', count: 3 },
      { status: 's2', count: 1 },
      { status: 's3', count: 1 },
    ]);
  });
});
