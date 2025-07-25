/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => {
  return css`
    .ant-table-cell {
      > .ant-space-horizontal {
        .ant-space-item-split:has(+ .ant-space-item:empty) {
          display: none;
        }
      }
    }
  `;
});
