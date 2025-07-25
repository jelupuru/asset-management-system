/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export function findSchema(schema, filter, onlyLeaf = false) {
  const result = [];

  if (!schema) {
    return result;
  }

  if (filter(schema) && (!onlyLeaf || !schema.properties)) {
    result.push(schema);
    return result;
  }

  if (schema.properties) {
    Object.keys(schema.properties).forEach((key) => {
      result.push(...findSchema(schema.properties[key], filter));
    });
  }
  return result;
}
