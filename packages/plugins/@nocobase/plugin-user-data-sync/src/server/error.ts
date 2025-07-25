/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export class ExternalAPIError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.name = 'ExternalAPIError';
    this.code = ErrorCodes.EXTERNAL_API_ERROR;
  }
}

export class ErrorCodes {
  static SUCCESS = 0;
  static UNAUTHORIZED = 401;
  static EXTERNAL_API_ERROR = 510;

  static messages = {
    [ErrorCodes.SUCCESS]: 'Success',
    [ErrorCodes.UNAUTHORIZED]: 'Unauthorized',
    [ErrorCodes.EXTERNAL_API_ERROR]: 'External API Error',
  };

  static getErrorMessage(code) {
    return this.messages[code] || 'Unknown Error';
  }
}
