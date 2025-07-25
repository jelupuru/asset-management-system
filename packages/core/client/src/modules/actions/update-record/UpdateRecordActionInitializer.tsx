/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { BlockInitializer } from '../../../schema-initializer/items';
import { useSchemaInitializerItem } from '../../../application';

export const UpdateRecordActionInitializer = (props) => {
  const schema = {
    title: '{{ t("Update record") }}',
    'x-component': props?.['x-component'] || 'Action.Link',
    'x-use-component-props': 'useCustomizeUpdateActionProps',
    'x-action': 'customize:update',
    'x-decorator': 'ACLActionProvider',
    'x-acl-action': 'update',
    // 'x-designer': 'Action.Designer',
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:updateRecord',
    'x-action-settings': {
      assignedValues: {},
      onSuccess: {
        manualClose: false,
        redirecting: false,
        successMessage: '{{t("Updated successfully")}}',
      },
      triggerWorkflows: [],
    },
  };

  const itemConfig = useSchemaInitializerItem();
  return <BlockInitializer {...itemConfig} schema={schema} item={itemConfig} />;
};
