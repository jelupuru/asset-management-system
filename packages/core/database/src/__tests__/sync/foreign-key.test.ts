/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { primaryKey } from '@nocobase/client';
import { Database, mockDatabase } from '@nocobase/database';

describe('foreign key', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase({});

    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  it('should create index for foreign key', async () => {
    const users = db.collection({
      name: 'users',
      fields: [
        {
          type: 'string',
          name: 'name',
        },
      ],
    });

    const posts = db.collection({
      name: 'posts',
      fields: [
        {
          type: 'string',
          name: 'title',
        },
        {
          type: 'belongsTo',
          name: 'user',
          target: 'users',
        },
      ],
    });

    await db.sync();

    const foreignKey = posts.model.rawAttributes['userId'].field;

    const indexes = await db.sequelize.getQueryInterface().showIndex(posts.getTableNameWithSchema());

    // @ts-ignore
    expect(indexes.some((index) => index.fields.some((field) => field.attribute === foreignKey))).toBeTruthy();
  });
});
