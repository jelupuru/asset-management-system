/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { faker } from '@faker-js/faker';

export const richText = {
  options: () => ({
    interface: 'richText',
    type: 'text',
    // name,
    uiSchema: {
      type: 'string',
      'x-component': 'RichText',
    },
  }),
  mock: () => faker.lorem.paragraphs(),
};
