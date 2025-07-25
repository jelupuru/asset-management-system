/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema as FormilySchema } from '@formily/json-schema';

export interface ISchema extends FormilySchema {
  'x-use-component-props'?: string | Function;
  'x-use-decorator-props'?: string;
}
