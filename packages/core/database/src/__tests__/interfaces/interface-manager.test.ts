/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { mockDatabase } from '..';
import { Database } from '../../database';
import { BaseInterface } from '../../interfaces/base-interface';

describe('interface manager', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase();
    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  it('should register field interface', async () => {
    class TestInterface extends BaseInterface {
      toString(value: any) {
        return `test-${value}`;
      }
    }

    db.interfaceManager.registerInterfaceType('test', TestInterface);
    expect(db.interfaceManager.getInterfaceType('test')).toBe(TestInterface);
  });
});
