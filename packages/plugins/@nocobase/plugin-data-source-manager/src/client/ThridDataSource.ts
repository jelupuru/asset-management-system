/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { DataSourceOptions, DataSource } from '@nocobase/client';

export class ThirdDataSource extends DataSource {
  async getDataSource() {
    const service = await this.app.apiClient.request<{
      data: DataSourceOptions;
    }>({
      url: `dataSources:get/${this.key}`,
      params: {
        appends: ['collections'],
      },
    });
    return service.data.data;
  }
}
