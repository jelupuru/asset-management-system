/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC, useEffect } from 'react';
import { ShowTipWhenNoPages } from '../ShowTipWhenNoPages';
import { MobileRoutesProvider, MobileTitleProvider } from './context';

export interface MobileProvidersProps {
  children?: React.ReactNode;
}

export const MobileProviders: FC<MobileProvidersProps> = ({ children }) => {
  useEffect(() => {
    document.body.style.setProperty('--nb-mobile-page-tabs-content-padding', '12px');
    document.body.style.setProperty('--nb-mobile-page-header-height', '50px');
  }, []);

  return (
    <MobileTitleProvider>
      <MobileRoutesProvider>
        <ShowTipWhenNoPages>{children}</ShowTipWhenNoPages>
      </MobileRoutesProvider>
    </MobileTitleProvider>
  );
};
