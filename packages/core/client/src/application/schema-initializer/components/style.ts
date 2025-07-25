/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { genStyleHook } from '../../../schema-component/antd/__builtins__';

export const useSchemaInitializerStyles = genStyleHook('nb-schema-initializer', (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '.ant-menu': {
        background: 'transparent',
        borderInlineEnd: 'none !important',
      },
      ':not(.ant-menu)': {
        [`${componentCls}-group-title`]: {
          color: token.colorTextDescription,
          // height: token.controlHeight,
          lineHeight: `${token.controlHeight}px`,
          paddingLeft: token.padding,
          paddingRight: token.paddingSM,
          // paddingTop: token.paddingXXS,
          // paddingBottom: token.paddingXXS,
        },
        [`${componentCls}-menu-item`]: {
          marginInline: token.marginXXS,
          // margin: token.marginXXS,
          paddingLeft: token.padding,
          paddingRight: token.paddingSM,
          // height: token.controlHeight,
          lineHeight: `${token.controlHeight}px`,
          color: token.colorText,

          [`&:not(${componentCls}-menu-item-disabled)`]: {
            cursor: 'pointer',
            [`&:hover`]: {
              borderRadius: token.borderRadiusSM,
              backgroundColor: token.colorBgTextHover,
            },
          },

          [`&${componentCls}-menu-item-disabled`]: {
            cursor: 'not-allowed',
            color: token.colorTextDisabled,
          },
        },
      },
    },
    [`${componentCls}-item-content`]: {
      marginLeft: token.marginXS,
    },
  };
});
