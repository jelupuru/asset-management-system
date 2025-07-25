/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import path from 'path';
import { importModule } from '../requireModule';

describe('import module', () => {
  it('should import module with absolute path', async () => {
    const file = './test.ts';
    const filePath = path.resolve(__dirname, file);

    const m = await importModule(filePath);
    expect(m.test).toEqual('hello');
  });
});
