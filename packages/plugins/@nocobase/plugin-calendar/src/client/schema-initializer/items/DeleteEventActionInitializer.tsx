/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { ActionInitializerItem } from '@nocobase/client';

export const DeleteEventActionInitializer = (props) => {
  const schema = {
    title: '{{ t("Delete Event") }}',
    'x-action': 'deleteEvent',
    'x-acl-action': 'destroy',
    'x-component': 'Action',
    'x-designer': 'Action.Designer',
    'x-component-props': {
      icon: 'DeleteOutlined',
    },
    properties: {
      modal: {
        'x-component': 'CalendarV2.DeleteEvent',
      },
    },
  };
  return <ActionInitializerItem {...props} schema={schema} />;
};
