/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Model } from '@nocobase/database';
import nodemailer from 'nodemailer';

export class NotificationService extends Model {
  [key: string]: any;

  static createTransport = nodemailer.createTransport;

  private _transporter = null;

  get transporter() {
    if (this._transporter) {
      return this._transporter;
    }
    return (this._transporter = NotificationService.createTransport(this.options));
  }

  async send(options) {
    const { from } = this.options;
    const mailOptions = {
      from,
      ...options,
    };
    return this.transporter.sendMail(mailOptions);
  }
}
