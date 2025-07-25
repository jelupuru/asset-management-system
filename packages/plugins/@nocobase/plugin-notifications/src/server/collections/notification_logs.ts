/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CollectionOptions } from '@nocobase/database';
import { NotificationLog } from '../models';

export default {
  name: 'notification_logs',
  model: NotificationLog,
  title: '通知日志',
  fields: [
    {
      title: '接收人',
      type: 'json',
      name: 'receiver',
    },
    {
      title: '状态',
      type: 'string',
      name: 'state',
    },
    {
      title: '详情',
      type: 'json',
      name: 'response',
    },
  ],
} as CollectionOptions;
