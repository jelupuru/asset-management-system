/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BloomFilter } from '../bloom-filter';
import { CacheManager } from '../cache-manager';

describe('bloomFilter', () => {
  let bloomFilter: BloomFilter;
  let cacheManager: CacheManager;

  beforeEach(async () => {
    cacheManager = new CacheManager();
    cacheManager.registerStore({ name: 'memory', store: 'memory' });
    bloomFilter = await cacheManager.createBloomFilter({ store: 'memory' });
    await bloomFilter.reserve('bloom-test', 0.01, 1000);
  });

  afterEach(async () => {
    await cacheManager.flushAll();
  });

  it('should add and check', async () => {
    await bloomFilter.add('bloom-test', 'hello');
    expect(await bloomFilter.exists('bloom-test', 'hello')).toBeTruthy();
    expect(await bloomFilter.exists('bloom-test', 'world')).toBeFalsy();
  });

  it('should mAdd and check', async () => {
    await bloomFilter.mAdd('bloom-test', ['hello', 'world']);
    expect(await bloomFilter.exists('bloom-test', 'hello')).toBeTruthy();
    expect(await bloomFilter.exists('bloom-test', 'world')).toBeTruthy();
  });

  it('should return false if not reserved', async () => {
    expect(await bloomFilter.exists('not-reserved', 'hello')).toBeFalsy();
  });
});
