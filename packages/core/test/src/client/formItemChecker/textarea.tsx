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

export type TextareaCheckOptions = CommonFormItemCheckerOptions;

export async function textareaChecker(options: TextareaCheckOptions) {
  const formItem = getFormItemElement({ Component: 'Input.TextArea', ...options });

  const textarea = formItem.querySelector('textarea');

  if (options.oldValue) {
    expectNoTsError(textarea).toHaveValue(options.oldValue);
  }

  if (options.newValue) {
    await userEvent.clear(textarea);
    await userEvent.type(textarea, options.newValue);
  }
}
