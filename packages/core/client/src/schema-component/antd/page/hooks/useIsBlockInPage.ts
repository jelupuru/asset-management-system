/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useCallback } from 'react';
import { useActionContext } from '../../action';

/**
 * 判断当前区块是否在页面而不是在弹窗中
 */
export const useIsBlockInPage = () => {
  const { visible } = useActionContext();

  const isBlockInPage = useCallback(() => {
    return !visible;
  }, [visible]);

  return { isBlockInPage };
};
