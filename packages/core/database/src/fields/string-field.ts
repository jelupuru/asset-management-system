/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';

export class StringField extends Field {
  get dataType() {
    if (this.options.length) {
      return DataTypes.STRING(this.options.length);
    }

    return DataTypes.STRING;
  }
}

export interface StringFieldOptions extends BaseColumnFieldOptions {
  type: 'string';
  length?: number;
}
