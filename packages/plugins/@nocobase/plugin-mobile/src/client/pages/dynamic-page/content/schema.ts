/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { mobileAddBlockInitializer } from './initializer';

export function getMobilePageContentSchema(firstTabUid: string) {
  return {
    type: 'void',
    'x-component': 'MobilePageContent',
    properties: {
      [firstTabUid]: getPageContentTabSchema(firstTabUid),
    },
  };
}

export function getPageContentTabSchema(pageSchemaUid: string) {
  return {
    type: 'void',
    'x-uid': pageSchemaUid,
    'x-async': true,
    'x-component': 'Grid',
    'x-component-props': {
      showDivider: false,
    },
    'x-initializer': mobileAddBlockInitializer.name,
  };
}
