/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { parse } from '@nocobase/utils';

export class Environment {
  private data = {
    vars: {},
    secrets: {},
  };

  addVariable(key: string, value: string) {
    this.data.vars[key] = value;
  }

  addSecret(key: string, value: string) {
    this.data.secrets[key] = value;
  }

  getVariablesAndSecrets() {
    return this.data;
  }

  renderJsonTemplate(template: any) {
    return parse(template)({
      $env: this.data,
    });
  }
}
