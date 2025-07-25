/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Collection, mockDatabase } from '@nocobase/database';
import { SQLCollection } from '../sql-collection';

test('sql-collection', async () => {
  const db = mockDatabase({ tablePrefix: '' });
  await db.clean({ drop: true });
  db.collectionFactory.registerCollectionType(SQLCollection, {
    condition: (options) => {
      return options.sql;
    },

    async onSync() {
      return;
    },

    async onDump(dumper, collection: Collection) {
      return;
    },
  });
  const collection = db.collectionFactory.createCollection<SQLCollection>({
    name: 'test',
    sql: 'SELECT * FROM test;',
  });
  expect(collection.isSql()).toBe(true);
  expect(collection.collectionSchema()).toBeUndefined();
  expect(collection.options.autoGenId).toBe(false);
  expect(collection.options.timestamps).toBe(false);
  expect(collection.options.underscored).toBe(false);

  collection.modelInit();
  // @ts-ignore
  expect(collection.model._schema).toBeUndefined();
});
