/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { processData } from '../utils';

describe('utils', () => {
  describe('process data', () => {
    it('should process select field', () => {
      expect(
        processData(
          [
            {
              name: 'tag',
              type: 'bigInt',
              interface: 'select',
              uiSchema: {
                type: 'string',
                enum: [
                  {
                    value: '1',
                    label: 'Yes',
                  },
                  {
                    value: '2',
                    label: 'No',
                  },
                ],
              },
              label: 'Tag',
              value: 'tag',
              key: 'tag',
            },
          ],
          [{ tag: 1 }],
          {},
        ),
      ).toEqual([{ tag: 'Yes' }]);
    });
    it('should not process when aggregating', () => {
      expect(
        processData(
          [
            {
              name: 'tag',
              type: 'bigInt',
              interface: 'select',
              uiSchema: {
                type: 'string',
                enum: [
                  {
                    value: '1',
                    label: 'Yes',
                  },
                  {
                    value: '2',
                    label: 'No',
                  },
                ],
              },
              label: 'Tag',
              value: 'tag',
              key: 'tag',
              query: {
                field: 'tag',
                aggregation: 'count',
              },
            },
          ],
          [{ tag: 1 }],
          {},
        ),
      ).toEqual([{ tag: 1 }]);
    });
  });
});
