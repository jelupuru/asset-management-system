/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import {
  ArrayFieldRepository,
  BelongsToManyRepository,
  HasManyRepository,
  MultipleRelationRepository,
} from '@nocobase/database';
import { Context } from '..';
import { getRepositoryFromParams } from '../utils';

export async function add(ctx: Context, next) {
  const repository = getRepositoryFromParams(ctx);

  if (
    !(
      repository instanceof MultipleRelationRepository ||
      repository instanceof HasManyRepository ||
      repository instanceof ArrayFieldRepository
    )
  ) {
    return await next();
  }
  const filterByTk = ctx.action.params.filterByTk || ctx.action.params.filterByTks || ctx.action.params.values;

  await (<HasManyRepository | BelongsToManyRepository>repository).add(filterByTk);

  ctx.status = 200;

  await next();
}
