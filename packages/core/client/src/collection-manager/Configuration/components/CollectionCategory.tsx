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

export const CollectionCategory = observer(
  (props: any) => {
    const { value } = props;
    const compile = useCompile();
    return (
      <>
        {value?.map((item) => {
          return (
            <Tag key={item.name} color={item.color}>
              {compile(item?.name)}
            </Tag>
          );
        })}
      </>
    );
  },
  { displayName: 'CollectionCategory' },
);
