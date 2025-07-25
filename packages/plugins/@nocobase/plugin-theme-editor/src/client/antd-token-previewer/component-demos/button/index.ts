/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import Default from './button';
import ButtonIconDemo from './button-icon';
import DangerButton from './dangerButton';
import DefaultButton from './defaultButton';
import disabled from './disabled';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [Default, ButtonIconDemo, DangerButton, DefaultButton, disabled];

export default previewerDemo;
