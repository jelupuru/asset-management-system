/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Typography } from 'antd';
import React from 'react';

import type { ComponentDemo } from '../../interface';

const Demo = () => (
  <div>
    <Typography.Text type={'danger'} onClick={(e) => e.preventDefault()}>
      Hover me <DownOutlined />
    </Typography.Text>
    <Dropdown._InternalPanelDoNotUseOrYouWillBeFired
      menu={{
        items: [
          {
            label: 'item 1',
            key: '1',
          },
          {
            label: 'a danger item',
            danger: true,
            key: '3',
          },
          {
            label: 'danger disabled item',
            danger: true,
            disabled: true,
            key: '2',
          },
        ],
      }}
    />
  </div>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorHover', 'colorBgElevated'],
  key: 'default',
};

export default componentDemo;
