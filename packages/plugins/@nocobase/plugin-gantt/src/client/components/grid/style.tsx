/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => {
  return {
    gridRow: css`
      fill: ${token.colorBgContainer};
    `,
    gridHeightRow: css`
      fill: #e6f7ff;
      border-color: ${token.colorBorder};
    `,
    nbGridbody: css`
      .gridrowline: {
        stroke: ${token.colorBorderSecondary};
        stroke-width: 0;
        border-bottom: 1px solid ${token.colorBorderSecondary};
      }
      .gridtick: {
        stroke: ${token.colorBorderSecondary};
      }
    `,
  };
});

export default useStyles;
