/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { expect, test } from '@nocobase/test/e2e';
import { backgroundColorFieldBasic } from './templates';

test.describe('Background color field', () => {
  test('basic', async ({ mockPage, mockRecords, page }) => {
    const nocoPage = await mockPage(backgroundColorFieldBasic).waitForInit();
    await mockRecords('calendar', 3);
    await nocoPage.goto();

    // 1. The default option is Not selected
    await page.getByLabel('block-item-CardItem-calendar-').hover();
    await page.getByLabel('designer-schema-settings-CardItem-blockSettings:calendar-calendar').hover();
    await page.getByRole('menuitem', { name: 'Background color field Not selected' }).click();

    // 2. Switch to the single select option
    await page.getByRole('option', { name: 'Single select' }).click();
    await expect(page.getByRole('menuitem', { name: 'Background color field Single select' })).toBeVisible();
    await page.mouse.move(-300, 0);

    // 3. Switch to the radio group option
    await page.getByLabel('block-item-CardItem-calendar-').hover();
    await page.getByLabel('designer-schema-settings-CardItem-blockSettings:calendar-calendar').hover();
    await page.getByRole('menuitem', { name: 'Background color field Single select' }).click();
    await page.getByRole('option', { name: 'Radio group' }).click();
    await expect(page.getByRole('menuitem', { name: 'Background color field Radio group' })).toBeVisible();
  });
});
