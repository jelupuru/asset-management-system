/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { mobileNavigationBarActionsInitializer } from './navigation-bar';

export const mobilePageHeaderSchema = {
  type: 'void',
  'x-component': 'MobilePageHeader',
  properties: {
    pageNavigationBar: {
      type: 'void',
      'x-component': 'MobilePageNavigationBar',
      properties: {
        actionBar: {
          type: 'void',
          'x-component': 'MobileNavigationActionBar',
          'x-initializer': mobileNavigationBarActionsInitializer.name,
          'x-component-props': {
            spaceProps: {
              style: {
                flexWrap: 'nowrap',
              },
            },
          },
          properties: {},
        },
      },
    },
    pageTabs: {
      type: 'void',
      'x-component': 'MobilePageTabs',
    },
  },
};
