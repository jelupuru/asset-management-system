/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Model } from '@nocobase/database';
import { ACL } from '@nocobase/acl';

export class RoleModel extends Model {
  writeToAcl(options: { acl: ACL; withOutStrategy?: boolean }) {
    const { acl } = options;
    const roleName = this.get('name') as string;
    let role = acl.getRole(roleName);

    if (!role) {
      role = acl.define({
        role: roleName,
      });
    }

    if (options.withOutStrategy !== true) {
      role.setStrategy({
        ...((this.get('strategy') as object) || {}),
        allowConfigure: this.get('allowConfigure') as boolean,
      });
    }

    role.snippets = new Set(this.get('snippets'));
  }
}
