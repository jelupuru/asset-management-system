/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { mockDatabase } from '../index';
import Database from '../../database';
import { Collection } from '../../collection';
import { vi } from 'vitest';

describe('repository chunk', () => {
  let db: Database;
  let Post: Collection;
  let User: Collection;

  afterEach(async () => {
    await db.close();
  });

  beforeEach(async () => {
    db = mockDatabase();

    await db.clean({ drop: true });

    User = db.collection({
      name: 'users',
      fields: [
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'hasMany',
          name: 'posts',
        },
      ],
    });

    Post = db.collection({
      name: 'posts',
      fields: [
        {
          type: 'string',
          name: 'title',
        },
        {
          type: 'belongsTo',
          name: 'user',
        },
      ],
    });

    await db.sync();
  });

  it('should find items with chunk', async () => {
    const values = Array.from({ length: 99 }, (_, i) => ({ name: `user-${i}` }));

    const repository = db.getRepository('users');

    await repository.create({
      values,
    });

    const chunkCallback = vi.fn();

    await repository.chunk({
      chunkSize: 10,
      callback: chunkCallback,
    });

    expect(chunkCallback).toHaveBeenCalledTimes(10);
  });

  it('should chunk with limit', async () => {
    const values = Array.from({ length: 99 }, (_, i) => ({ name: `user-${i}` }));

    const repository = db.getRepository('users');

    await repository.create({
      values,
    });

    let totalCount = 0;
    const chunkCallback = vi.fn();

    await repository.chunk({
      chunkSize: 10,
      limit: 11,
      callback: async (rows) => {
        chunkCallback();
        totalCount += rows.length;
      },
    });

    expect(chunkCallback).toHaveBeenCalledTimes(2);
    expect(totalCount).toBe(11);
  });
});
