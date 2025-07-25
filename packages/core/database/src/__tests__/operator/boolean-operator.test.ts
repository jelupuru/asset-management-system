/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import Database, { Collection, mockDatabase } from '@nocobase/database';

describe('boolean operator', () => {
  let db: Database;

  let User: Collection;

  afterEach(async () => {
    await db.close();
  });

  beforeEach(async () => {
    db = mockDatabase({});

    await db.clean({ drop: true });

    User = db.collection({
      name: 'users',
      fields: [{ type: 'boolean', name: 'activated' }],
    });

    await db.sync({
      force: true,
    });
  });

  it('should query $isFalsy', async () => {
    await db.getRepository('users').create({
      values: [
        {
          activated: false,
        },
        {
          activated: true,
        },
      ],
    });

    const res = await db.getRepository('users').find({
      filter: {
        'activated.$isFalsy': true,
      },
    });

    expect(res.length).toBe(1);
  });

  it('should query $isTruly', async () => {
    await db.getRepository('users').create({
      values: [
        {
          activated: false,
        },
        {
          activated: true,
        },
      ],
    });

    const res = await db.getRepository('users').find({
      filter: {
        'activated.$isTruly': true,
      },
    });

    expect(res.length).toBe(1);
  });
});
