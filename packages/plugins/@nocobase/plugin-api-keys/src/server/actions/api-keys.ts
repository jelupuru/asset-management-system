/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import actions, { Context, Next } from '@nocobase/actions';
import { Repository } from '@nocobase/database';

export async function create(ctx: Context, next: Next) {
  const { values } = ctx.action.params;

  if (!values.role) {
    return;
  }

  const repository = ctx.db.getRepository('users.roles', ctx.auth.user.id) as unknown as Repository;
  const role = await repository.findOne({
    filter: {
      name: values.role.name,
    },
  });
  if (!role) {
    throw ctx.throw(400, ctx.t('Role not found'));
  }

  const token = ctx.app.authManager.jwt.sign(
    { userId: ctx.auth.user.id, roleName: role.name },
    { expiresIn: values.expiresIn },
  );
  ctx.action.mergeParams({
    values: {
      token,
    },
  });
  return actions.create(ctx, async () => {
    ctx.body = {
      token,
    };
    await next();
  });
}

export async function destroy(ctx: Context, next: Next) {
  const repo = ctx.db.getRepository(ctx.action.resourceName);
  const { filterByTk } = ctx.action.params;

  const data = await repo.findById(filterByTk);
  const token = data?.get('token');
  if (token) {
    await ctx.app.authManager.jwt.block(token);
  }

  return actions.destroy(ctx, next);
}
