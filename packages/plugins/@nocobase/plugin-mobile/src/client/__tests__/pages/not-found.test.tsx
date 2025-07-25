/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { render, waitForApp, screen, userEvent, waitFor, act } from '@nocobase/test/client';
import App from '../../demos/pages-not-found';

describe('NotFound page', () => {
  it('basic page', async () => {
    render(<App />);
    await waitForApp();

    expect(screen.queryByText('404')).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(screen.getByText('Back Home'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Home Page')).toBeInTheDocument();
    });
  });
});
