/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useFieldSchema } from '@formily/react';
import { useEffect } from 'react';
import { useOperators } from '../../../../../block-provider/CollectOperators';

/**
 * 用于将筛选表单中的字段操作符收集到一起
 */
export const useCollectOperator = () => {
  const fieldSchema = useFieldSchema();
  const { collectOperator, removeOperator } = useOperators();

  useEffect(() => {
    return () => {
      removeOperator(fieldSchema.name);
    };
  }, [fieldSchema.name, removeOperator]);

  if (fieldSchema['x-filter-operator']) {
    collectOperator(fieldSchema.name, fieldSchema['x-filter-operator']);
  }
};
