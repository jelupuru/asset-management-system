/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { test } from '@nocobase/test/e2e';

test('switch role', async ({ page, mockPage }) => {
  await mockPage().goto();

  await page.getByTestId('user-center-button').hover();
  await page.getByRole('menuitem', { name: 'Switch role' }).click();
  await page.getByRole('option', { name: 'Member' }).click();
});
