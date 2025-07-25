/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Statistic as AntdStatistic } from 'antd';

export const Statistic: React.FC<any> = (props: any) => {
  const { link, ...options } = props;
  return (
    <div
      onClick={() => {
        if (link) {
          window.open(link, '__blank');
        }
      }}
      style={{
        cursor: link ? 'pointer' : 'auto',
      }}
    >
      <AntdStatistic {...options} />
    </div>
  );
};
