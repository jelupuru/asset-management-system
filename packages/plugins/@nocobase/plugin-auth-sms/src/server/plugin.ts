/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import VerificationPlugin from '@nocobase/plugin-verification';
import { InstallOptions, Plugin } from '@nocobase/server';
import { authType, namespace } from '../constants';
import { SMSAuth } from './sms-auth';
import { tval } from '@nocobase/utils';

export class PluginAuthSMSServer extends Plugin {
  afterAdd() {}

  async load() {
    const verificationPlugin: VerificationPlugin = this.app.getPlugin('verification');
    if (!verificationPlugin) {
      this.app.logger.warn('auth-sms: @nocobase/plugin-verification is required');
      return;
    }
    verificationPlugin.interceptors.register('auth:signIn', {
      manual: true,
      getReceiver: (ctx) => {
        return ctx.action.params.values.phone;
      },
      expiresIn: 120,
      validate: async (ctx, phone) => {
        if (!phone) {
          throw new Error(ctx.t('Not a valid cellphone number, please re-enter'));
        }
        return true;
      },
    });

    this.app.authManager.registerTypes(authType, {
      auth: SMSAuth,
      title: tval('SMS', { ns: namespace }),
    });
  }

  async install(options?: InstallOptions) {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginAuthSMSServer;
