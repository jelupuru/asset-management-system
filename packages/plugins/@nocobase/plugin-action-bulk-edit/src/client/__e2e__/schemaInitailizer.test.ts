/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { expect, oneEmptyTableBlockWithActions, test } from '@nocobase/test/e2e';
import { oneEmptyGantt } from './utils';

test.describe('TableActionInitializers & GanttActionInitializers & MapActionInitializers should add bulk edit action', () => {
  test('bulk edit in TableActionInitializers', async ({ page, mockPage }) => {
    await mockPage(oneEmptyTableBlockWithActions).goto();
    await page.getByLabel('schema-initializer-ActionBar-table:configureActions-general').hover();
    await page.getByRole('menuitem', { name: 'Bulk edit' }).click();
    await page.mouse.move(300, 0);
    await expect(page.getByLabel('Bulk edit')).toBeVisible();
  });
  test('bulk edit in GanttActionInitializers', async ({ page, mockPage, mockRecords }) => {
    const nocoPage = await mockPage(oneEmptyGantt).waitForInit();
    await mockRecords('general', 3);
    await nocoPage.goto();
    await page.getByLabel('schema-initializer-ActionBar-gantt:configureActions-general').hover();
    await page.getByRole('menuitem', { name: 'Bulk edit' }).click();
    await expect(page.getByLabel('Bulk edit')).toBeVisible();
  });
});
