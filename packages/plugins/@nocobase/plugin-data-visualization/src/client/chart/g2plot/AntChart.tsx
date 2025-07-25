/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { useSetChartSize } from '../../hooks/chart';
import { useGlobalTheme } from '@nocobase/client';

export const getAntChart = (Component: React.FC<any>) => (props: any) => {
  const { isDarkTheme } = useGlobalTheme();
  const { size = {} } = props;
  let { height: fixedHeight } = props;
  if (!fixedHeight && size.type === 'fixed') {
    fixedHeight = size.fixed;
  }
  const { chartRef, chartHeight } = useSetChartSize(size, fixedHeight);

  return (
    <div ref={chartRef} style={chartHeight ? { height: `${chartHeight}px` } : {}}>
      <Component
        theme={isDarkTheme ? 'classicDark' : 'classic'}
        {...props}
        {...(chartHeight ? { height: chartHeight } : {})}
      />
    </div>
  );
};
