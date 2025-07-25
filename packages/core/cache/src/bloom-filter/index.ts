/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

/**
 * @experimental
 */
export interface BloomFilter {
  reserve(key: string, errorRate: number, capacity: number): Promise<void>;
  add(key: string, val: string): Promise<void>;
  mAdd(key: string, vals: string[]): Promise<void>;
  exists(key: string, val: string): Promise<boolean>;
}
