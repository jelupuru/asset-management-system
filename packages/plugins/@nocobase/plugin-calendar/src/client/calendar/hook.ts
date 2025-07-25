/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useDataBlockHeight, useBlockHeightProps } from '@nocobase/client';
import { theme } from 'antd';

export const useCalenderHeight = () => {
  const height = useDataBlockHeight();
  const { heightProps } = useBlockHeightProps();
  const { title } = heightProps;
  const { token } = theme.useToken();
  if (!height) {
    return;
  }
  const paddingHeight = 2 * token.paddingLG;
  const blockTitleHeaderHeight = title ? token.fontSizeLG * token.lineHeightLG + token.padding * 2 - 1 : 0;

  return height - paddingHeight - blockTitleHeaderHeight;
};
