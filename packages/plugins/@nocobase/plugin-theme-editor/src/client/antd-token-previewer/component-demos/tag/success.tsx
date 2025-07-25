/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Tag } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../interface';

const Demo = () => <Tag color="success">Success</Tag>;

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorSuccess', 'colorSuccessBg', 'colorSuccessBorder'],
  key: 'success',
};

export default componentDemo;
