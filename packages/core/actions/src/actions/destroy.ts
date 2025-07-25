/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { getRepositoryFromParams } from '../utils';
import { Context } from '../index';

export async function destroy(ctx: Context, next) {
  const repository = getRepositoryFromParams(ctx);
  const { filterByTk, filter } = ctx.action.params;

  const instance = await repository.destroy({
    filter,
    filterByTk,
    context: ctx,
  });

  ctx.body = instance;
  await next();
}
