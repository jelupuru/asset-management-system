/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Registry } from '@nocobase/utils/client';

export type RolesManagerOptions = {
  title: string;
  Component: React.ComponentType<any>;
};

export class RolesManager {
  rolesManager = new Registry<RolesManagerOptions>();

  add(name: string, options: RolesManagerOptions) {
    this.rolesManager.register(name, options);
  }

  list() {
    return this.rolesManager.getEntities();
  }
}
