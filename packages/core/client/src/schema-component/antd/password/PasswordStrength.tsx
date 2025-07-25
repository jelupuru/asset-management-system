/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { isFn } from '@formily/shared';
import React, { Fragment } from 'react';
import { getStrength } from './utils';

type ReactRenderPropsChildren<T = any> = React.ReactNode | ((props: T) => React.ReactElement);

interface IPasswordStrengthProps {
  value?: any;
  children?: ReactRenderPropsChildren<number>;
}

export const PasswordStrength: React.FC<IPasswordStrengthProps> = (props) => {
  if (isFn(props.children)) {
    return props.children(getStrength(String(props.value || '')));
  } else {
    return <Fragment>{props.children}</Fragment>;
  }
};
