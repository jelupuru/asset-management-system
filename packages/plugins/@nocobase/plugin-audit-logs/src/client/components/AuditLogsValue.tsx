/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { EllipsisWithTooltip, FormProvider, SchemaComponent, useRecord } from '@nocobase/client';
import React from 'react';
import { observer, useField } from '@formily/react';

export const AuditLogsValue = observer(
  () => {
    const field = useField<any>();
    const record = useRecord();
    if (record.field?.uiSchema) {
      return (
        <FormProvider>
          <SchemaComponent
            schema={{
              name: record.field.name,
              ...record.field?.uiSchema,
              default: field.value,
              'x-read-pretty': true,
            }}
          />
        </FormProvider>
      );
    }
    return <EllipsisWithTooltip ellipsis>{field.value ? JSON.stringify(field.value) : null}</EllipsisWithTooltip>;
  },
  { displayName: 'AuditLogsValue' },
);
