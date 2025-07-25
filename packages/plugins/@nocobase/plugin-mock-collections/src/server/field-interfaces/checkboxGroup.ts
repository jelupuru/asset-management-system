/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { faker } from '@faker-js/faker';
import _ from 'lodash';

export const checkboxGroup = {
  options: (options) => ({
    interface: 'checkboxGroup',
    type: 'array',
    defaultValue: [],
    // name,
    uiSchema: {
      type: 'array',
      'x-component': 'Checkbox.Group',
      enum: options?.uiSchema?.enum || [
        { value: 'option1', label: 'Option1', color: 'red' },
        { value: 'option2', label: 'Option2', color: 'green' },
        { value: 'option3', label: 'Option3', color: 'blue' },
      ],
    },
  }),
  mock: (options) => faker.helpers.arrayElements(_.map(options?.uiSchema?.enum, _.property('value'))),
};
