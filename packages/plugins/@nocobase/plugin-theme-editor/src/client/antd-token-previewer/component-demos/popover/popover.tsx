/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Button, Popover } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../interface';

const content = (
  <div>
    <p>Content</p> <p>Content</p>
  </div>
);
const Demo = () => (
  <div>
    <Popover._InternalPanelDoNotUseOrYouWillBeFired content={content} title="Title" />
    <Button type="primary">Hover me</Button>
  </div>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorBgElevated'],
  key: 'default',
};

export default componentDemo;
