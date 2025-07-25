/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer } from '@formily/react';
import { useRecord } from '@nocobase/client';
import { Select, Tag } from 'antd';
import React from 'react';
import { omit } from 'lodash';

export const FieldType = observer(
  (props: any) => {
    const { value, handleFieldChange, onChange } = props;
    const record = useRecord();
    const item = omit(record, ['__parent', '__collectionName']);
    return !item?.possibleTypes ? (
      <Tag>{value}</Tag>
    ) : (
      <Select
        aria-label={`field-type-${value}`}
        //@ts-ignore
        role="button"
        defaultValue={value}
        popupMatchSelectWidth={false}
        style={{ width: '100%' }}
        options={
          item?.possibleTypes.map((v) => {
            return { label: v, value: v };
          }) || []
        }
        onChange={(value) => {
          onChange?.(value);
          handleFieldChange({ ...item, type: value }, record.name);
        }}
      />
    );
  },
  { displayName: 'FieldType' },
);
