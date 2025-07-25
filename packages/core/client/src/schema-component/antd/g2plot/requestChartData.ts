/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { APIClient } from '../../../api-client';

export const requestChartData = (options) => {
  return async function (this: { api: APIClient }) {
    try {
      const response = await this.api.request(options);
      return response?.data?.data;
    } catch (error) {
      return [];
    }
  };
};
