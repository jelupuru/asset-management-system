/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { requireModule } from '@nocobase/utils';
import { resolve } from 'path';

export const getAntdLocale = (lang) => {
  const lng = lang.replace('-', '_');
  const files = [resolve(__dirname, `../locale/antd/${lng}`)];
  if (process.env.APP_ENV !== 'production') {
    files.unshift(`antd/lib/locale/${lng}`);
    files.push(`antd/lib/locale/en_US`);
  }
  for (const file of files) {
    try {
      require.resolve(file);
      return requireModule(file);
    } catch (error) {
      continue;
    }
  }
  return {};
};
