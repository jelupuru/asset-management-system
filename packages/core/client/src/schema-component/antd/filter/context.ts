/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ObjectField } from '@formily/core';
import { Schema } from '@formily/react';
import { ComponentType, createContext } from 'react';
import { DynamicComponentProps } from './DynamicComponent';

export interface FilterContextProps {
  field?: ObjectField & { collectionName?: string };
  fieldSchema?: Schema;
  dynamicComponent?: ComponentType<DynamicComponentProps>;
  options?: any[];
  disabled?: boolean;
  collectionName?: string;
}

export const RemoveConditionContext = createContext(null);
RemoveConditionContext.displayName = 'RemoveConditionContext';
export const FilterContext = createContext<FilterContextProps>(null);
FilterContext.displayName = 'FilterContext';
export const FilterLogicContext = createContext(null);
FilterLogicContext.displayName = 'FilterLogicContext';
