/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useApp } from '@nocobase/client';
import { Alert } from 'antd';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SetFilterTargetKey } from './SetFilterTargetKey';

export const FilterTargetKeyAlert = ({ collectionName }) => {
  const app = useApp();
  const { name: dataSourceKey = 'main' } = useParams();
  const collection = useMemo(() => {
    const cm = app.getCollectionManager(dataSourceKey);
    return cm.getCollection(collectionName);
  }, [app, dataSourceKey, collectionName]);
  return (
    !collection?.filterTargetKey && (
      <Alert style={{ marginBottom: 16 }} type="warning" message={<SetFilterTargetKey />} />
    )
  );
};
