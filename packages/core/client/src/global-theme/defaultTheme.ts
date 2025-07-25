/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ThemeConfig } from './type';

const defaultTheme: ThemeConfig = {
  name: '',
  token: {
    // 顶部导航栏
    colorPrimaryHeader: '#001529',
    colorBgHeader: '#001529',
    colorBgHeaderMenuHover: '#ffffff1a',
    colorBgHeaderMenuActive: '#ffffff1a',
    colorTextHeaderMenu: '#ffffffa6',
    colorTextHeaderMenuHover: '#ffffff',
    colorTextHeaderMenuActive: '#ffffff',

    // UI 配置组件
    colorSettings: '#F18B62',
    colorBgSettingsHover: 'rgba(241, 139, 98, 0.06)',
    colorBorderSettingsHover: 'rgba(241, 139, 98, 0.3)',

    // 动画相关
    motionUnit: 0.03,
    motion: !process.env.__E2E__,
  },
};

export default defaultTheme;
