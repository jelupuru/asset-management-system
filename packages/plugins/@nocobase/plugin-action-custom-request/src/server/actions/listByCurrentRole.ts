/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Context } from '@nocobase/actions';

export async function listByCurrentRole(ctx: Context) {
  const repo = ctx.db.getRepository('customRequests');
  const data = await repo.find({
    appends: ['roles'],
  });
  const crRepo = ctx.db.getRepository('customRequestsRoles');
  ctx.body = data
    .filter((item) => {
      return !item.roles.length;
    })
    .map((item) => item.key)
    .concat(
      (
        await crRepo.find({
          filter: {
            roleName: ctx.state.currentRole,
          },
        })
      ).map((item) => item.customRequestKey),
    );
}
