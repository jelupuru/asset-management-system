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
import { customAlphabet, nanoid } from 'nanoid';

const DEFAULT_SIZE = 12;
export class NanoidField extends Field {
  get dataType() {
    return DataTypes.STRING;
  }

  init() {
    const { name, size, customAlphabet: customAlphabetOptions, autoFill } = this.options;

    this.listener = async (instance) => {
      const value = instance.get(name);

      if (!value && autoFill !== false) {
        const nanoIdFunc = customAlphabetOptions ? customAlphabet(customAlphabetOptions) : nanoid;
        instance.set(name, nanoIdFunc(size || DEFAULT_SIZE));
      }
    };
  }

  bind() {
    super.bind();
    this.on('beforeValidate', this.listener);
  }

  unbind() {
    super.unbind();
    this.off('beforeValidate', this.listener);
  }
}

export interface NanoidFieldOptions extends BaseColumnFieldOptions {
  type: 'nanoid';
  size?: number;
  customAlphabet?: string;
  autoFill?: boolean;
}
