/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Context } from '..';
import { getRepositoryFromParams } from '../utils';

export async function create(ctx: Context, next) {
  const repository = getRepositoryFromParams(ctx);
  const { whitelist, blacklist, updateAssociationValues, values } = ctx.action.params;

  const instance = await repository.create({
    values,
    whitelist,
    blacklist,
    updateAssociationValues,
    context: ctx,
  });

  ctx.body = instance;
  await next();
}
