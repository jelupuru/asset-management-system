/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { createContext, useContext } from 'react';
import { useRequest } from '../api-client';

export const CurrentAppInfoContext = createContext(null);
CurrentAppInfoContext.displayName = 'CurrentAppInfoContext';

export const useCurrentAppInfo = () => {
  return useContext<{
    data: {
      database: {
        dialect: string;
      };
      lang: string;
      version: string;
      exportLimit?: number;
      name: string;
    };
  }>(CurrentAppInfoContext);
};
export const CurrentAppInfoProvider = (props) => {
  const result = useRequest({
    url: 'app:getInfo',
  });

  return <CurrentAppInfoContext.Provider value={result.data}>{props.children}</CurrentAppInfoContext.Provider>;
};
