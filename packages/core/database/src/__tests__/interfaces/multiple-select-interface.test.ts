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
import { MultipleSelectInterface } from '../../interfaces/multiple-select-interface';

describe('MultipleSelectInterface', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase();
    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  describe('toValue', () => {
    it('should return value', async () => {
      const options = {
        uiSchema: {
          enum: [
            { value: '1', label: 'Label1' },
            { value: '2', label: 'Label2' },
          ],
        },
      };

      const interfaceInstance = new MultipleSelectInterface(options);
      const value = await interfaceInstance.toValue('Label1,Label2');
      expect(value).toEqual(['1', '2']);
    });
  });
});
