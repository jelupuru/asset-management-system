/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { css, usePlugin } from '@nocobase/client';
import React from 'react';
import { PluginMobileClient } from '../index';
import { InterfaceProvider } from './InterfaceProvider';

export const InterfaceRouter: React.FC = React.memo(() => {
  const plugin = usePlugin(PluginMobileClient);
  const MobileRouter = plugin.getMobileRouterComponent();

  return (
    <InterfaceProvider>
      <div
        className={css`
          display: flex;
          width: 100%;
          height: 100%;
          position: relative;
        `}
      >
        <MobileRouter />
      </div>
    </InterfaceProvider>
  );
});
InterfaceRouter.displayName = 'InterfaceRouter';
