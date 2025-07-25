/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CollectionFieldInterface } from '../../data-source/collection-field-interface/CollectionFieldInterface';
import { defaultProps, operators } from './properties';

export class TimeFieldInterface extends CollectionFieldInterface {
  name = 'time';
  type = 'object';
  group = 'datetime';
  order = 4;
  title = '{{t("Time")}}';
  sortable = true;
  default = {
    type: 'time',
    uiSchema: {
      type: 'string',
      'x-component': 'TimePicker',
    },
  };
  availableTypes = ['time'];
  hasDefaultValue = true;
  properties = {
    ...defaultProps,
    'uiSchema.x-component-props.format': {
      type: 'string',
      title: '{{t("Time format")}}',
      'x-component': 'Radio.Group',
      'x-decorator': 'FormItem',
      default: 'HH:mm:ss',
      enum: [
        {
          label: '{{t("12 hour")}}',
          value: 'hh:mm:ss a',
        },
        {
          label: '{{t("24 hour")}}',
          value: 'HH:mm:ss',
        },
      ],
    },
  };
  filterable = {
    operators: operators.time,
  };
  titleUsable = true;
}
