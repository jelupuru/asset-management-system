/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const skip = (options: ACLSkipOptions) => {
  return async function ACLSkipMiddleware(ctx, next) {
    const { resourceName, actionName } = ctx.action;
    if (resourceName === options.resourceName && actionName === options.actionName) {
      ctx.permission = {
        skip: true,
      };
    }
    await next();
  };
};

interface ACLSkipOptions {
  resourceName: string;
  actionName: string;
}
