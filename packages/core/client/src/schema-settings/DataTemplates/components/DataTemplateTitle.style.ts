/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { genStyleHook } from '../../../schema-component/antd/__builtins__/style';

export const useStyles = genStyleHook('nb-array-collapse', (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      marginBottom: '10px',
    },
  };
});
