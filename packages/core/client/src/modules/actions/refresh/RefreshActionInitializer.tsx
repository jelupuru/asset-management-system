/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { ActionInitializer } from '../../../schema-initializer/items/ActionInitializer';

export const RefreshActionInitializer = (props) => {
  const schema = {
    title: '{{ t("Refresh") }}',
    'x-action': 'refresh',
    'x-component': 'Action',
    'x-use-component-props': 'useRefreshActionProps',
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:refresh',
    'x-component-props': {
      icon: 'ReloadOutlined',
    },
  };
  return <ActionInitializer {...props} schema={schema} />;
};
