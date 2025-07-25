/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import lodash from 'lodash';
import { filterMatch } from '@nocobase/database';

export default {
  name: 'dataSources.collections',
  actions: {
    async list(ctx, next) {
      const params = ctx.action.params;

      const { associatedIndex: dataSourceKey } = params;
      const dataSource = ctx.app.dataSourceManager.dataSources.get(dataSourceKey);
      const plugin: any = ctx.app.pm.get('data-source-manager');

      const dataSourceStatus = plugin.dataSourceStatus[dataSourceKey];

      if (dataSourceStatus === 'loading-failed') {
        const error = plugin.dataSourceErrors[dataSourceKey];
        if (error) {
          throw new Error(`dataSource ${dataSourceKey} loading failed: ${error.message}`);
        }

        throw new Error(`dataSource ${dataSourceKey} loading failed`);
      }

      if (['loading', 'reloading'].includes(dataSourceStatus)) {
        const progress = plugin.dataSourceLoadingProgress[dataSourceKey];

        if (progress) {
          throw new Error(`dataSource ${dataSourceKey} is ${dataSourceStatus} (${progress.loaded}/${progress.total})`);
        }

        throw new Error(`dataSource ${dataSourceKey} is ${dataSourceStatus}`);
      }

      if (!dataSource) {
        throw new Error(`dataSource ${dataSourceKey} not found`);
      }

      const { paginate, filter = {} } = ctx.action.params;

      const collections = lodash.sortBy(
        dataSource.collectionManager.getCollections().filter((collection) => {
          return filterMatch(collection.options, filter);
        }),
        'name',
      );

      const mapCollection = (collections) => {
        return collections.map((collection) => {
          return {
            ...collection.options,
            fields: collection.getFields().map((field) => field.options),
          };
        });
      };

      if (paginate === false || paginate === 'false') {
        ctx.body = mapCollection(collections);
      } else {
        const { page = 1, pageSize = 20 } = ctx.action.params;

        ctx.withoutDataWrapping = true;

        ctx.body = {
          data: mapCollection(collections.slice((page - 1) * pageSize, page * pageSize)),
          meta: {
            count: collections.length,
            page,
            pageSize,
            totalPage: Math.ceil(collections.length / pageSize),
          },
        };
      }

      await next();
    },

    async update(ctx, next) {
      const params = ctx.action.params;
      const { filterByTk: collectionName, associatedIndex: dataSourceKey } = params;

      let dataSourceCollectionRecord = await ctx.db.getRepository('dataSourcesCollections').findOne({
        filter: {
          name: collectionName,
          dataSourceKey,
        },
      });

      if (!dataSourceCollectionRecord) {
        dataSourceCollectionRecord = await ctx.db.getRepository('dataSourcesCollections').create({
          values: {
            ...params.values,
            name: collectionName,
            dataSourceKey,
          },
        });
      } else {
        await ctx.db.getRepository('dataSourcesCollections').update({
          filter: {
            name: collectionName,
            dataSourceKey,
          },
          values: params.values,
          updateAssociationValues: ['fields'],
        });
      }

      dataSourceCollectionRecord = await ctx.db.getRepository('dataSourcesCollections').findOne({
        filter: {
          name: collectionName,
          dataSourceKey,
        },
      });

      ctx.body = dataSourceCollectionRecord.toJSON();

      await next();
    },
  },
};
