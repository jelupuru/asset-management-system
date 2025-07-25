/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import _ from 'lodash';
import { getPath } from './getPath';

/**
 * `{{ $user.name }}` => `$user`
 * @param variableString
 * @returns
 */

export const getVariableName = (variableString: string) => {
  if (!_.isString(variableString)) {
    return variableString;
  }

  const variablePath = getPath(variableString);
  const list = variablePath.split('.');
  const variableName = list[0];

  return variableName;
};
