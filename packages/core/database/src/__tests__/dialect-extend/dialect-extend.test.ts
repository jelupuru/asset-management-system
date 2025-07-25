/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { mockDatabase } from '../';
import { Database } from '../../database';
import { BaseDialect } from '../../dialects/base-dialect';

describe('dialect extend', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase();
    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  it('should register dialect', async () => {
    class SubDialect extends BaseDialect {
      static dialectName = 'test';

      async checkDatabaseVersion(db: Database): Promise<boolean> {
        return true;
      }
    }

    Database.registerDialect(SubDialect);
    expect(Database.getDialect('test')).toBe(SubDialect);
  });
});
