/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { createContext } from 'react';
import { InsertType, SchemaInitializerItemType, SchemaInitializerOptions } from '../types';

export const SchemaInitializerContext = createContext<{
  insert: InsertType;
  options: SchemaInitializerOptions<any>;
  visible: boolean;
  setVisible: (v: boolean) => void;
}>({} as any);
SchemaInitializerContext.displayName = 'SchemaInitializerContext';

export const useSchemaInitializer = () => {
  return React.useContext(SchemaInitializerContext);
};

export const SchemaInitializerItemContext = createContext<
  Omit<
    SchemaInitializerItemType,
    'type' | 'Component' | 'component' | 'useVisible' | 'useChildren' | 'hideIfNoChildren' | 'sort' | 'componentProps'
  >
>({} as any);
SchemaInitializerItemContext.displayName = 'SchemaInitializerItemContext';

export const useSchemaInitializerItem = <T = any>(): T => {
  return React.useContext(SchemaInitializerItemContext) as T;
};
