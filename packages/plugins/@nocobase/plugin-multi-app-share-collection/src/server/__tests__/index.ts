/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createMockServer } from '@nocobase/test';

export async function createApp(options = {}) {
  const app = await createMockServer({
    acl: false,
    ...options,
    plugins: [
      'field-sort',
      'users',
      'error-handler',
      'data-source-main',
      'multi-app-manager',
      'multi-app-share-collection',
    ],
  });

  return app;
}
