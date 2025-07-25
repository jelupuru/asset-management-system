/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { APIClient } from '../api-client';

class MockAPIClient extends APIClient {
  mockAdapter() {
    const MockAdapter = require('axios-mock-adapter');
    return new MockAdapter(this.axios);
  }
}

export const mockAPIClient = () => {
  const apiClient = new MockAPIClient();
  const mockRequest = apiClient.mockAdapter();
  return { apiClient, mockRequest };
};
