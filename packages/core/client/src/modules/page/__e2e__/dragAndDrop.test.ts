/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { expect, test, twoTabsPage } from '@nocobase/test/e2e';

test('tabs', async ({ page, mockPage }) => {
  await mockPage(twoTabsPage).goto();

  let tab1Box = await page.getByText('tab 1').boundingBox();
  let tab2Box = await page.getByText('tab 2').boundingBox();
  //拖拽标签调整排序 拖拽前 1-2
  expect(tab1Box.x).toBeLessThan(tab2Box.x);

  await page.getByText('tab 1').hover();
  await page.getByRole('button', { name: 'designer-drag-handler-Page-tab' }).dragTo(page.getByText('tab 2'));
  await expect(page.getByText('tab 1')).toBeVisible();

  tab1Box = await page.getByText('tab 1').boundingBox();
  tab2Box = await page.getByText('tab 2').boundingBox();

  //拖拽后 2-1
  expect(tab2Box.x).toBeLessThan(tab1Box.x);
});
