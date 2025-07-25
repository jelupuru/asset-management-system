/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export default {
  name: 'dataSources.roles',
  actions: {
    async update(ctx, next) {
      const params = ctx.action.params;
      const { filterByTk: name, associatedIndex: dataSourceKey } = params;

      let connectionRoleRecord = await ctx.db.getRepository('dataSourcesRoles').findOne({
        filter: {
          roleName: name,
          dataSourceKey,
        },
      });

      if (!connectionRoleRecord) {
        connectionRoleRecord = await ctx.db.getRepository('dataSourcesRoles').create({
          values: {
            ...params.values,
            roleName: name,
            dataSourceKey,
          },
        });
      } else {
        await connectionRoleRecord.update({
          ...params.values,
        });
      }

      if (params.values.resources) {
        await ctx.db.getRepository('dataSourcesRolesResources').destroy({
          filter: {
            roleName: name,
            dataSourceKey,
          },
        });

        for (const resource of params.values.resources) {
          await ctx.db.getRepository('dataSourcesRolesResources').create({
            values: {
              ...resource,
              roleName: name,
              dataSourceKey,
            },
          });
        }
      }

      ctx.body = connectionRoleRecord.toJSON();

      await next();
    },

    async get(ctx, next) {
      const params = ctx.action.params;
      const { filterByTk: name, associatedIndex: dataSourceKey } = params;

      let connectionRoleRecord = await ctx.db.getRepository('dataSourcesRoles').findOne({
        filter: {
          roleName: name,
          dataSourceKey,
        },
      });

      if (!connectionRoleRecord) {
        connectionRoleRecord = await ctx.db.getRepository('dataSourcesRoles').create({
          values: {
            roleName: name,
            dataSourceKey,
          },
        });
      }

      ctx.body = connectionRoleRecord.toJSON();

      await next();
    },
  },
};
