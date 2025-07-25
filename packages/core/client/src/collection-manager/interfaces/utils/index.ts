/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Collection } from '../../../data-source';

export function getUniqueKeyFromCollection(collection: Collection) {
  if (collection?.filterTargetKey) {
    if (Array.isArray(collection.filterTargetKey)) {
      return collection?.filterTargetKey?.[0];
    }
    return collection?.filterTargetKey;
  }
  return collection?.getPrimaryKey() || 'id';
}
