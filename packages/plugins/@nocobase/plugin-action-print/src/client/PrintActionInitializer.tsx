/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ActionInitializer } from '@nocobase/client';
import React from 'react';

export const PrintActionInitializer = (props) => {
  const schema = {
    title: '{{ t("Print") }}',
    'x-action': 'print',
    'x-component': 'Action',
    'x-use-component-props': 'useDetailPrintActionProps',
    'x-component-props': {
      icon: 'PrinterOutlined',
    },
  };
  return <ActionInitializer {...props} schema={schema} />;
};
