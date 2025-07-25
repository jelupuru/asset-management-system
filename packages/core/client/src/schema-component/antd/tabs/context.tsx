/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { TabsProps } from 'antd';
import React from 'react';

interface TabsContextProps extends TabsProps {
  PaneRoot?: React.FC<any>;
}
const TabsContext = React.createContext<TabsContextProps>({});

export const TabsContextProvider: React.FC<TabsContextProps> = ({ children, ...props }) => {
  return <TabsContext.Provider value={props}>{children}</TabsContext.Provider>;
};

export const useTabsContext = () => {
  return React.useContext(TabsContext);
};
