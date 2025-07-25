/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export function parseCollectionName(collection: string) {
  if (!collection) {
    return [];
  }
  const dataSourceCollection = collection.split(':');
  const collectionName = dataSourceCollection.pop();
  const dataSourceName = dataSourceCollection[0] ?? 'main';
  return [dataSourceName, collectionName];
}

export function joinCollectionName(dataSourceName: string, collectionName: string) {
  if (!dataSourceName || dataSourceName === 'main') {
    return collectionName;
  }
  return `${dataSourceName}:${collectionName}`;
}
