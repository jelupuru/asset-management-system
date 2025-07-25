/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema } from '@formily/react';
import { isArr } from '@formily/shared';
import { dayjs, getDefaultFormat, str2moment } from '@nocobase/utils/client';
import { Tag } from 'antd';
import React from 'react';
import { CollectionFieldOptions_deprecated, useCollectionManager_deprecated } from '../../../collection-manager';

export const useLabelUiSchema = (collectionField: CollectionFieldOptions_deprecated, label: string): ISchema => {
  const { getCollectionJoinField } = useCollectionManager_deprecated();
  if (!collectionField) {
    return;
  }
  const labelField = getCollectionJoinField(`${collectionField.target}.${label}`) as CollectionFieldOptions_deprecated;
  return labelField?.uiSchema;
};

export const getDatePickerLabels = (props): string => {
  const format = getDefaultFormat(props) as string;
  const m = str2moment(props.value, props) as dayjs.Dayjs;
  const labels = m && m.isValid() ? m.format(format) : props.value;
  return isArr(labels) ? labels.join('~') : labels;
};

export const getLabelFormatValue = (labelUiSchema: ISchema, value: any, isTag = false): any => {
  if (Array.isArray(labelUiSchema?.enum) && value) {
    const opt: any = labelUiSchema.enum.find((option: any) => option.value === value);
    if (isTag) {
      return React.createElement(Tag, { color: opt?.color }, opt?.label);
    }
    return opt?.label;
  }
  switch (labelUiSchema?.['x-component']) {
    case 'DatePicker':
      return getDatePickerLabels({ ...labelUiSchema?.['x-component-props'], value });
    default:
      return value;
  }
};
