/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import Database from '@nocobase/database';

export function afterCreateForReverseField(db: Database) {
  return async (model, { transaction }) => {
    const Field = db.getCollection('fields');
    const reverseKey = model.get('reverseKey');

    if (!reverseKey) {
      return;
    }

    const reverse = await Field.model.findByPk(reverseKey, { transaction });
    await reverse.update({ reverseKey: model.get('key') }, { hooks: false, transaction });
  };
}
