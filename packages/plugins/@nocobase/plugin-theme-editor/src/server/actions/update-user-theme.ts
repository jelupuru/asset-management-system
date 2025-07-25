/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Context, Next } from '@nocobase/actions';

export async function updateTheme(ctx: Context, next: Next) {
  const { themeId } = ctx.action.params.values || {};
  const { currentUser } = ctx.state;
  if (!currentUser) {
    ctx.throw(401);
  }
  const userRepo = ctx.db.getRepository('users');
  const user = await userRepo.findOne({ filter: { id: currentUser.id } });
  await userRepo.update({
    filterByTk: currentUser.id,
    values: {
      systemSettings: {
        ...user.systemSettings,
        themeId,
      },
    },
  });
  await next();
}
