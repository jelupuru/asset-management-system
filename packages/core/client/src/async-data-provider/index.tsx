/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Result } from 'ahooks/es/useRequest/src/types';
import React, { createContext, useContext } from 'react';
import { useRequest } from '../api-client';

export const AsyncDataContext = createContext<Result<any, any> & { state?: any; setState?: any }>(null);
AsyncDataContext.displayName = 'AsyncDataContext';

export interface AsyncDataProviderProps {
  value?: any;
  request?: any;
  uid?: string;
  onSuccess?: (data, params) => void;
}

export const AsyncDataProvider: React.FC<AsyncDataProviderProps> = (props) => {
  const { value, request, children, ...others } = props;
  const result = useRequest(request, { ...others });
  if (value) {
    return <AsyncDataContext.Provider value={value}>{children}</AsyncDataContext.Provider>;
  }
  return <AsyncDataContext.Provider value={result}>{children}</AsyncDataContext.Provider>;
};

export const useAsyncData = () => {
  return useContext(AsyncDataContext);
};
