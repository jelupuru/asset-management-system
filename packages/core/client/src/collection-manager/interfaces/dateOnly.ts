/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CollectionFieldInterface } from '../../data-source/collection-field-interface/CollectionFieldInterface';
import { dateTimeProps, defaultProps, operators } from './properties';

export class DateFieldInterface extends CollectionFieldInterface {
  name = 'date';
  type = 'object';
  group = 'datetime';
  order = 3;
  title = '{{t("DateOnly")}}';
  sortable = true;
  default = {
    type: 'dateOnly',
    uiSchema: {
      type: 'string',
      'x-component': 'DatePicker',
      'x-component-props': {
        dateOnly: true,
      },
    },
  };
  availableTypes = ['dateOnly'];
  hasDefaultValue = true;
  properties = {
    ...defaultProps,
    ...dateTimeProps,
    'uiSchema.x-component-props.showTime': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
      'x-visible': false,
    },
  };
  filterable = {
    operators: operators.datetime,
  };
  titleUsable = true;
}
