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

describe('set field', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase();
    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  it('should set Set field', async () => {
    const A = db.collection({
      name: 'a',
      fields: [
        {
          type: 'set',
          name: 'set',
        },
      ],
    });

    await db.sync();

    const a = await A.repository.create({});

    a.set('set', ['a', 'b', 'c', 'a']);

    await a.save();

    const setValue = a.get('set');
    expect(setValue).toEqual(['a', 'b', 'c']);
  });
});
