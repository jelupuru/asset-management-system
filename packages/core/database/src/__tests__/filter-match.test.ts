/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Database } from '..';
import { filterMatch } from '../filter-match';
import { mockDatabase } from './index';

describe('filterMatch', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase();
    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  test('filter match', async () => {
    const Post = db.collection({
      name: 'posts',
      fields: [{ type: 'string', name: 'title' }],
    });

    await db.sync();

    const post = await Post.repository.create({
      values: { title: 't1' },
    });

    expect(
      filterMatch(post, {
        title: 't1',
      }),
    ).toBeTruthy();

    expect(filterMatch(post, { 'title.$not': 't1' })).toBeFalsy();

    expect(
      filterMatch(post, {
        $or: [{ title: 't1' }, { title: 't2' }],
      }),
    ).toBeTruthy();

    expect(
      filterMatch(post, {
        $and: [{ title: 't1' }, { title: 't2' }],
      }),
    ).toBeFalsy();

    expect(
      filterMatch(post, {
        title: 't2',
      }),
    ).toBeFalsy();
  });

  test('filter by array operation', () => {
    expect(
      expect(
        filterMatch(
          {
            tags: ['tag1', 'tag2'],
          },
          {
            tags: {
              $match: 'tag1',
            },
          },
        ),
      ).toBeTruthy(),
    );
  });

  test('filter by date operation', () => {
    expect(
      expect(
        filterMatch(
          {
            createdAt: '2013-02-08T09:30:26.123Z',
          },
          {
            createdAt: {
              $dateOn: '2013-02-08',
            },
          },
        ),
      ).toBeTruthy(),
    );
  });
});
