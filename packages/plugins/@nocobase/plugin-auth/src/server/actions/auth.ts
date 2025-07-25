/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

/* istanbul ignore file -- @preserve */
import { Context, Next } from '@nocobase/actions';
import { PasswordField } from '@nocobase/database';
import { namespace } from '../../preset';

export default {
  // lostPassword: async (ctx: Context, next: Next) => {
  //   ctx.body = await ctx.auth.lostPassword();
  //   await next();
  // },
  // resetPassword: async (ctx: Context, next: Next) => {
  //   ctx.body = await ctx.auth.resetPassword();
  //   await next();
  // },
  // getUserByResetToken: async (ctx: Context, next: Next) => {
  //   ctx.body = await ctx.auth.getUserByResetToken();
  //   await next();
  // },
  changePassword: async (ctx: Context, next: Next) => {
    const systemSettings = ctx.db.getRepository('systemSettings');
    const settings = await systemSettings.findOne();
    const enableChangePassword = settings.get('enableChangePassword');
    if (enableChangePassword === false) {
      ctx.throw(403, ctx.t('Password is not allowed to be changed', { ns: namespace }));
    }

    const {
      values: { oldPassword, newPassword, confirmPassword },
    } = ctx.action.params;
    if (newPassword !== confirmPassword) {
      ctx.throw(400, ctx.t('The password is inconsistent, please re-enter', { ns: namespace }));
    }
    const currentUser = ctx.auth.user;
    if (!currentUser) {
      ctx.throw(401);
    }
    let key: string;
    if (currentUser.username) {
      key = 'username';
    } else {
      key = 'email';
    }
    const user = await ctx.db.getRepository('users').findOne({
      where: {
        [key]: currentUser[key],
      },
    });
    const pwd = ctx.db.getCollection('users').getField<PasswordField>('password');
    const isValid = await pwd.verify(oldPassword, user.password);
    if (!isValid) {
      ctx.throw(401, ctx.t('The password is incorrect, please re-enter', { ns: namespace }));
    }
    user.password = newPassword;
    await user.save();
    ctx.body = currentUser;
    await next();
  },
};
