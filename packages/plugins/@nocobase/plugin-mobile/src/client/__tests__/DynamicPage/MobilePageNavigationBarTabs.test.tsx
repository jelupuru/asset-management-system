/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { render, screen, waitFor, waitForApp } from '@nocobase/test/client';
import Basic from '../../demos/pages-navigation-bar-actions';

describe('MobilePage', () => {
  it('basic', async () => {
    render(<Basic />);
    await waitForApp();

    await waitFor(() => {
      expect(screen.queryByText('Title')).toBeInTheDocument();

      expect(document.querySelector('.adm-nav-bar-left')).toHaveTextContent('Left');
      expect(document.querySelector('.adm-nav-bar-right')).toHaveTextContent('Right1');
      expect(document.querySelector('.adm-nav-bar-right')).toHaveTextContent('Right2');

      expect(screen.queryByText('Bottom')).toBeInTheDocument();
    });
  });
});
