/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

const map2obj = (map: Map<string, string>) => {
  const obj = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
};

export async function checkAction(ctx, next) {
  const currentRole = ctx.state.currentRole;

  const roleInstance = await ctx.db.getRepository('roles').findOne({
    filter: {
      name: currentRole,
    },
    appends: ['menuUiSchemas'],
  });

  if (!roleInstance) {
    throw new Error(`Role ${currentRole} not exists`);
  }

  const anonymous = await ctx.db.getRepository('roles').findOne({
    filter: {
      name: 'anonymous',
    },
  });

  let role = ctx.app.acl.getRole(currentRole);

  if (!role) {
    await ctx.app.emitAsync('acl:writeRoleToACL', roleInstance);
    role = ctx.app.acl.getRole(currentRole);
  }

  const availableActions = ctx.app.acl.getAvailableActions();

  ctx.body = {
    ...role.toJSON(),
    availableActions: [...availableActions.keys()],
    resources: [...role.resources.keys()],
    actionAlias: map2obj(ctx.app.acl.actionAlias),
    allowAll: currentRole === 'root',
    allowConfigure: roleInstance.get('allowConfigure'),
    allowMenuItemIds: roleInstance.get('menuUiSchemas').map((uiSchema) => uiSchema.get('x-uid')),
    allowAnonymous: !!anonymous,
  };

  await next();
}
