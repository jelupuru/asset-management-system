/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useFieldSchema } from '@formily/react';
import {
  NocoBaseRecursionField,
  useCollection,
  useCollectionRecordData,
  VariablePopupRecordProvider,
} from '@nocobase/client';
import React, { FC, useMemo } from 'react';

export const MapBlockDrawer: FC = (props) => {
  const recordData = useCollectionRecordData();
  const collection = useCollection();
  const fieldSchema = useFieldSchema();
  const schema = useMemo(
    () =>
      fieldSchema.reduceProperties((buf, current) => {
        if (current.name === 'drawer') {
          return current;
        }
        return buf;
      }, null),
    [fieldSchema],
  );

  if (!schema) {
    return null;
  }

  return (
    <VariablePopupRecordProvider recordData={recordData} collection={collection}>
      <NocoBaseRecursionField schema={schema} name={schema.name} />
    </VariablePopupRecordProvider>
  );
};
