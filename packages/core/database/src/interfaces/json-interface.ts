/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BaseInterface } from './base-interface';

export class JsonInterface extends BaseInterface {
  async toValue(value: string, ctx?: any): Promise<any> {
    return JSON.parse(value);
  }

  toString(value: any, ctx?: any) {
    return JSON.stringify(value);
  }
}
