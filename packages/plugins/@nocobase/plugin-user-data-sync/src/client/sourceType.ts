/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createContext, useContext } from 'react';

export const SourceTypeContext = createContext<{ type: string }>({ type: '' });
SourceTypeContext.displayName = 'SourceTypeContext';

export const SourceTypesContext = createContext<{
  types: {
    key: string;
    label: string;
    value: string;
  }[];
}>({ types: [] });
SourceTypesContext.displayName = 'SourceTypesContext';

export const useSourceTypes = () => {
  const { types } = useContext(SourceTypesContext);
  return types;
};
