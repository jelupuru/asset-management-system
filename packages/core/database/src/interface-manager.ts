/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import Database from './database';
import { BaseInterface } from './interfaces/base-interface';

export class InterfaceManager {
  interfaceTypes: Map<string, new (options) => BaseInterface> = new Map();

  constructor(private db: Database) {}

  registerInterfaceType(name, iface) {
    this.interfaceTypes.set(name, iface);
  }

  getInterfaceType(name): new (options) => BaseInterface {
    return this.interfaceTypes.get(name);
  }
}
