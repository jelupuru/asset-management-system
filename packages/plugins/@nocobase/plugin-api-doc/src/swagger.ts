/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export default {
  info: {
    title: 'AMS-GHMC API - API doc plugin',
  },
  paths: {
    '/swagger:getUrls': {
      get: {
        description: 'Get all api-doc destination',
        tags: ['swagger'],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/responses/SwaggerUrls',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    responses: {
      SwaggerUrls: {
        type: 'array',
        items: {
          properties: {
            name: {
              type: 'string',
            },
            url: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
