/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { registerValidateFormats } from '@formily/core';
export * from './ConfigurationTable';
export * from './schemas/collections';
export * from './ConfigurationTabs';
export * from './AddCategoryAction';
export * from './EditCategoryAction';

registerValidateFormats({
  uid: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
});
