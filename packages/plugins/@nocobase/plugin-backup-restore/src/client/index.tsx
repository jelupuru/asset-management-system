/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
// import { BackupAndRestoreList } from './Configuration';
import { lazy } from '@nocobase/client';
const { BackupAndRestoreList } = lazy(() => import('./Configuration'), 'BackupAndRestoreList');
import { DuplicatorProvider } from './DuplicatorProvider';
import { NAMESPACE } from './locale';

export class PluginBackupRestoreClient extends Plugin {
  async load() {
    this.app.use(DuplicatorProvider);
    this.app.pluginSettingsManager.add(NAMESPACE, {
      title: this.t('Backup & Restore'),
      icon: 'CloudServerOutlined',
      Component: BackupAndRestoreList,
      aclSnippet: 'pm.backup-restore',
    });
  }
}

export default PluginBackupRestoreClient;
