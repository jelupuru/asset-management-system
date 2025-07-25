/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { faker } from '@faker-js/faker';

export const percent = {
  options: () => ({
    type: 'float',
    // name,
    uiSchema: {
      type: 'string',
      // title,
      'x-component': 'Percent',
      'x-component-props': {
        stringMode: true,
        step: '1',
        addonAfter: '%',
      },
    },
  }),
  mock: () => faker.number.float({ max: 1000 }),
};
