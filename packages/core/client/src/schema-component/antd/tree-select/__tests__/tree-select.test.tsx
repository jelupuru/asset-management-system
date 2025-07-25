/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { render, screen, userEvent } from '@nocobase/test/client';
import React from 'react';
import App1 from '../demos/demo1';

describe('TreeSelect', () => {
  it('should display the value of user input', async () => {
    const { container } = render(<App1 />);
    const input = container.querySelector('input') as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.click(screen.getByText('选项1'));
    expect(container.querySelector('.ant-tag')?.innerHTML).toBe('选项1');
  });
});
