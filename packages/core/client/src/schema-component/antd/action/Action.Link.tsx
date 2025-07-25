/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer } from '@formily/react';
import classnames from 'classnames';
import React from 'react';
import { withDynamicSchemaProps } from '../../../hoc/withDynamicSchemaProps';
import Action from './Action';
import { ComposedAction } from './types';

export const ActionLink: ComposedAction = withDynamicSchemaProps(
  observer((props: any) => {
    return (
      <Action {...props} component={props.component || 'a'} className={classnames('nb-action-link', props.className)} />
    );
  }),
  { displayName: 'ActionLink' },
);
