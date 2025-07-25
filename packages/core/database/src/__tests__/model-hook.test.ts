/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Database } from '..';
import { mockDatabase } from '.';

describe('model hook', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase();
    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  describe('match', () => {
    test('sequelize db hooks', async () => {
      const matcher = db.modelHook.match('beforeDefine');
      expect(matcher).toEqual('beforeDefine');
    });

    test('sequelize global model hooks', async () => {
      const matcher = db.modelHook.match('beforeCreate');
      expect(matcher).toEqual('beforeCreate');
    });

    test('sequelize model hooks without existing collection', async () => {
      const matcher = db.modelHook.match('posts.beforeCreate');
      expect(matcher).toEqual('beforeCreate');
    });

    test('sequelize model hooks with existing collection', async () => {
      db.collection({
        name: 'posts',
        fields: [],
      });
      const matcher = db.modelHook.match('posts.beforeCreate');
      expect(matcher).toEqual('beforeCreate');
    });

    test('customized global hooks', async () => {
      const matcher = db.modelHook.match('beforeDefineCollection');
      expect(matcher).toBeNull();
    });

    test('customized model hooks', async () => {
      db.collection({
        name: 'posts',
        fields: [],
      });
      const matcher = db.modelHook.match('posts.beforeCreateWithAssociations');
      expect(matcher).toBeNull();
    });
  });
});
