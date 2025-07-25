/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import {
  InheritanceCollectionMixin,
  useCollection,
  useCollectionManager,
  useCollectionParentRecordData,
  useCollectionRecordData,
} from '../..';

/**
 * @internal
 * @deprecated
 * 已弃用（该方法现在只是用来兼容旧版 Schema 的），请通过各个区块的 x-use-decorator-props 中获取 parentRecord
 *
 * 注意：这里有一个需要更改 schema 才能解决的问题，就是在获取 parentRecord 的时候无法确定（在关系字段和当前表同表时）
 * 是需要从 recordData 还是 parentRecordData 中获取;解决方法是通过更改 schema，在不同类型的关系区块中
 * （`通过点击关系字段按钮打开的弹窗中创建的非关系字段区块`和`关系字段区块`）使用不同的 hook。
 *
 * 更新：上面所说的“需要更改 schema 才能解决的问题”已在这个任务中更改：https://nocobase.height.app/T-3848/description
 *
 * @param param0
 * @returns
 */
export const useDataBlockParentRecord = ({ association }: { association: string }) => {
  const recordData = useCollectionRecordData();
  const parentRecordData = useCollectionParentRecordData();
  const cm = useCollectionManager();
  const currentRecordCollection = useCollection<InheritanceCollectionMixin>();

  if (!association) return;

  const sourceCollection = cm.getCollection<InheritanceCollectionMixin>(association.split('.')[0]);

  if (
    currentRecordCollection.name === sourceCollection.name ||
    currentRecordCollection.getParentCollectionsName?.().includes(sourceCollection.name)
  ) {
    return recordData;
  }

  return parentRecordData;
};
