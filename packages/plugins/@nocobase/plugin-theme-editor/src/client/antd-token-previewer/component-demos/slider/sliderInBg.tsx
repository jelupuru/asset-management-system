/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Slider, theme } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../interface';

const Demo = () => {
  const { token } = theme.useToken();
  return (
    <div style={{ padding: 12, background: token.colorFillSecondary }}>
      <Slider defaultValue={30} />
      <Slider range defaultValue={[20, 50]} />
    </div>
  );
};

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: [
    'colorFillSecondary',
    'colorFillContentHover',
    'colorBgContainer',
    'colorPrimary',
    'colorPrimaryHover',
    'colorPrimaryBorderHover',
    'colorPrimaryBorder',
  ],
  key: 'sliderInBg',
};

export default componentDemo;
