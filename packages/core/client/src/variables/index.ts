/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export { default as VariablesProvider, VariablesContext } from './VariablesProvider';
export { default as useBuiltinVariables } from './hooks/useBuiltinVariables';
export { default as useContextVariable } from './hooks/useContextVariable';
export { default as useLocalVariables } from './hooks/useLocalVariables';
export { default as useVariables } from './hooks/useVariables';
export * from './utils/isVariable';
export * from './utils/transformVariableValue';

export * from './constants';
export type { VariablesContextType } from './types';
