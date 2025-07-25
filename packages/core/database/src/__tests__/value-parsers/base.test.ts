/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BaseValueParser as ValueParser } from '../../value-parsers';

describe('number value parser', () => {
  let parser: ValueParser;

  beforeEach(() => {
    parser = new ValueParser({}, {});
  });

  it('should be converted to an array', () => {
    expect(parser.toArr('A/B', '/')).toEqual(['A', 'B']);
    expect(parser.toArr('A,B')).toEqual(['A', 'B']);
    expect(parser.toArr('A, B')).toEqual(['A', 'B']);
    expect(parser.toArr('A， B')).toEqual(['A', 'B']);
    expect(parser.toArr('A, B ')).toEqual(['A', 'B']);
    expect(parser.toArr('A， B  ')).toEqual(['A', 'B']);
    expect(parser.toArr('A、 B')).toEqual(['A', 'B']);
    expect(parser.toArr('A ,, B')).toEqual(['A', 'B']);
  });
});
