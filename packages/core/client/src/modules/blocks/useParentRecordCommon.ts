/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useCollectionRecordData } from '../../data-source/collection-record/CollectionRecordProvider';

/**
 * @internal
 * 大部分区块（除了详情和编辑表单）都适用的获取 sourceRecord 的 hook
 * @param association
 * @returns
 */
export const useParentRecordCommon = (association: string) => {
  const recordData = useCollectionRecordData();

  if (!association) return;

  return recordData;
};
