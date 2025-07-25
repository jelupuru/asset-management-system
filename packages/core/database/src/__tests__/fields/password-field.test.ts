/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { mockDatabase } from '../';
import { Database, PasswordField } from '../../';

describe('password field', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase();
    await db.clean({ drop: true });
  });

  afterEach(async () => {
    await db.close();
  });

  it('case 1', async () => {
    const User = db.collection({
      name: 'users',
      fields: [{ type: 'password', name: 'password' }],
    });
    await db.sync();
    let user = await User.model.create<any>({
      password: '123456',
    });
    const pwd = User.getField<PasswordField>('password');
    expect(await pwd.verify('123456', user.password)).toBeTruthy();
    user.set('password', '654321');
    await user.save();
    expect(await pwd.verify('654321', user.password)).toBeTruthy();
    user.set('password', null);
    await user.save();
    user = await User.model.findOne();
    expect(await pwd.verify('654321', user.password)).toBeTruthy();
  });
});
