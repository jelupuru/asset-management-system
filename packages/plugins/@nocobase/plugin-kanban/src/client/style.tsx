/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createStyles } from '@nocobase/client';

export const useStyles = createStyles(({ token, css }) => {
  return {
    nbKanban: css`
      overflow: hidden;
      height: 100%;
      overflow-y: auto;
      .ant-spin-container {
        height: 100%;
        // .ant-formily-item-label: {
        //   color: #8c8c8c;
        //   fontweight: normal;
        // }
        // 为了撑满固定区块时的高度
        & > * {
          height: 100%;
        }
      }
    `,
  };
});
