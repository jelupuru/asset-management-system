/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useNavigateNoUpdate } from '@nocobase/client';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isJSBridge } from './core/bridge';

export const MobileClientProvider = React.memo((props) => {
  const location = useLocation();
  const navigate = useNavigateNoUpdate();

  useEffect(() => {
    if (isJSBridge() && location.pathname === '/admin') {
      navigate('/mobile', { replace: true });
    }
  }, [location.pathname, navigate]);

  return <>{props.children}</>;
});
MobileClientProvider.displayName = 'MobileClientProvider';
