/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'themeConfig',
  dumpRules: 'required',
  fields: [
    // 主题配置内容，一个 JSON 字符串
    {
      type: 'json',
      name: 'config',
    },
    // 主题是否可选
    {
      type: 'boolean',
      name: 'optional',
    },
    {
      type: 'boolean',
      name: 'isBuiltIn',
    },
    {
      type: 'uid',
      name: 'uid',
    },
    {
      type: 'radio',
      name: 'default',
      defaultValue: false,
    },
  ],
});
