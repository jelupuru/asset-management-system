/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { useMobileApp } from '../mobile';
import { MobileProviders } from '../mobile-providers/MobileProviders';
import { MobileTabBar } from './mobile-tab-bar';

export interface MobileLayoutProps {
  children?: React.ReactNode;
}

export const MobileLayout: FC<MobileLayoutProps> = () => {
  const { showTabBar } = useMobileApp();
  return (
    <MobileProviders>
      <Outlet />
      <MobileTabBar enableTabBar={showTabBar} />
    </MobileProviders>
  );
};
