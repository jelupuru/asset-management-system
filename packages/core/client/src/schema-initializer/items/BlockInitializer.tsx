/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { merge } from '@formily/shared';
import React from 'react';
import { SchemaInitializerItem, useSchemaInitializer, useSchemaInitializerItem } from '../../application';

// Block
export const BlockInitializer = (props) => {
  const { item, schema, ...others } = props;
  const { insert } = useSchemaInitializer();
  return (
    <SchemaInitializerItem
      {...others}
      onClick={() => {
        const s = merge(schema || {}, item.schema || {});
        item?.schemaInitialize?.(s);
        insert(s);
        props.onClick?.(s);
      }}
    />
  );
};

export const BlockItemInitializer = () => {
  const itemConfig = useSchemaInitializerItem();
  const { schema, ...others } = itemConfig;
  return <BlockInitializer {...others} item={itemConfig} />;
};
