/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createContext, useContext } from 'react';
import { SchemaSettingsItemType } from '../types';

export const SchemaSettingItemContext = createContext<SchemaSettingsItemType>({} as any);
SchemaSettingItemContext.displayName = 'SchemaSettingItemContext';

export function useSchemaSettingsItem<T = {}>() {
  return useContext(SchemaSettingItemContext) as T;
}
