/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export default {
  openapi: '3.0.3',
  info: {
    title: 'AMS-GHMC API documentation',
    description: '',
    contact: {
      url: 'https://github.com/mayratech/mayratech/issues',
    },
    license: {
      name: 'Core packages are Apache 2.0 & Plugins packages are AGPL 3.0 licensed.',
      url: 'https://github.com/mayratech/mayratech/issues#license',
    },
  },
  externalDocs: {
    description: 'Find out more about AMS-GHMC',
    url: 'https://docs.mayra.com/api/http',
  },
  components: {
    securitySchemes: {
      'api-key': {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      error: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                message: {
                  description: '错误信息',
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      'api-key': [],
    },
  ],
};
