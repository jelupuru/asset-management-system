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
  $isFalsy(value) {
    if (value === true || value === 'true') {
      return {
        [Op.or]: {
          [Op.is]: null,
          [Op.eq]: false,
        },
      };
    }
    return {
      [Op.eq]: true,
    };
  },

  $isTruly(value) {
    if (value === true || value === 'true') {
      return {
        [Op.eq]: true,
      };
    }
    return {
      [Op.or]: {
        [Op.is]: null,
        [Op.eq]: false,
      },
    };
  },
} as Record<string, any>;
