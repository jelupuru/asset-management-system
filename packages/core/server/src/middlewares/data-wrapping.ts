/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Context, Next } from '@nocobase/actions';
import stream from 'stream';

export function dataWrapping() {
  return async function dataWrapping(ctx: Context, next: Next) {
    await next();

    if (ctx.withoutDataWrapping) {
      return;
    }

    if (ctx.body instanceof stream.Readable) {
      return;
    }

    if (ctx.body instanceof Buffer) {
      return;
    }

    if (!ctx.body) {
      if (ctx.action?.actionName == 'get') {
        ctx.status = 200;
      }
    }

    if (Array.isArray(ctx.body)) {
      ctx.body = {
        data: ctx.body,
      };
    } else {
      if (ctx.body) {
        const { rows, ...meta } = ctx.body;

        if (rows) {
          ctx.body = {
            data: rows,
            meta,
          };
        } else {
          ctx.body = {
            data: ctx.body,
          };

          if (ctx.bodyMeta) {
            ctx.body.meta = ctx.bodyMeta;
          }
        }
      } else if (ctx.action) {
        ctx.body = {
          data: ctx.body,
        };
      }
    }

    if (ctx.body && ctx.state.messages?.length) {
      ctx.body.messages = ctx.state.messages;
    }

    ctx.dataWrapped = true;
  };
}

export default dataWrapping;
