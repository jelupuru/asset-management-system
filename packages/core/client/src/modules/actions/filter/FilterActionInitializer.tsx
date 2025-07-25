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

export const FilterActionInitializer = (props) => {
  const schema = {
    type: 'void',
    title: '{{ t("Filter") }}',
    'x-action': 'filter',
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:filter',
    'x-component': 'Filter.Action',
    'x-use-component-props': 'useFilterActionProps',
    'x-component-props': {
      icon: 'FilterOutlined',
    },
  };
  return <ActionInitializer {...props} schema={schema} />;
};
