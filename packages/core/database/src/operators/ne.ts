/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Op } from 'sequelize';

export default {
  $ne(val, ctx) {
    if (Array.isArray(val)) {
      return {
        [Op.notIn]: val,
      };
    }
    return val === null
      ? {
          [Op.ne]: null,
        }
      : {
          [Op.or]: {
            [Op.ne]: val,
            [Op.is]: null,
          },
        };
  },
} as Record<string, any>;
