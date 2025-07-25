/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { vi } from 'vitest';
import { Database, mockDatabase } from '@nocobase/database';

describe('sync', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase({
      logging: console.log,
    });

    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  it('should not sync id fields when inherits not changed', async () => {
    if (!db.inDialect('postgres')) {
      return;
    }

    const Parent = db.collection({
      name: 'parent',
      fields: [
        {
          type: 'string',
          name: 'name',
        },
      ],
    });

    const fn = vi.fn();

    const Child = db.collection({
      name: 'child',
      inherits: ['parent'],
      fields: [
        {
          type: 'string',
          name: 'name',
        },
      ],
    });

    expect(await Child.existsInDb()).toBeFalsy();

    await db.sync();

    expect(await Child.existsInDb()).toBeTruthy();

    Child.setField('age', {
      type: 'integer',
    });

    await db.sync({});

    const tableColumns = await db.sequelize.getQueryInterface().describeTable(Child.getTableNameWithSchema());

    expect(tableColumns).toHaveProperty('age');
  });
});
