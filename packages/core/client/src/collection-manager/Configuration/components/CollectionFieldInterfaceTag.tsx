/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer } from '@formily/react';
import { Tag } from 'antd';
import React from 'react';
import { useCompile } from '../../../schema-component';
import { useCollectionManager_deprecated } from '../../hooks';

export const CollectionFieldInterfaceTag = observer(
  (props: any) => {
    const { value } = props;
    const { getInterface } = useCollectionManager_deprecated();
    const compile = useCompile();
    const schema = getInterface(value);

    if (!schema) return null;

    return <Tag>{compile(schema.title)}</Tag>;
  },
  { displayName: 'CollectionFieldInterfaceTag' },
);
