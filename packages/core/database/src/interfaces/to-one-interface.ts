/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BaseInterface } from './base-interface';

export class ToOneInterface extends BaseInterface {
  toString(value: any, ctx?: any): string {
    return value;
  }

  async toValue(str: string, ctx?: any) {
    if (!str) {
      return null;
    }

    const { filterKey, associationField, targetCollection, transaction } = ctx;

    const targetInstance = await targetCollection.repository.findOne({
      filter: {
        [filterKey]: str,
      },
      transaction,
    });

    if (!targetInstance) {
      throw new Error(`"${str}" not found in ${targetCollection.model.name} ${filterKey}`);
    }

    const targetKey = associationField.targetKey || targetCollection.model.primaryKeyAttribute;

    return targetInstance[targetKey];
  }
}
