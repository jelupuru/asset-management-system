/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const getConnectionCollectionPath = ({ key, type }: { key: string | number; type: string }) => {
  return `/admin/settings/data-source-manager/${key}/collections?type=${type}`;
};
