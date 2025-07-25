/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import Select from './_internal';

import React from 'react';
import type { ComponentDemo } from '../../interface';

import options from './data';

const handleChange = (value: any) => {
  console.log(`selected ${value}`);
};

const Demo = () => (
  <Select
    allowClear
    style={{
      width: '100%',
    }}
    options={options}
    placeholder="Please select"
    value={['a10', 'c12']}
    onChange={handleChange}
  />
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorIcon', 'colorIconHover'],
  key: 'icon',
};

export default componentDemo;
