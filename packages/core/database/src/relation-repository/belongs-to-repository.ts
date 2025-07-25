/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BelongsTo } from 'sequelize';
import { SingleRelationRepository } from './single-relation-repository';

export class BelongsToRepository extends SingleRelationRepository {
  /**
   * @internal
   */
  async filterOptions(sourceModel) {
    const association = this.association as BelongsTo;

    return {
      // @ts-ignore
      [association.targetKey]: sourceModel.get(association.foreignKey),
    };
  }
}
