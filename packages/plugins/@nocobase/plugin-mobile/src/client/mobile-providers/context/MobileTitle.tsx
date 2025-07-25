/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC, createContext } from 'react';

interface MobileTitleContextProps {
  title: string;
  setTitle: (title: string) => void;
}

export const MobileTitleContext = createContext<MobileTitleContextProps>(null);
MobileTitleContext.displayName = 'MobileTitleContext';

export interface MobileTitleProviderProps {
  children?: React.ReactNode;
  title?: string;
}

export const MobileTitleProvider: FC<MobileTitleProviderProps> = ({ children, title: defaultTitle }) => {
  const [title, setTitle] = React.useState<string | undefined>(defaultTitle);
  return <MobileTitleContext.Provider value={{ title, setTitle }}>{children}</MobileTitleContext.Provider>;
};

export const useMobileTitle = () => {
  return React.useContext(MobileTitleContext);
};
