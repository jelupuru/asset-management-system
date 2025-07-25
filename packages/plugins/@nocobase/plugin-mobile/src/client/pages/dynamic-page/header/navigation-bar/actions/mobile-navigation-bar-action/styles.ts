/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { genStyleHook } from '@nocobase/client';

export const useStyles = genStyleHook('nb-mobile-navigation-bar-action', (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '.nb-navigation-bar-action': {
        maxWidth: '10em',
        '.adm-space': {
          maxWidth: '100%',
          overflow: 'hidden',
        },
      },
      '.nb-navigation-bar-action-icon': {
        width: 24,
        height: 24,
        lineHeight: '24px',
        fontSize: 24,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '.schema-toolbar': {
          inset: '-15px -8px',
        },
      },
      '.nb-navigation-bar-action-title': {
        fontSize: 17,
        padding: 0,
        '.schema-toolbar': {
          inset: '-15px -8px',
        },
      },
      '.nb-navigation-bar-action-icon-and-title': {
        height: '32px !important',
        fontSize: '17px !important',
        padding: '0 6px !important',
        '.schema-toolbar': {
          inset: '-15px',
        },
      },
    },
  };
});
