/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ArrayField, ArrayFieldOptions } from './array-field';

export interface SetFieldOptions extends Omit<ArrayFieldOptions, 'type'> {
  type: 'set';
}

export class SetField extends ArrayField {
  beforeSave = (model) => {
    const oldValue = model.get(this.options.name);
    if (oldValue) {
      model.set(this.options.name, [...new Set(oldValue)]);
    }
  };

  bind() {
    super.bind();
    this.on('beforeSave', this.beforeSave);
  }

  unbind() {
    super.unbind();
    this.off('beforeSave', this.beforeSave);
  }
}
