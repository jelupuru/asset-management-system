/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer, useForm } from '@formily/react';
import { Select } from 'antd';
import React from 'react';

import { parseCollectionName, useCollectionManager_deprecated, useCompile } from '@nocobase/client';

function defaultFilter() {
  return true;
}

export const FieldsSelect = observer(
  (props: any) => {
    const { filter = defaultFilter, ...others } = props;
    const compile = useCompile();
    const { getCollectionFields } = useCollectionManager_deprecated();
    const { values } = useForm();
    const [dataSourceName, collectionName] = parseCollectionName(values?.collection);
    const fields = getCollectionFields(collectionName, dataSourceName);

    return (
      <Select
        popupMatchSelectWidth={false}
        {...others}
        options={fields.filter(filter).map((field) => ({
          label: compile(field.uiSchema?.title),
          value: field.name,
        }))}
      />
    );
  },
  { displayName: 'FieldsSelect' },
);
