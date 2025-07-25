/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaComponent } from '@nocobase/client';
import React from 'react';
import { Card } from 'antd';

import providers from './schemas/providers';
import ProviderOptions from './ProviderOptions';

export function VerificationProviders() {
  return (
    <Card bordered={false}>
      <SchemaComponent
        schema={providers}
        components={{
          ProviderOptions,
        }}
      />
    </Card>
  );
}
