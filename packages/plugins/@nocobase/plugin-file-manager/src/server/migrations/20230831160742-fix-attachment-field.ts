/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Op, Repository } from '@nocobase/database';
import { Migration } from '@nocobase/server';

export default class extends Migration {
  appVersion = '<0.13.0-alpha.5';
  async up() {
    const result = await this.app.version.satisfies('<0.13.0-alpha.5');

    if (!result) {
      return;
    }

    const r = this.db.getRepository<Repository>('uiSchemas');
    const items = await r.find({
      filter: {
        'schema.x-component': 'CollectionField',
        'schema.x-component-props.action': {
          [Op.like]: '%:create?attachementField%',
        },
      },
    });
    console.log(items?.length);

    await this.db.sequelize.transaction(async (transaction) => {
      for (const item of items) {
        const schema = item.schema;
        if (!schema['x-collection-field']) {
          continue;
        }
        const field = this.db.getFieldByPath(schema['x-collection-field']);
        if (!field) {
          continue;
        }
        schema['x-component-props'] = schema['x-component-props'] || {};
        schema['x-component-props'].action = schema['x-component-props'].action.replace(
          'attachementField',
          'attachmentField',
        );
        item.set('schema', schema);
        await item.save({ transaction });
      }
    });
  }
}
