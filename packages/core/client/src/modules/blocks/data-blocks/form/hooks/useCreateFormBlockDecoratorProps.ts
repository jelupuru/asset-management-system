/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useParentRecordCommon } from '../../../useParentRecordCommon';
import { useHiddenForInherit } from './useHiddenForInherit';

export function useCreateFormBlockDecoratorProps(props) {
  let parentRecord;

  const { hidden } = useHiddenForInherit(props);

  // association 的值是固定不变的，所以这里可以使用 hooks
  if (props.association) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    parentRecord = useParentRecordCommon(props.association);
  }

  return {
    parentRecord,
    hidden,
  };
}
