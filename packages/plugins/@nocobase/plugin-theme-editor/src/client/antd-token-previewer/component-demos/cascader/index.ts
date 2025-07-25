/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import Default from './cascader';
import disable from './disable';
import HighLight from './highlight';

import type { ComponentDemo } from '../../interface';

const previewerDemo: ComponentDemo[] = [Default, HighLight, disable];

export default previewerDemo;
