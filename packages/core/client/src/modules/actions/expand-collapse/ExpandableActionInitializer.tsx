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

export const ExpandableActionInitializer = (props) => {
  const schema = {
    'x-action': 'expandAll',
    'x-component': 'Action',
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:expendable',
    'x-component-props': {
      titleExpand: "{{t('Expand all')}}",
      titleCollapse: "{{t('Collapse all')}}",
      iconExpand: 'nodeexpandoutlined',
      iconCollapse: 'nodecollapseoutlined',
      component: 'Expand.Action',
      useAction: () => {
        return {
          run() {},
        };
      },
    },
  };
  return <ActionInitializer {...props} schema={schema} />;
};
