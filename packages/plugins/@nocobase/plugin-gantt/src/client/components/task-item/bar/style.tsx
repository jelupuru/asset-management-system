/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { css } from '@emotion/css';

export const barWrapper = css`
  cursor: pointer;
  outline: none;
  .barHandle {
    fill: #ddd;
    cursor: ew-resize;
    opacity: 0;
    // visibility: hidden;
  }
  &:hover .barHandle {
    visibility: visible;
    opacity: 1;
  }
`;

export const barBackground = css`
  user-select: none;
  stroke-width: 0;
  opacity: 0.6;
`;
