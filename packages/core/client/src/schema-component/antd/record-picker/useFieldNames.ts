/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useFieldSchema } from '@formily/react';

export const useFieldNames = (props) => {
  const fieldSchema = useFieldSchema();
  const fieldNames =
    fieldSchema['x-component-props']?.['field']?.['uiSchema']?.['x-component-props']?.['fieldNames'] ||
    fieldSchema?.['x-component-props']?.['fieldNames'] ||
    props.fieldNames;
  return { label: 'label', value: 'value', ...fieldNames };
};
