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

export const DisassociateActionInitializer = (props) => {
  const schema = {
    title: '{{ t("Disassociate") }}',
    'x-action': 'disassociate',
    'x-component': 'Action',
    'x-use-component-props': 'useDisassociateActionProps',
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:disassociate',
    'x-component-props': {
      icon: 'DeleteOutlined',
      confirm: {
        title: "{{t('Disassociate record')}}",
        content: "{{t('Are you sure you want to disassociate it?')}}",
      },
      refreshDataBlockRequest: true,
    },
    'x-action-settings': {
      triggerWorkflows: [],
    },
  };
  return <ActionInitializer {...props} schema={schema} />;
};
