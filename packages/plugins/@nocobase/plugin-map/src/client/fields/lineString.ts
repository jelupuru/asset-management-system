/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { generateNTemplate } from '../locale';
import { CommonSchema } from './schema';

export class LineStringFieldInterface extends CommonSchema {
  name = 'lineString';
  type = 'object';
  group = 'map';
  order = 2;
  title = generateNTemplate('Line');
  description = generateNTemplate('Line');
  availableTypes = ['lineString', 'json'];
  sortable = true;
  default = {
    type: 'lineString',
    uiSchema: {
      type: 'void',
      'x-component': 'Map',
      'x-component-designer': 'Map.Designer',
      'x-component-props': {},
    },
  };
}
