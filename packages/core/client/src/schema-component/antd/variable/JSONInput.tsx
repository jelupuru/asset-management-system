/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';

import { Input } from '../input';
import { RawTextArea } from './RawTextArea';
import { css } from '@emotion/css';

export function JSONInput(props) {
  return (
    <RawTextArea
      buttonClass={css`
        &:not(:hover) {
          border-right-color: transparent;
          border-top-color: transparent;
        }
        background-color: transparent;
      `}
      {...props}
      component={Input.JSON}
    />
  );
}
