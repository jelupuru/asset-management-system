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

export const getCronLocale = (lang: string) => {
  const lng = lang.replace('-', '_');
  const files = [resolve(__dirname, `./../locale/cron/${lng}`)];
  if (process.env.APP_ENV !== 'production') {
    files.push(`@nocobase/client/src/locale/cron/${lng}`, `@nocobase/client/lib/locale/cron/${lng}`);
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
