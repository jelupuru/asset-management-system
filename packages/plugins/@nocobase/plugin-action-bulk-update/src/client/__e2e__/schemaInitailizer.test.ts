/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { expect, oneEmptyTableBlockWithCustomizeActions, test } from '@nocobase/test/e2e';
import { oneEmptyGantt } from './utils';

test.describe('TableActionInitializers & GanttActionInitializers & MapActionInitializers ', () => {
  test('TableActionInitializers should add bulk update', async ({ page, mockPage }) => {
    await mockPage(oneEmptyTableBlockWithCustomizeActions).goto();
    await page.getByLabel('schema-initializer-ActionBar-table:configureActions-general').hover();
    await page.getByRole('menuitem', { name: 'Bulk update' }).click();
    await expect(page.getByLabel('action-Action-Bulk update-customize:bulkUpdate-general-table')).toBeVisible();
  });
  test('GanttActionInitializers should add bulk update', async ({ page, mockPage, mockRecords }) => {
    const nocoPage = await mockPage(oneEmptyGantt).waitForInit();
    await mockRecords('general', 3);
    await nocoPage.goto();
    await page.getByLabel('schema-initializer-ActionBar-gantt:configureActions-general').hover();
    await page.getByRole('menuitem', { name: 'Bulk update' }).click();
    await page.mouse.move(300, 0);
    await expect(page.getByRole('button', { name: 'Bulk update' })).toBeVisible();
  });
});
