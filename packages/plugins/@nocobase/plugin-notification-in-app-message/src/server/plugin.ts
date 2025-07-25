/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/server';
import { inAppTypeName } from '../types';
import NotificationsServerPlugin from '@nocobase/plugin-notification-manager';
import InAppNotificationChannel from './InAppNotificationChannel';

const NAMESPACE = 'notification-in-app';
export class PluginNotificationInAppServer extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    const notificationServer = this.pm.get(NotificationsServerPlugin) as NotificationsServerPlugin;
    const instance = new InAppNotificationChannel(this.app);
    instance.load();
    notificationServer.registerChannelType({ type: inAppTypeName, Channel: InAppNotificationChannel });
  }

  async install() {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginNotificationInAppServer;
