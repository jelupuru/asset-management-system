/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Steps } from 'antd';
import React from 'react';
import type { ComponentDemo } from '../../interface';

const { Step } = Steps;

const Demo: React.FC = () => (
  <Steps current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>
);

const componentDemo: ComponentDemo = {
  demo: <Demo />,
  tokens: ['colorPrimary', 'colorBgContainer'],
  key: 'default',
};

export default componentDemo;
