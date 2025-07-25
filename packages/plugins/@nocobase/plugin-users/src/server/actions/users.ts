/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Context, DEFAULT_PAGE, DEFAULT_PER_PAGE, Next } from '@nocobase/actions';
import _ from 'lodash';
import { namespace } from '..';

export async function updateProfile(ctx: Context, next: Next) {
  const systemSettings = ctx.db.getRepository('systemSettings');
  const settings = await systemSettings.findOne();
  const enableEditProfile = settings.get('enableEditProfile');
  if (enableEditProfile === false) {
    ctx.throw(403, ctx.t('User profile is not allowed to be edited', { ns: namespace }));
  }

  const values = ctx.action.params.values || {};
  const { currentUser } = ctx.state;
  if (!currentUser) {
    ctx.throw(401);
  }
  const UserRepo = ctx.db.getRepository('users');
  const result = await UserRepo.update({
    filterByTk: currentUser.id,
    values: _.pick(values, ['nickname', 'username', 'email', 'phone']),
  });
  ctx.body = result;
  await next();
}

export async function updateLang(ctx: Context, next: Next) {
  const { appLang } = ctx.action.params.values || {};
  const { currentUser } = ctx.state;
  if (!currentUser) {
    ctx.throw(401);
  }
  const userRepo = ctx.db.getRepository('users');
  await userRepo.update({
    filterByTk: currentUser.id,
    values: {
      appLang,
    },
  });
  await next();
}

export const listExcludeRole = async (ctx: Context, next: Next) => {
  const { roleName, page = DEFAULT_PAGE, pageSize = DEFAULT_PER_PAGE } = ctx.action.params;
  const repo = ctx.db.getRepository('users');
  const users = await repo.find({
    fields: ['id'],
    filter: {
      'roles.name': roleName,
    },
  });
  const userIds = users.map((user: { id: number }) => user.id);
  if (userIds.length) {
    ctx.action.mergeParams({
      filter: {
        id: {
          $notIn: userIds,
        },
      },
    });
  }
  const { filter } = ctx.action.params;
  const [rows, count] = await repo.findAndCount({
    context: ctx,
    offset: (page - 1) * pageSize,
    limit: +pageSize,
    filter,
  });
  ctx.body = {
    count,
    rows,
    page: Number(page),
    pageSize: Number(pageSize),
    totalPage: Math.ceil(count / pageSize),
  };
  await next();
};
