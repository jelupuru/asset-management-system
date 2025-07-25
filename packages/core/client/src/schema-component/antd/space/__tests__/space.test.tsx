/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { Space } from '../index';

describe('Space', () => {
  it('renders without error', () => {
    const { container } = render(<Space />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it('renders with custom split', () => {
    const { container } = render(<Space split="|" />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });
});
