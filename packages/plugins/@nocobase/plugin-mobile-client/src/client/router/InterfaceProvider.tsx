/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useContext } from 'react';

export const InterfaceContext = React.createContext(null);

export const InterfaceProvider = (props) => {
  return <InterfaceContext.Provider value={{ interface: true }}>{props.children}</InterfaceContext.Provider>;
};

export const useInterfaceContext = () => {
  return useContext(InterfaceContext);
};
