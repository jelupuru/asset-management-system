/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SafeArea } from 'antd-mobile';
import React, { FC } from 'react';

import { useMobilePage } from '../context';
import { mobilePageHeaderStyle } from './styles';

export const MobilePageHeader: FC = ({ children }) => {
  const { displayPageHeader = true } = useMobilePage() || {};

  if (!displayPageHeader) {
    return null;
  }

  return (
    <div className="mobile-page-header" data-testid="mobile-page-header" style={mobilePageHeaderStyle}>
      <SafeArea position="top" />
      {children}
    </div>
  );
};
