/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import _ from 'lodash';

/**
 * 如果 `value` 是一个数组，返回一个去重后的数组
 * @param value
 * @returns
 */
export const uniq = (value: any) => {
  if (!Array.isArray(value)) {
    return value;
  }

  if (!_.isObject(value[0])) {
    return value;
  }

  return _.uniqBy(value, (item) => {
    if ('id' in item) {
      return item.id;
    }
    return JSON.stringify(item);
  });
};
