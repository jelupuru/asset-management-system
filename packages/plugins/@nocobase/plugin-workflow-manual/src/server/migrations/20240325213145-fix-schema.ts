/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Migration } from '@nocobase/server';

function findSchema(root, filter, onlyLeaf = false) {
  const result = [];

  if (!root) {
    return result;
  }

  if (filter(root) && (!onlyLeaf || !root.properties)) {
    result.push(root);
    return result;
  }

  if (root.properties) {
    Object.keys(root.properties).forEach((key) => {
      result.push(...findSchema(root.properties[key], filter));
    });
  }
  return result;
}

function changeToDataPath(item) {
  if (item && item['x-decorator-props']?.dataSource) {
    item['x-decorator-props'].dataPath = item['x-decorator-props'].dataSource.replace(/^{{|}}$/g, '');
    delete item['x-decorator-props'].dataSource;
  }
}

function migrateSchema(schema) {
  const root = { properties: schema };

  const detailNodes = findSchema(root, (item) => {
    return (
      item['x-decorator'] === 'DetailsBlockProvider' &&
      item['x-component'] === 'CardItem' &&
      item['x-designer'] === 'SimpleDesigner'
    );
  });

  detailNodes.forEach(changeToDataPath);

  return schema;
}

export default class extends Migration {
  appVersion = '<0.21.0-alpha.15';
  async up() {
    const { db } = this.context;
    const NodeRepo = db.getRepository('flow_nodes');
    await db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        filter: {
          type: 'manual',
        },
        transaction,
      });
      console.log('%d nodes need to be migrated.', nodes.length);

      await nodes.reduce(
        (promise, node) =>
          promise.then(() => {
            const { assignees, forms, schema = {}, ...tabs } = node.config;
            return node.update(
              {
                config: {
                  assignees,
                  forms,
                  schema: migrateSchema({ ...tabs, ...schema }),
                },
              },
              {
                silent: true,
                transaction,
              },
            );
          }),
        Promise.resolve(),
      );
    });
  }
}
