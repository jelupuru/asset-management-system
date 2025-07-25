/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Collapse } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../interface';

const { Panel } = Collapse;
const text = `  A dog is a type of domesticated animal.  Known for its loyalty and faithfulness,  it can be found as a welcome guest in many households across the world.`;

const Demo = () => (
  <Collapse defaultActiveKey={['1']}>
    <Panel header="This is panel header 1" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorTextSecondary', 'colorText', 'colorFillAlter', 'colorBgContainer'],
  key: 'default',
};

export default componentDemo;
