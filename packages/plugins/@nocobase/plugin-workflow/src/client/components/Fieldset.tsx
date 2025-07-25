/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { FormLayout } from '@formily/antd-v5';
import { Card } from 'antd';

export function Fieldset(props) {
  return (
    <Card>
      <FormLayout layout={props.layout || 'vertical'}>{props.children}</FormLayout>
    </Card>
  );
}
