/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';

const ThemeEditorContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>(null);

export const useThemeEditorContext = () => React.useContext(ThemeEditorContext);

export const ThemeEditorProvider = ({ children, open, setOpen }) => {
  return <ThemeEditorContext.Provider value={{ open, setOpen }}>{children}</ThemeEditorContext.Provider>;
};

ThemeEditorProvider.displayName = 'ThemeEditorProvider';
