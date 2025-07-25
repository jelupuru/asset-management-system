/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { genStyleHook } from '@nocobase/client';

export default genStyleHook('nb-field-markdown-vditor', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '.vditor-reset': { fontSize: `${token.fontSize}px !important` },
      '.vditor': { borderRadius: 8 },
      '.vditor .vditor-content': { borderRadius: '0 0 8px 8px', overflow: 'hidden' },
      '.vditor .vditor-toolbar': { paddingLeft: ' 16px !important', borderRadius: '8px 8px 0 0' },
      '.vditor .vditor-content .vditor-ir .vditor-reset': { paddingLeft: ' 16px !important' },
    },
  };
});
