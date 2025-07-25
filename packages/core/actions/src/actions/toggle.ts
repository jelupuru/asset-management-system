/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BelongsToManyRepository } from '@nocobase/database';
import { Context } from '..';
import { getRepositoryFromParams } from '../utils';

export async function toggle(ctx: Context, next) {
  const repository = getRepositoryFromParams(ctx);

  if (!(repository instanceof BelongsToManyRepository)) {
    return await next();
  }

  await (<BelongsToManyRepository>repository).toggle(ctx.action.params.values);
  ctx.body = 'ok';
  await next();
}
