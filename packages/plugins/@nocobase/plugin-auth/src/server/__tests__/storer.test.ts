/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Cache, CacheManager } from '@nocobase/cache';
import { Storer } from '../storer';

class MockDB {
  data: any;
  hooks = {};

  constructor(data: any) {
    this.data = data;
  }

  on(name: string, func: (...args: any[]) => Promise<void>) {
    this.hooks[name] = func;
  }

  async emitAsync(name: string, ...args: any[]) {
    const func = this.hooks[name];
    if (func) {
      await func(...args);
    }
  }

  getRepository() {
    return {
      find: async () => {
        return this.data;
      },
    };
  }
}

describe('storer', () => {
  let db: any;
  let storer: Storer;
  let cache: Cache;
  const data = [
    {
      name: 'test1',
      enabled: true,
    },
    {
      name: 'test2',
      enabled: true,
    },
  ];

  beforeEach(async () => {
    const cacheManager = new CacheManager();
    cache = await cacheManager.createCache({ name: 'test' });
    db = new MockDB(data);
    storer = new Storer({ db, cache });
  });

  afterEach(() => {
    db = undefined;
    storer = undefined;
  });

  it('should get authenticator from cache', async () => {
    expect(await cache.get('authenticators')).toBeUndefined();
    let authenticator = await storer.get('test1');
    expect(authenticator).toBeDefined();

    expect(await cache.get('authenticators')).toBeDefined();
    authenticator = await storer.get('test1');
    expect(authenticator).toBeDefined();
  });

  it('should delete from cache on afterDestory', async () => {
    expect(await storer.get('test1')).toBeDefined();
    await db.emitAsync('authenticators.afterDestroy', data[0]);
    const authenticators = await cache.get('authenticators');
    expect(authenticators['test1']).toBeUndefined();
  });

  it('should delete from cache on afterSave as disabled', async () => {
    expect(await storer.get('test1')).toBeDefined();
    await db.emitAsync('authenticators.afterSave', { ...data[0], enabled: false });
    const authenticators = await cache.get('authenticators');
    expect(authenticators['test1']).toBeUndefined();
  });

  it('should set cache on afterSave as enabled', async () => {
    expect(await storer.get('test1')).toBeDefined();
    await db.emitAsync('authenticators.afterSave', { name: 'test3', enabled: true });
    const authenticators = await cache.get('authenticators');
    expect(authenticators['test3']).toBeDefined();
  });
});
