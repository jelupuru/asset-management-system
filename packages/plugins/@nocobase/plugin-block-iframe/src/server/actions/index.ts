/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Context, Next } from '@nocobase/actions';
import { Repository } from '@nocobase/database';

export async function getHtml(ctx: Context, next: Next) {
  const { filterByTk } = ctx.action.params;
  const { resourceName } = ctx.action;
  const repository = ctx.db.getRepository<any>(resourceName) as Repository;
  const model = await repository.findById(filterByTk);
  ctx.body = model.get('html');
  ctx.withoutDataWrapping = true;

  ctx.set({
    'Content-Type': 'text/html; charset=UTF-8',
  });

  await next();
}
