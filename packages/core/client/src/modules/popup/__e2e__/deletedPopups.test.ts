/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { expect, test } from '@nocobase/test/e2e';

test.describe('deleted popups', () => {
  test('should display error info when deleted popups', async ({ page, mockPage }) => {
    const nocoPage = await mockPage().waitForInit();
    const url = await nocoPage.getUrl();

    await page.goto(
      url +
        '/popups/vygn5ile3xz/filterbytk/1/popups/n24hos465bj/filterbytk/admin/sourceid/1/popups/s32h1ed5g9i/filterbytk/admin/sourceid/1',
    );

    await expect(page.getByText('Sorry, the page you visited does not exist.')).toHaveCount(3);

    // close the popups
    await page.getByLabel('drawer-Action.Container-Error message-mask').nth(2).click();
    await page.getByLabel('drawer-Action.Container-Error message-mask').nth(1).click();
    await page.getByLabel('drawer-Action.Container-Error message-mask').nth(0).click();

    await expect(page.getByText('Sorry, the page you visited does not exist.')).toHaveCount(0);
  });
});
