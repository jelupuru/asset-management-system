/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { expect, test } from '@nocobase/test/e2e';
import { uid } from '@nocobase/utils';

// //预设字段
test.describe('create collection with preset fields', () => {
  test('all preset fields by default', async ({ page }) => {
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await page.getByRole('button', { name: 'plus Create collection down' }).click();
    await page.getByRole('menuitem', { name: 'General collection' }).locator('span').click();
    await page.getByLabel('block-item-Input-collections-Collection display name').getByRole('textbox').fill(uid());
    //断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('api/collections:create')),
      page.getByLabel('action-Action-Submit').click(),
    ]);
    const postData = request.postDataJSON();
    //默认提交的数据符合预期
    expect(postData).toMatchObject({
      autoGenId: false,
      createdAt: true,
      createdBy: true,
      updatedAt: true,
      updatedBy: true,
      fields: expect.arrayContaining([
        expect.objectContaining({
          name: 'id',
          type: 'bigInt',
          // 其他属性
        }),
        expect.objectContaining({
          name: 'createdAt',
          type: 'date',
          // 其他属性
        }),
        expect.objectContaining({
          name: 'createdBy',
          type: 'belongsTo',
          // 其他属性
        }),
        expect.objectContaining({
          name: 'updatedBy',
          type: 'belongsTo',
          // 其他属性
        }),
        expect.objectContaining({
          name: 'updatedAt',
          type: 'date',
          // 其他属性
        }),
      ]),
    });
  });

  test('id preset field', async ({ page }) => {
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await page.getByRole('button', { name: 'plus Create collection down' }).click();
    await page.getByRole('menuitem', { name: 'General collection' }).locator('span').click();
    await page.getByLabel('block-item-Input-collections-Collection display name').getByRole('textbox').fill(uid());
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().hover();
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().click();
    await page.getByRole('row', { name: 'ID Integer Primary key' }).locator('.ant-checkbox-input').check();
    //断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('api/collections:create')),
      page.getByLabel('action-Action-Submit').click(),
    ]);
    const postData = request.postDataJSON();
    //提交的数据符合预期
    expect(postData).toMatchObject({
      autoGenId: false,
      createdAt: false,
      createdBy: false,
      updatedAt: false,
      updatedBy: false,
      fields: expect.arrayContaining([
        expect.objectContaining({
          name: 'id',
          type: 'bigInt',
          // 其他属性
        }),
      ]),
    });
  });
  test('createdAt preset field', async ({ page }) => {
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await page.getByRole('button', { name: 'plus Create collection down' }).click();
    await page.getByRole('menuitem', { name: 'General collection' }).locator('span').click();
    await page.getByLabel('block-item-Input-collections-Collection display name').getByRole('textbox').fill(uid());
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().hover();
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().click();
    await page.getByRole('row', { name: 'Created at' }).locator('.ant-checkbox-input').check();
    //断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('api/collections:create')),
      page.getByLabel('action-Action-Submit').click(),
    ]);
    const postData = request.postDataJSON();
    //提交的数据符合预期
    expect(postData).toMatchObject({
      autoGenId: false,
      createdAt: true,
      createdBy: false,
      updatedAt: false,
      updatedBy: false,
      fields: expect.arrayContaining([
        expect.objectContaining({
          name: 'createdAt',
          type: 'date',
          // 其他属性
        }),
      ]),
    });
  });
  test('createdBy preset field', async ({ page }) => {
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await page.getByRole('button', { name: 'plus Create collection down' }).click();
    await page.getByRole('menuitem', { name: 'General collection' }).locator('span').click();
    await page.getByLabel('block-item-Input-collections-Collection display name').getByRole('textbox').fill(uid());
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().hover();
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().click();
    await page.getByRole('row', { name: 'created By' }).locator('.ant-checkbox-input').check();
    //断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('api/collections:create')),
      page.getByLabel('action-Action-Submit').click(),
    ]);
    const postData = request.postDataJSON();
    //提交的数据符合预期
    expect(postData).toMatchObject({
      autoGenId: false,
      createdAt: false,
      createdBy: true,
      updatedAt: false,
      updatedBy: false,
      fields: expect.arrayContaining([
        expect.objectContaining({
          name: 'createdBy',
          type: 'belongsTo',
          // 其他属性
        }),
      ]),
    });
  });
  test('updatedBy preset field', async ({ page }) => {
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await page.getByRole('button', { name: 'plus Create collection down' }).click();
    await page.getByRole('menuitem', { name: 'General collection' }).locator('span').click();
    await page.getByLabel('block-item-Input-collections-Collection display name').getByRole('textbox').fill(uid());
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().hover();
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().click();
    await page.getByRole('row', { name: 'Last updated by' }).locator('.ant-checkbox-input').check();
    //添加关系字段,断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('api/collections:create')),
      page.getByLabel('action-Action-Submit').click(),
    ]);
    const postData = request.postDataJSON();
    //提交的数据符合预期
    expect(postData).toMatchObject({
      autoGenId: false,
      createdAt: false,
      createdBy: false,
      updatedAt: false,
      updatedBy: true,
      fields: expect.arrayContaining([
        expect.objectContaining({
          name: 'updatedBy',
          type: 'belongsTo',
          // 其他属性
        }),
      ]),
    });
  });
  test('updatedAt preset field', async ({ page }) => {
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await page.getByRole('button', { name: 'plus Create collection down' }).click();
    await page.getByRole('menuitem', { name: 'General collection' }).locator('span').click();
    await page.getByLabel('block-item-Input-collections-Collection display name').getByRole('textbox').fill(uid());
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().hover();
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().click();
    await page.getByRole('row', { name: 'Last updated at' }).locator('.ant-checkbox-input').check();
    //添加关系字段,断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('api/collections:create')),
      page.getByLabel('action-Action-Submit').click(),
    ]);
    const postData = request.postDataJSON();
    //提交的数据符合预期
    expect(postData).toMatchObject({
      autoGenId: false,
      createdAt: false,
      createdBy: false,
      updatedAt: true,
      updatedBy: false,
      fields: expect.arrayContaining([
        expect.objectContaining({
          name: 'updatedAt',
          type: 'date',
          // 其他属性
        }),
      ]),
    });
  });
  test('unselect preset fields', async ({ page }) => {
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await page.getByRole('button', { name: 'plus Create collection down' }).click();
    await page.getByRole('menuitem', { name: 'General collection' }).locator('span').click();
    await page.getByLabel('block-item-Input-collections-Collection display name').getByRole('textbox').fill(uid());
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().hover();
    await page.locator('.ant-drawer-content-wrapper .ant-table-container .ant-table-selection-column').first().click();
    //断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('api/collections:create')),
      page.getByLabel('action-Action-Submit').click(),
    ]);
    const postData = request.postDataJSON();
    //提交的数据符合预期
    expect(postData).toMatchObject({
      autoGenId: false,
      createdAt: false,
      createdBy: false,
      updatedAt: false,
      updatedBy: false,
      fields: [],
    });
  });
});
