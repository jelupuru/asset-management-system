/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ButtonProps } from 'antd';
import React, { FC } from 'react';
import { SchemaInitializerChildren } from './SchemaInitializerChildren';
import { SchemaInitializerOptions } from '../types';

export type SchemaInitializerItemsProps<P1 = ButtonProps, P2 = {}> = P2 & {
  options?: SchemaInitializerOptions<P1, P2>;
  items?: SchemaInitializerOptions['items'];
};

export const SchemaInitializerItems: FC<SchemaInitializerItemsProps> = (props) => {
  const { items } = props;
  if (items.length === 0) return null;
  return <SchemaInitializerChildren>{items}</SchemaInitializerChildren>;
};
