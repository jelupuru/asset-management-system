/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import {
  Page,
  expect,
  expectSettingsMenu,
  oneTableBlockWithAddNewAndViewAndEditAndChoicesFields,
  test,
} from '@nocobase/test/e2e';
import { createColumnItem, showSettingsMenu, testDefaultValue, testPattern } from '../../utils';

test.describe('form item & create form', () => {
  test('supported options', async ({ page, mockPage }) => {
    const nocoPage = await mockPage(oneTableBlockWithAddNewAndViewAndEditAndChoicesFields).waitForInit();
    await nocoPage.goto();

    await expectSettingsMenu({
      page,
      showMenu: async () => {
        await page.getByRole('button', { name: 'Add new' }).click();
        await page.getByLabel(`block-item-CollectionField-general-form-general.chinaRegion-chinaRegion`).hover();
        await page
          .getByLabel(`designer-schema-settings-CollectionField-FormItem.Designer-general-general.chinaRegion`)
          .hover();
      },
      supportedOptions: [
        'Edit field title',
        'Display title',
        'Edit description',
        'Pattern',
        'Delete',
        'required',
        'Set default value',
      ],
    });
  });

  test('set default value', async ({ page, mockPage }) => {
    await testDefaultValue({
      page,
      gotoPage: () =>
        (async (mockPage) => {
          const nocoPage = await mockPage(oneTableBlockWithAddNewAndViewAndEditAndChoicesFields).waitForInit();
          await nocoPage.goto();
        })(mockPage),
      openDialog: () =>
        (async (page: Page) => {
          await page.getByRole('button', { name: 'Add new' }).click();
        })(page),
      closeDialog: () => page.getByLabel('drawer-Action.Container-general-Add record-mask').click(),
      showMenu: () =>
        (async (page: Page, fieldName: string) => {
          await page
            .getByLabel(`block-item-CollectionField-general-form-general.${fieldName}-${fieldName}`, { exact: true })
            .hover();
          await page
            .getByLabel(`designer-schema-settings-CollectionField-FormItem.Designer-general-general.${fieldName}`, {
              exact: true,
            })
            .hover();
        })(page, 'chinaRegion'),
      supportedVariables: ['Constant', 'Current user', 'Current role', 'API token', 'Date variables', 'Current form'],
      unsupportedVariables: ['Current popup record', 'Parent popup record'],
      inputConstantValue: async () => {
        await page.getByLabel('block-item-VariableInput-').click();
        await page.getByRole('menuitemcheckbox', { name: '北京市' }).click();
        await page.getByRole('menuitemcheckbox', { name: '市辖区' }).click();
        await page.getByRole('menuitemcheckbox', { name: '东城区' }).click();
      },
      expectConstantValue: async () => {
        await expect(
          page.getByLabel('block-item-CollectionField-general-form-general.chinaRegion-chinaRegion'),
        ).toHaveText('chinaRegion:北京市/市辖区/东城区');
      },
    });
  });

  test('pattern', async ({ page, mockPage }) => {
    await testPattern({
      page,
      gotoPage: () =>
        (async (mockPage) => {
          const nocoPage = await mockPage(oneTableBlockWithAddNewAndViewAndEditAndChoicesFields).waitForInit();
          await nocoPage.goto();
        })(mockPage),
      openDialog: () =>
        (async (page: Page) => {
          await page.getByRole('button', { name: 'Add new' }).click();
        })(page),
      showMenu: () =>
        (async (page: Page, fieldName: string) => {
          await page
            .getByLabel(`block-item-CollectionField-general-form-general.${fieldName}-${fieldName}`, { exact: true })
            .hover();
          await page
            .getByLabel(`designer-schema-settings-CollectionField-FormItem.Designer-general-general.${fieldName}`, {
              exact: true,
            })
            .hover();
        })(page, 'chinaRegion'),
      expectEditable: async () => {
        await page
          .getByLabel('block-item-CollectionField-general-form-general.chinaRegion-chinaRegion')
          .locator('.ant-select')
          .click();
        await page.getByRole('menuitemcheckbox', { name: '北京市' }).click();
        await page.getByRole('menuitemcheckbox', { name: '市辖区' }).click();
        await page.getByRole('menuitemcheckbox', { name: '东城区' }).click();
      },
      expectReadonly: async () => {
        await expect(
          page
            .getByLabel('block-item-CollectionField-general-form-general.chinaRegion-chinaRegion')
            .locator('.ant-select')
            .getByRole('combobox'),
        ).toBeDisabled();
      },
      expectEasyReading: async () => {
        await expect(
          page
            .getByLabel('block-item-CollectionField-general-form-general.chinaRegion-chinaRegion')
            .locator('.ant-select')
            .getByRole('combobox'),
        ).not.toBeVisible();
        await expect(
          page.getByLabel('block-item-CollectionField-general-form-general.chinaRegion-chinaRegion'),
        ).toHaveText('chinaRegion:北京市 / 市辖区 / 东城区');
      },
    });
  });
});

