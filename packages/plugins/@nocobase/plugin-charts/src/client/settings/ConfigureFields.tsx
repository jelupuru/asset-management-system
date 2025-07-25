/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useRecord } from '@nocobase/client';
import { Table } from 'antd';
import React from 'react';

export const ConfigureFields = () => {
  const record = useRecord();
  return (
    <Table
      columns={[
        {
          title: '字段标识',
          dataIndex: 'name',
        },
      ]}
      dataSource={record.fields || []}
    />
  );
};
