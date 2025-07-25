/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createContext, useContext } from 'react';

export const AuthTypeContext = createContext<{
  type: string;
}>({ type: '' });
AuthTypeContext.displayName = 'AuthTypeContext';

export const AuthTypesContext = createContext<{
  types: {
    key: string;
    label: string;
    value: string;
  }[];
}>({ types: [] });
AuthTypesContext.displayName = 'AuthTypesContext';

export const useAuthTypes = () => {
  const { types } = useContext(AuthTypesContext);
  return types;
};
