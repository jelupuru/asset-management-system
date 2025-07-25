/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useAPIClient } from '../../../api-client/hooks/useAPIClient';
import { useBaseVariable } from './useBaseVariable';

/**
 * 变量：`当前 Token`
 * @param param0
 * @returns
 */
export const useAPITokenVariable = ({
  noDisabled,
}: {
  noDisabled?: boolean;
} = {}) => {
  const apiClient = useAPIClient();
  const apiTokenSettings = useBaseVariable({
    name: '$nToken',
    title: 'API token',
    noDisabled,
    noChildren: true,
  });

  return {
    /** 变量配置项 */
    apiTokenSettings,
    /** 变量的值 */
    apiTokenCtx: apiClient.auth?.token,
  };
};
