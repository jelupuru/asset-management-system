/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { test, expect } from '@nocobase/test/e2e';

test.describe('page:addBlock', () => {
  test('当搜索不到数据时显示空状态', async ({ page, mockPage }) => {
    await mockPage().goto();
    await page.getByLabel('schema-initializer-Grid-').hover();
    await page.getByRole('menuitem', { name: 'Table right' }).hover();
    await page.getByRole('textbox', { name: 'Search and select collection' }).fill('no match');

    await expect(page.getByRole('menuitem', { name: 'No data' })).toBeVisible();
  });
});
