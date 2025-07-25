/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { expectSettingsMenu, test } from '@nocobase/test/e2e';
import { oneFormWithPickerField } from './templatesOfBug';

test.describe('SchemaSettings of Picker', () => {
  test('supports options', async ({ page, mockPage }) => {
    await mockPage(oneFormWithPickerField).goto();

    await expectSettingsMenu({
      page,
      showMenu: async () => {
        await page.getByLabel('block-item-CollectionField-').hover();
        await page.getByLabel('designer-schema-settings-CollectionField-fieldSettings:FormItem-users-users.').click();
      },
      supportedOptions: ['Popup size', 'Allow add new data', 'Title field', 'Allow multiple', 'Field component'],
    });
  });
});
