/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useApp, useLocationSearch } from '@nocobase/client';
import React, { useEffect } from 'react';

export const AuthProvider: React.FC = (props) => {
  const searchString = useLocationSearch();
  const app = useApp();

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const authenticator = params.get('authenticator');
    const token = params.get('token');
    if (token) {
      app.apiClient.auth.setToken(token);
      app.apiClient.auth.setAuthenticator(authenticator);
    }
  });
  return <>{props.children}</>;
};
