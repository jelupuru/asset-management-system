/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { toFixedByStep } from '@nocobase/utils';
import { NumberInterface } from './number-interface';
import { percent2float } from '../utils';

export class PercentInterface extends NumberInterface {
  parseValue(value) {
    if (typeof value === 'string' && value.endsWith('%')) {
      const parsedValue = percent2float(value);
      return parsedValue;
    }

    return value;
  }

  toString(value) {
    const step = this.options?.uiSchema?.['x-component-props']?.['step'] ?? 0;
    return value && `${toFixedByStep(value * 100, step)}%`;
  }
}
