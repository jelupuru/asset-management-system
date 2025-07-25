/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema } from '@formily/react';
import { defaultProps, operators, unique } from './properties';
import { CollectionFieldInterface } from '../../data-source/collection-field-interface/CollectionFieldInterface';

export class EmailFieldInterface extends CollectionFieldInterface {
  name = 'email';
  type = 'object';
  group = 'basic';
  order = 4;
  title = '{{t("Email")}}';
  sortable = true;
  default = {
    type: 'string',
    uiSchema: {
      type: 'string',
      'x-component': 'Input',
      'x-validator': 'email',
    },
  };
  availableTypes = ['string'];
  hasDefaultValue = true;
  properties = {
    ...defaultProps,
    unique,
  };
  filterable = {
    operators: operators.string,
  };
  titleUsable = true;
  schemaInitialize(schema: ISchema, { block }) {
    if (['Table', 'Kanban'].includes(block)) {
      schema['x-component-props'] = schema['x-component-props'] || {};
      schema['x-component-props']['ellipsis'] = true;
    }
  }
}
