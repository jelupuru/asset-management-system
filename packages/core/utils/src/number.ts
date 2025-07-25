/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { getNumberPrecision, toFixed } from '@rc-component/mini-decimal';

export function toFixedByStep(value: any, step: string | number) {
  if (typeof value === 'undefined' || value === null || value === '') {
    return '';
  }
  const precision = getNumberPrecision(step);
  // return parseFloat(String(value)).toFixed(precision);
  return toFixed(String(value), '.', precision);
}
