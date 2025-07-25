/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { theme } from 'antd';
import { CustomToken } from '../../../../global-theme';

interface Result extends ReturnType<typeof theme.useToken> {
  token: CustomToken;
}

const useToken = () => {
  const result = theme.useToken();
  return result as Result;
};

export { useToken };
