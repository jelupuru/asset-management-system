/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Database, mockDatabase } from '@nocobase/database';

describe('date only', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase({
      timezone: '+08:00',
    });
    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  it('should set date field with dateOnly', async () => {
    db.collection({
      name: 'tests',
      fields: [{ name: 'date1', type: 'dateOnly' }],
    });

    await db.sync();

    const item = await db.getRepository('tests').create({
      values: {
        date1: '2023-03-24',
      },
    });

    expect(item.get('date1')).toBe('2023-03-24');
  });
});
