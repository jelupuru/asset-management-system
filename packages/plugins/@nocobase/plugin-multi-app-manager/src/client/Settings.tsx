/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaComponent } from '@nocobase/client';
import { Card } from 'antd';
import React from 'react';

const schema = {
  type: 'object',
};

export const Settings = () => {
  return (
    <Card bordered={false}>
      <SchemaComponent schema={schema} />
    </Card>
  );
};
