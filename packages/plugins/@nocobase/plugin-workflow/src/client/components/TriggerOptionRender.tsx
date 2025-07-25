/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Space, Tag, Typography } from 'antd';

import { useCompile } from '@nocobase/client';

export function TriggerOptionRender({ data }) {
  const { label, color, options } = data;
  const compile = useCompile();
  return (
    <Space direction="vertical">
      <Tag color={color}>{compile(label)}</Tag>
      <Typography.Text type="secondary" style={{ whiteSpace: 'normal' }}>
        {compile(options.description)}
      </Typography.Text>
    </Space>
  );
}
