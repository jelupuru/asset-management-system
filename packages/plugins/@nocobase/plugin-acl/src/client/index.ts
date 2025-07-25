/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin, lazy } from '@nocobase/client';
import { ACLSettingsUI } from './ACLSettingsUI';
// import { RolesManagement } from './RolesManagement';
const { RolesManagement } = lazy(() => import('./RolesManagement'), 'RolesManagement');
import { RolesManager } from './roles-manager';

export class PluginACLClient extends Plugin {
  rolesManager = new RolesManager();
  settingsUI = new ACLSettingsUI();

  async load() {
    this.pluginSettingsManager.add('users-permissions.roles', {
      title: this.t('Roles & Permissions'),
      icon: 'LockOutlined',
      Component: RolesManagement,
      aclSnippet: 'pm.acl.roles',
      sort: 3,
    });
  }
}

export { RolesManagerContext } from './RolesManagerProvider';
export default PluginACLClient;
