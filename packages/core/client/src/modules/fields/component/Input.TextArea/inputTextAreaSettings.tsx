/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaSettings } from '../../../../application/schema-settings/SchemaSettings';
import { ellipsisSettingsItem } from '../Input/inputComponentSettings';

export const inputTextAreaSettings = new SchemaSettings({
  name: 'fieldSettings:component:Input.TextArea',
  items: [ellipsisSettingsItem],
});
