/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { render, screen, sleep, userEvent } from '@nocobase/test/client';
import React from 'react';
import App1 from '../demos/demo1';

describe('RemoteSelect', () => {
  it('should render correctly', async () => {
    render(<App1 />);

    const selector = document.querySelector('.ant-select-selector');
    expect(selector).toBeInTheDocument();

    await userEvent.click(selector);

    // 下拉框中显示 loading
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();

    // 等待接口返回数据
    await sleep(500);

    expect(screen.getByText('title1')).toBeInTheDocument();
    expect(screen.getByText('title2')).toBeInTheDocument();
  });
});
