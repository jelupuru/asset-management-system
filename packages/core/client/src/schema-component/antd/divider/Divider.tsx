/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { connect, mapProps } from '@formily/react';
import { Divider as AntdDivider } from 'antd';
import React from 'react';

export const Divider = connect(
  (props) => {
    const { color, borderColor } = props;
    return <AntdDivider {...props} type="horizontal" style={{ color, borderColor }} orientationMargin="0" />;
  },
  mapProps((props) => {
    return {
      orientation: 'left',
      ...props,
    };
  }),
);

export default Divider;
