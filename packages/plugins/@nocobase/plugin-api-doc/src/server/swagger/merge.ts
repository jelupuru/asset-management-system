/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { merge as deepmerge } from '@nocobase/utils';

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray.concat(destinationArray);

export function merge(obj1: any, obj2: any, opts?: any) {
  return deepmerge(obj1, obj2, {
    arrayMerge: overwriteMerge,
    ...opts,
  });
}
