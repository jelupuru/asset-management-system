/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export * from './DesignableSwitch';
export * from './FormProvider';
export * from './RemoteSchemaComponent';
export * from './SchemaComponent';
export * from './SchemaComponentOptions';
export * from './SchemaComponentProvider';
import { Plugin } from '../../application/Plugin';
import { DesignableSwitch } from './DesignableSwitch';

export class SchemaComponentPlugin extends Plugin {
  async load() {
    this.addComponents();
  }

  addComponents() {
    this.app.addComponents({
      DesignableSwitch,
    });
  }
}

export default SchemaComponentPlugin;
