/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Button } from 'antd';
import { BranchesOutlined } from '@ant-design/icons';

export const ConnectAssociationAction = (props) => {
  const { targetGraph, item } = props;
  return (
    <BranchesOutlined
      className="btn-assocition"
      onClick={() => {
        targetGraph.onConnectionAssociation(item);
      }}
    />
  );
};
