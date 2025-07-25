/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export default function getValueByPath(obj: any, path: string[]): any {
  if (!obj) {
    return undefined;
  }
  return path.reduce((prev, key) => {
    if (prev) {
      return prev[key];
    }
    return undefined;
  }, obj);
}
