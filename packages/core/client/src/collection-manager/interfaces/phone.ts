/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { defaultProps, operators, unique } from './properties';
import { CollectionFieldInterface } from '../../data-source/collection-field-interface/CollectionFieldInterface';

export class PhoneFieldInterface extends CollectionFieldInterface {
  name = 'phone';
  type = 'object';
  group = 'basic';
  order = 3;
  title = '{{t("Phone")}}';
  sortable = true;
  default = {
    type: 'string',
    uiSchema: {
      type: 'string',
      'x-component': 'Input',
      'x-component-props': {
        type: 'tel',
      },
      // 'x-validator': 'phone',
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
}
