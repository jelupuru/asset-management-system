/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { render, screen } from '@nocobase/test/client';
import React from 'react';
import App1 from '../demos/demo1';

describe('CardItem', () => {
  it('should works', () => {
    render(<App1 />);

    // 标题
    expect(screen.getByText('Card')).toBeInTheDocument();
    // 内容
    expect(screen.getByText('Hello Card!')).toBeInTheDocument();
  });
});
