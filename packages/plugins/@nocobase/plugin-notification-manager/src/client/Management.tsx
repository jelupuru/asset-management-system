/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useMemo } from 'react';
import { Card, Table, Space } from 'antd';
import { useAPIClient, useRequest } from '@nocobase/client';
import { COLLECTION_NAME } from '../constant';

export function ManagementList() {
  const apiClient = useAPIClient();
  const resource = useMemo(() => {
    return apiClient.resource(COLLECTION_NAME.channels);
  }, [apiClient]);
  const { data, loading } = useRequest(resource.list);
  console.log('data', data);
  return (
    <div>
      <Card bordered={false}>
        <Space style={{ float: 'right', marginBottom: 16 }}></Space>
        <Table></Table>
      </Card>
    </div>
  );
}
