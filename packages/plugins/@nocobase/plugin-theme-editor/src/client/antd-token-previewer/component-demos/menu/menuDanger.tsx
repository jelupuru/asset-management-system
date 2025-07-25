/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';

import type { ComponentDemo } from '../../interface';

const items: MenuProps['items'] = [
  {
    key: '0',
    danger: true,
    label: '危险',
  },
  {
    key: '1',
    danger: true,
    label: '危险选中',
  },
  {
    key: '2',
    danger: true,
    disabled: true,
    label: '危险禁用',
  },
];

const Demo: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return <Menu onClick={onClick} style={{ width: 256 }} defaultSelectedKeys={['1']} items={items} />;
};

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorError', 'colorErrorHover', 'colorErrorOutline'],
  key: 'danger',
};

export default componentDemo;
