/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import _ from 'lodash';

export function deepGet(object, path) {
  const pathParts = Array.isArray(path) ? path : path.split('.');

  let current = object;
  for (const part of pathParts) {
    if (Array.isArray(current)) {
      current = current.map((item) => _.get(item, part));
    } else {
      current = _.get(current, part);
    }
  }

  return current;
}
