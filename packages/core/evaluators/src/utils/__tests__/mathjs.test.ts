/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import mathjs from '../mathjs';

describe('evaluators > mathjs', () => {
  it('matrix type should be to array', () => {
    expect(mathjs('range(1, 3, 1)')).toEqual([1, 2, 3]);
  });
});
