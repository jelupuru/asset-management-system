/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export function addAppVersion(schema: any, appVersion: string) {
  if (!schema) {
    return;
  }

  // 复制的场景中可能已经存在了 x-app-version
  if (!schema['x-app-version']) {
    schema['x-app-version'] = appVersion;
  }

  Object.keys(schema.properties || {}).forEach((key) => {
    addAppVersion(schema.properties?.[key], appVersion);
  });

  return schema;
}
