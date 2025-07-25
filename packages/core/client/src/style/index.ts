/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CreateStylesUtils, createStyles } from 'antd-style';
import { CustomToken } from '../global-theme';
export * from './useToken';
export { createStyles };
export interface CustomCreateStylesUtils extends CreateStylesUtils {
  token: CustomToken;
}
