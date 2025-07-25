/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Collection, CollectionContext, CollectionOptions } from './collection';

export class ViewCollection extends Collection {
  constructor(options: CollectionOptions, context: CollectionContext) {
    options.autoGenId = false;
    options.timestamps = false;

    super(options, context);
  }

  isView() {
    return true;
  }

  unavailableActions(): Array<string> {
    if (this.options.writableView) {
      return [];
    }

    return ['create', 'update', 'destroy'];
  }

  protected sequelizeModelOptions(): any {
    const modelOptions = super.sequelizeModelOptions();
    modelOptions.tableName = this.options.viewName || this.options.name;
    return modelOptions;
  }
}
