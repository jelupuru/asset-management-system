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

export class DatetimeFieldInterface extends CollectionFieldInterface {
  name = 'datetime';
  type = 'object';
  group = 'datetime';
  order = 1;
  title = '{{t("Datetime (with time zone)")}}';
  sortable = true;
  default = {
    type: 'date',
    defaultToCurrentTime: false,
    onUpdateToCurrentTime: false,
    timezone: true,
    uiSchema: {
      type: 'string',
      'x-component': 'DatePicker',
      'x-component-props': {
        showTime: false,
        utc: true,
      },
    },
  };
  availableTypes = ['date', 'string', 'datetime', 'datetimeTz'];
  hasDefaultValue = true;
  properties = {
    ...defaultProps,
    ...dateTimeProps,
    defaultToCurrentTime: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
      'x-content': '{{t("Default value to current time")}}',
    },
    onUpdateToCurrentTime: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
      'x-content': '{{t("Automatically update timestamp on update")}}',
    },
    'uiSchema.x-component-props.gmt': {
      type: 'boolean',
      title: '{{t("GMT")}}',
      'x-hidden': true,
      'x-component': 'Checkbox',
      'x-content': '{{t("Use the same time zone (GMT) for all users")}}',
      'x-decorator': 'FormItem',
      default: false,
    },
  };
  filterable = {
    operators: operators.datetime,
  };
  titleUsable = true;
}
