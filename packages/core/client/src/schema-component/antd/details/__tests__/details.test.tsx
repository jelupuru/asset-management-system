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

describe('Details', () => {
  it('should render correctly', () => {
    render(<App1 />);

    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
