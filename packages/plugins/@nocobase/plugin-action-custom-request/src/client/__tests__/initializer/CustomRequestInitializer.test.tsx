/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { getNewSchema } from '../../initializer/CustomRequestInitializer';

describe('CustomRequestInitializer', () => {
  it('should generate a new schema with different x-uid each time', () => {
    const schema1 = getNewSchema();
    const schema2 = getNewSchema();
    expect(schema1['x-uid']).not.toBe(schema2['x-uid']);
  });
});
