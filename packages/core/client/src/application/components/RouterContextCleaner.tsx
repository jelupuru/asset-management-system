/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC, ReactNode } from 'react';
import { UNSAFE_LocationContext, UNSAFE_RouteContext } from 'react-router-dom';

export const RouterContextCleaner: FC<{ children?: ReactNode }> = React.memo((props) => {
  return (
    <UNSAFE_RouteContext.Provider
      value={{
        outlet: null,
        matches: [],
        isDataRoute: false,
      }}
    >
      <UNSAFE_LocationContext.Provider value={null}>{props.children}</UNSAFE_LocationContext.Provider>
    </UNSAFE_RouteContext.Provider>
  );
});
RouterContextCleaner.displayName = 'RouterContextCleaner';
