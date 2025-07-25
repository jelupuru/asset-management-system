/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import Database, { mockDatabase } from '@nocobase/database';

describe('database utils', () => {
  let db: Database;

  afterEach(async () => {
    await db.close();
  });

  beforeEach(async () => {
    db = mockDatabase({});

    await db.clean({ drop: true });
  });

  it.runIf(process.env['DB_DIALECT'] === 'postgres')('should get database schema', async () => {
    const schema = process.env['DB_SCHEMA'] || 'public';
    expect(db.utils.schema()).toEqual(schema);
  });
});
