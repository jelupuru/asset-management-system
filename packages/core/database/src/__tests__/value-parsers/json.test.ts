/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { JsonValueParser } from '../../value-parsers';

describe('array value parser', () => {
  let parser: JsonValueParser;

  beforeEach(() => {
    parser = new JsonValueParser({}, {});
  });

  const expectValue = (value) => {
    parser = new JsonValueParser({}, {});
    parser.setValue(value);
    return expect(parser.getValue());
  };

  test('json value parser', async () => {
    expectValue('{"a":1}').toEqual({ a: 1 });
    expectValue('{"a":1,"b":2}').toEqual({ a: 1, b: 2 });
    expectValue('{"a":1,"b":2,"c":3}').toEqual({ a: 1, b: 2, c: 3 });
  });
});
