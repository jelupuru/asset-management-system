/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const PageSchema = {
  type: 'void',
  'x-component': 'MPage',
  'x-designer': 'MPage.Designer',
  'x-component-props': {},
  properties: {
    grid: {
      type: 'void',
      'x-component': 'Grid',
      'x-initializer': 'mobilePage:addBlock',
      'x-component-props': {
        showDivider: false,
      },
    },
  },
};
