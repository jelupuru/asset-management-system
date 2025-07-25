/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import lodash from 'lodash';
import { DataTypes } from 'sequelize';
import { Model } from '../model';
import { BaseColumnFieldOptions, Field } from './field';

export class ContextField extends Field {
  get dataType() {
    const type: string = this.options.dataType || 'string';
    return DataTypes[type.toUpperCase()] || DataTypes.STRING;
  }

  listener = async (model: Model, options) => {
    const { name, dataIndex } = this.options;
    const { context } = options;
    model.set(name, lodash.get(context, dataIndex));
    model.changed(name, true);
  };

  bind() {
    super.bind();
    const { createOnly } = this.options;
    this.on('beforeCreate', this.listener);
    if (!createOnly) {
      this.on('beforeUpdate', this.listener);
    }
  }

  unbind() {
    super.unbind();
    const { createOnly } = this.options;
    this.off('beforeCreate', this.listener);
    if (!createOnly) {
      this.off('beforeUpdate', this.listener);
    }
  }
}

export interface ContextFieldOptions extends BaseColumnFieldOptions {
  type: 'context';
  dataIndex: string;
  dataType?: string;
  createOnly?: boolean;
}
