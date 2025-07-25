/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Database, Repository } from '@nocobase/database';
import { MockServer, createMockServer } from '@nocobase/test';

describe('actions', () => {
  let app: MockServer;
  let db: Database;
  let repo: Repository;
  let agent: any;

  beforeAll(async () => {
    app = await createMockServer({
      plugins: ['acl', 'field-sort', 'users', 'data-source-manager'],
    });
    db = app.db;
    repo = db.getRepository('users');
    agent = app.agent();
  });

  afterAll(async () => {
    await app.destroy();
  });

  it('should list users exclude role', async () => {
    const res = await agent.resource('users').listExcludeRole({
      roleName: ['admin'],
    });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(0);
  });

  it('should list users exclude role with filter', async () => {
    let res = await agent.resource('users').listExcludeRole({
      roleName: ['test'],
    });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);

    res = await agent.resource('users').listExcludeRole({
      roleName: ['test'],
      filter: {
        id: 1,
      },
    });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);

    res = await agent.resource('users').listExcludeRole({
      roleName: ['test'],
      filter: {
        id: 2,
      },
    });
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(0);
  });
});
