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

export class PolygonFieldInterface extends CommonSchema {
  name = 'polygon';
  type = 'object';
  group = 'map';
  order = 4;
  title = generateNTemplate('Polygon');
  description = generateNTemplate('Polygon');
  availableTypes = ['polygon', 'json'];
  sortable = true;
  default = {
    type: 'polygon',
    uiSchema: {
      type: 'void',
      'x-component': 'Map',
      'x-component-designer': 'Map.Designer',
      'x-component-props': {},
    },
  };
}
