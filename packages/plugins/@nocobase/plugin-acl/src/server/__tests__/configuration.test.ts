/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Database } from '@nocobase/database';
import UsersPlugin from '@nocobase/plugin-users';
import { MockServer } from '@nocobase/test';
import { prepareApp } from './prepare';

describe('configuration', () => {
  let app: MockServer;
  let db: Database;
  let admin;
  let adminAgent;
  let user;
  let userAgent;
  let guestAgent;

  afterEach(async () => {
    await app.destroy();
  });

  beforeEach(async () => {
    app = await prepareApp();
    db = app.db;

    await db.getRepository('roles').create({
      values: {
        name: 'test1',
        snippets: ['pm.*'],
      },
    });

    await db.getRepository('roles').create({
      values: {
        name: 'test2',
      },
    });

    const UserRepo = db.getCollection('users').repository;
    admin = await UserRepo.create({
      values: {
        roles: ['test1'],
      },
    });
    user = await UserRepo.create({
      values: {
        roles: ['test2'],
      },
    });

    const userPlugin = app.getPlugin('users') as UsersPlugin;
    adminAgent = app.agent().login(admin);

    userAgent = app.agent().login(user);

    guestAgent = app.agent();
  });

  it('should list collections', async () => {
    expect((await userAgent.resource('collections').create()).statusCode).toEqual(403);
    expect((await userAgent.resource('collections').list()).statusCode).toEqual(200);
  });

  it('should not create/list collections', async () => {
    expect((await guestAgent.resource('collections').create()).statusCode).toEqual(403);
    expect((await guestAgent.resource('collections').list()).statusCode).toEqual(403);
  });

  it('should allow when role has allowConfigure with true value', async () => {
    expect((await adminAgent.resource('collections').create()).statusCode).toEqual(200);
    expect((await adminAgent.resource('collections').list()).statusCode).toEqual(200);
  });
});