test.describe('form item & edit form', () => {
  test('supported options', async ({ page, mockPage, mockRecord }) => {
    const nocoPage = await mockPage(oneTableBlockWithAddNewAndViewAndEditAndChoicesFields).waitForInit();
    await mockRecord('general');
    await nocoPage.goto();

    await expectSettingsMenu({
      page,
      showMenu: async () => {
        await page.getByLabel('action-Action.Link-Edit record-update-general-table-0').click();
        await page
          .getByLabel(`block-item-CollectionField-general-form-general.chinaRegion-chinaRegion`, { exact: true })
          .hover();
        await page
          .getByLabel(`designer-schema-settings-CollectionField-FormItem.Designer-general-general.chinaRegion`, {
            exact: true,
          })
          .hover();
      },
      supportedOptions: ['Edit field title', 'Display title', 'Edit description', 'Required', 'Pattern', 'Delete'],
    });
  });

  test('pattern', async ({ page, mockPage, mockRecord }) => {
    let record = null;
    await testPattern({
      page,
      gotoPage: async () => {
        record = await (async (mockPage, mockRecord) => {
          const nocoPage = await mockPage(oneTableBlockWithAddNewAndViewAndEditAndChoicesFields).waitForInit();
          const record = await mockRecord('general');
          await nocoPage.goto();

          return record;
        })(mockPage, mockRecord);
      },
      openDialog: () =>
        (async (page: Page) => {
          await page.getByLabel('action-Action.Link-Edit record-update-general-table-0').click();
        })(page),
      showMenu: () =>
        (async (page: Page, fieldName: string) => {
          await page
            .getByLabel(`block-item-CollectionField-general-form-general.${fieldName}-${fieldName}`, { exact: true })
            .hover();
          await page
            .getByLabel(`designer-schema-settings-CollectionField-FormItem.Designer-general-general.${fieldName}`, {
              exact: true,
            })
            .hover();
        })(page, 'chinaRegion'),
      expectEditable: async () => {
        await page
          .getByLabel('block-item-CollectionField-general-form-general.chinaRegion-chinaRegion')
          .locator('.ant-select')
          .click();
        await page.getByRole('menuitemcheckbox', { name: '北京市' }).click();
        await page.getByRole('menuitemcheckbox', { name: '市辖区' }).click();
        await page.getByRole('menuitemcheckbox', { name: '东城区' }).click();
      },
      expectReadonly: async () => {
        await expect(
          page
            .getByLabel('block-item-CollectionField-general-form-general.chinaRegion-chinaRegion')
            .locator('.ant-select')
            .getByRole('combobox'),
        ).toBeDisabled();
      },
      expectEasyReading: async () => {
        await expect(
          page
            .getByLabel('block-item-CollectionField-general-form-general.chinaRegion-chinaRegion')
            .locator('.ant-select')
            .getByRole('combobox'),
        ).not.toBeVisible();
        await expect(
          page.getByLabel('block-item-CollectionField-general-form-general.chinaRegion-chinaRegion'),
        ).toHaveText('chinaRegion:北京市 / 市辖区 / 东城区');
      },
    });
  });
});

test.describe('form item & view form', () => {
  test('supported options', async ({ page, mockPage, mockRecord }) => {
    const nocoPage = await mockPage(oneTableBlockWithAddNewAndViewAndEditAndChoicesFields).waitForInit();
    await mockRecord('general');
    await nocoPage.goto();

    await expectSettingsMenu({
      page,
      showMenu: async () => {
        await page.getByLabel('action-Action.Link-View record-view-general-table-0').click();
        await page.getByLabel(`block-item-CollectionField-general-form-general.chinaRegion-chinaRegion`).hover();
        await page
          .getByLabel(`designer-schema-settings-CollectionField-FormItem.Designer-general-general.chinaRegion`)
          .hover();
      },
      supportedOptions: ['Edit field title', 'Display title', 'Delete', 'Edit tooltip'],
      unsupportedOptions: ['Set default value'],
    });
  });
});

test.describe('table column & table', () => {
  test('supported options', async ({ page, mockPage, mockRecord }) => {
    const nocoPage = await mockPage(oneTableBlockWithAddNewAndViewAndEditAndChoicesFields).waitForInit();
    await mockRecord('general');
    await nocoPage.goto();

    await expectSettingsMenu({
      page,
      showMenu: async () => {
        await createColumnItem(page, 'chinaRegion');
        await showSettingsMenu(page, 'chinaRegion');
      },
      supportedOptions: ['Custom column title', 'Column width', 'Delete'],
    });
  });
});
