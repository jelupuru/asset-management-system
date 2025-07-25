/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Op, Sequelize } from 'sequelize';

export default {
  $exists(value, ctx) {
    return {
      [Op.not]: null,
    };
  },
  $notExists(value, ctx) {
    return {
      [Op.is]: null,
    };
  },
} as Record<string, any>;
