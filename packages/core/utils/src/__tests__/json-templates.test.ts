/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { parse } from '../json-templates';

describe('json-templates', () => {
  it('parse json with string template', async () => {
    const template = {
      name: '{{id}}-{{name}}.',
      age: 18,
    };
    const result = parse(template)({
      name: 'test',
      id: 1,
    });
    expect(result).toEqual({
      name: '1-test.',
      age: 18,
    });
  });
});
