/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { HasOne } from 'sequelize';
import { SingleRelationRepository } from './single-relation-repository';

export class HasOneRepository extends SingleRelationRepository {
  /**
   * @internal
   */
  filterOptions(sourceModel) {
    const association = this.association as HasOne;

    return {
      // @ts-ignore
      [association.foreignKey]: sourceModel.get(association.sourceKey),
    };
  }
}
