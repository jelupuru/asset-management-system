/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import userEvent from '@testing-library/user-event';

import { CommonFormItemCheckerOptions, getFormItemElement } from './common';
import { expectNoTsError } from '../utils';

export type InputCheckOptions = CommonFormItemCheckerOptions;

export async function inputChecker(options: InputCheckOptions) {
  const formItem = getFormItemElement({ Component: 'Input', ...options });

  const input = formItem.querySelector('input');

  if (options.oldValue) {
    expectNoTsError(input).toHaveValue(options.oldValue);
  }

  if (options.newValue) {
    await userEvent.clear(input);
    await userEvent.type(input, options.newValue);
  }
}
