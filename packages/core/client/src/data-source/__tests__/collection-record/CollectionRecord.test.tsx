/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CollectionRecord } from '../../collection-record';

describe('Record', () => {
  test('should works', () => {
    const record = new CollectionRecord<{ id: number }, { name: string }>({ data: { id: 1 } });
    expect(record.data.id).toBe(1);

    record.setData({ id: 2 });
    expect(record.data.id).toBe(2);

    record.setParentRecord(new CollectionRecord({ data: { name: 'a' } }));
    expect(record.parentRecord.data.name).toBe('a');
  });
});
