/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import JSON5 from 'json5';
import { uid } from '@formily/shared';

const validateArray = (value) => {
  try {
    value = JSON5.parse(value);
  } catch (e) {
    return 'Please input validate dataset';
  }
  if (Array.isArray(value)) {
    if (
      value.every((item) => {
        return typeof item === 'object' && Object.keys(item).length > 1;
      })
    )
      return true;
  }
  return 'Please input validate dataset';
};

const parseDataSetString = (str) => {
  const dataSetDataArray = JSON5.parse(str);
  if (Array.isArray(dataSetDataArray)) {
    if (
      dataSetDataArray.every((item) => {
        return typeof item === 'object' && Object.keys(item).length > 1;
      })
    )
      dataSetDataArray.map((item) => {
        if (!item?.id) {
          item.id = uid();
        }
        return item;
      });
  }
  return dataSetDataArray;
};

export { validateArray, parseDataSetString };
