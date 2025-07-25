/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Schema } from '@formily/json-schema';
import { useTranslation } from 'react-i18next';
import { CollectionFieldOptions_deprecated } from '../../../collection-manager';
import { CollectionFieldOptions } from '../../../data-source/collection/Collection';
import { DEFAULT_DATA_SOURCE_KEY } from '../../../data-source/data-source/DataSourceManager';
import { useCurrentUserContext } from '../../../user';
import { useBaseVariable } from './useBaseVariable';

/**
 * @deprecated
 * 该 hook 已废弃，请使用 `useCurrentUserVariable` 代替
 *
 * 变量：`当前用户`
 * @param param0
 * @returns
 */
export const useUserVariable = ({
  collectionField,
  uiSchema,
  noDisabled,
  targetFieldSchema,
  maxDepth = 3,
}: {
  collectionField: CollectionFieldOptions_deprecated;
  uiSchema: any;
  maxDepth?: number;
  noDisabled?: boolean;
  /** 消费变量值的字段 */
  targetFieldSchema?: Schema;
}) => {
  const { t } = useTranslation();
  const result = useBaseVariable({
    collectionField,
    uiSchema,
    maxDepth,
    name: '$user',
    title: t('Current user'),
    collectionName: 'users',
    dataSource: DEFAULT_DATA_SOURCE_KEY,
    noDisabled,
    targetFieldSchema,
  });

  return result;
};

/**
 * 变量：`当前用户`
 * @param param0
 * @returns
 */
export const useCurrentUserVariable = ({
  collectionField,
  uiSchema,
  noDisabled,
  targetFieldSchema,
  maxDepth = 3,
}: {
  collectionField?: CollectionFieldOptions;
  uiSchema?: any;
  maxDepth?: number;
  noDisabled?: boolean;
  /** 消费变量值的字段 */
  targetFieldSchema?: Schema;
} = {}) => {
  const { t } = useTranslation();
  const data = useCurrentUserContext();
  const currentUserSettings = useBaseVariable({
    collectionField,
    uiSchema,
    maxDepth,
    name: '$user',
    title: t('Current user'),
    collectionName: 'users',
    noDisabled,
    targetFieldSchema,
    dataSource: DEFAULT_DATA_SOURCE_KEY,
  });

  return {
    /** 变量的配置项 */
    currentUserSettings,
    /** 变量的值 */
    currentUserCtx: data?.data?.data,
  };
};
