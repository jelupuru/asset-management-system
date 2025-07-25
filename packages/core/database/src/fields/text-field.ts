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

export class TextField extends Field {
  get dataType() {
    if (this.database.inDialect('mysql', 'mariadb') && this.options.length) {
      return DataTypes.TEXT(this.options.length);
    }
    return DataTypes.TEXT;
  }

  init() {
    if (this.database.inDialect('mysql', 'mariadb')) {
      this.options.defaultValue = null;
    }
  }
}

export interface TextFieldOptions extends BaseColumnFieldOptions {
  type: 'text';
  length?: 'tiny' | 'medium' | 'long';
}
