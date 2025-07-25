/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { skip } from '../skip-middleware';

describe('Skip Middleware', () => {
  it('should skip middleware', async () => {
    const skipMiddleware = skip({ resourceName: 'posts', actionName: 'list' });
    const ctx: any = {
      action: {
        resourceName: 'posts',
        actionName: 'list',
      },
      permission: {},
    };

    await skipMiddleware(ctx, async () => {
      expect(ctx.permission.skip).toBeTruthy();
    });

    const ctx2: any = {
      action: {
        resourceName: 'posts',
        actionName: 'create',
      },
      permission: {},
    };

    await skipMiddleware(ctx2, async () => {
      expect(ctx2.permission.skip).toBeFalsy();
    });
  });
});
