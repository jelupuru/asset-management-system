/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export class FieldNameExistsError extends Error {
  value: string;
  collectionName: string;

  constructor(value: string, collectionName: string) {
    super(`Field name "${value}" already exists in collection "${collectionName}"`);
    this.value = value;
    this.collectionName = collectionName;

    this.name = 'FieldNameExistsError';
  }
}
