/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { FormatVariableScopeParam, FormatVariableScopeReturn } from '../VariableInput';

export function formatVariableScop(variableScop: FormatVariableScopeParam[]): FormatVariableScopeReturn[] {
  return variableScop.map((item) => {
    return {
      ...item,
      value: item.name,
      key: item.name,
      label: item.title,
      disabled: item.disabled,
      children: item.children ? formatVariableScop(item.children) : undefined,
    };
  });
}
