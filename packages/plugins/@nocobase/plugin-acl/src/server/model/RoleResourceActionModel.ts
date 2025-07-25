/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ACL, ACLRole } from '@nocobase/acl';
import { Model } from '@nocobase/database';

export class RoleResourceActionModel extends Model {
  async writeToACL(options: { acl: ACL; role: ACLRole; resourceName: string }) {
    const { resourceName, role } = options;

    const actionName = this.get('name') as string;

    const fields = this.get('fields') as any;

    const actionPath = `${resourceName}:${actionName}`;
    const actionParams = {
      fields,
    };

    // @ts-ignore
    const scope = await this.getScope();

    if (scope) {
      actionParams['own'] = scope.get('key') === 'own';
      actionParams['filter'] = scope.get('scope');
    }

    role.grantAction(actionPath, actionParams);
  }
}
