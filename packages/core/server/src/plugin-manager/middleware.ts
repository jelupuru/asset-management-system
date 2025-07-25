/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Context, Next } from '@nocobase/actions';
import { koaMulter as multer } from '@nocobase/utils';

export async function uploadMiddleware(ctx: Context, next: Next) {
  if (ctx.action.resourceName === 'pm' && ['add', 'update'].includes(ctx.action.actionName)) {
    const upload = multer().single('file');
    return upload(ctx, next);
  }
  return next();
}
