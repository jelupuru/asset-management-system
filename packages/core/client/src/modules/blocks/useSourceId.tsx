/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useDataBlockProps } from '../..';
import { useDataBlockParentRecord } from '../../block-provider/hooks/useDataBlockParentRecord';
import { useSourceKey } from './useSourceKey';

export const useSourceId = () => {
  const { sourceId, association } = useDataBlockProps() || {};
  const sourceKey = useSourceKey(association);
  const sourceRecord = useDataBlockParentRecord({ association });

  if (sourceId) {
    return sourceId;
  }

  return sourceRecord?.[sourceKey];
};
