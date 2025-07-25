/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/server';
import backupFilesResourcer from './resourcers/backup-files';

export default class PluginBackupRestoreServer extends Plugin {
  beforeLoad() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ['backupFiles:*'],
    });
  }

  async load() {
    this.app.resourcer.define(backupFilesResourcer);
  }
}
