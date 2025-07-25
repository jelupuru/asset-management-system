/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/server';
import { Collection } from '@nocobase/database';
import { SQLCollection } from './sql-collection';
import sqlResourcer from './resources/sql';
import { checkSQL } from './utils';

export class PluginCollectionSQLServer extends Plugin {
  async beforeLoad() {
    this.app.db.collectionFactory.registerCollectionType(SQLCollection, {
      condition: (options) => {
        return options.sql;
      },

      async onSync() {
        return;
      },

      async onDump(dumper, collection: Collection) {
        return;
      },
    });

    this.app.resourceManager.define(sqlResourcer);

    this.app.acl.registerSnippet({
      name: `pm.data-source-manager.collection-sql `,
      actions: ['sqlCollection:*'],
    });

    this.app.resourceManager.use(async (ctx, next) => {
      const { resourceName, actionName } = ctx.action;
      if (resourceName === 'collections' && actionName === 'create') {
        const { sql } = ctx.action.params.values || {};
        if (sql) {
          try {
            checkSQL(sql);
          } catch (e) {
            ctx.throw(400, ctx.t(e.message));
          }
        }
      }
      return next();
    });
  }
}

export default PluginCollectionSQLServer;
