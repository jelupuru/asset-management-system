/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { uid } from '@formily/shared';

import React from 'react';
import { mockApp } from '@nocobase/client/demo-utils';
import { SchemaComponent, Plugin, ISchema } from '@nocobase/client';

const schema: ISchema = {
  type: 'void',
  name: 'root',
  'x-decorator': 'FormV2',
  'x-component': 'ShowFormData',
  properties: {
    test: {
      type: 'boolean',
      title: 'Test',
      'x-decorator': 'FormItem',
      'x-component': 'Upload.Attachment',
      'x-component-props': {
        action: 'attachments:create',
      },
    },
  },
};
const Demo = () => {
  return <SchemaComponent schema={schema} />;
};

class DemoPlugin extends Plugin {
  async load() {
    this.app.router.add('root', { path: '/', Component: Demo });
  }
}

const app = mockApp({
  plugins: [DemoPlugin],
  apis: {
    'attachments:create': () => [
      200,
      {
        data: {
          id: uid(),
          title: '20240131154451',
          filename: '99726f173d5329f056c083f2ee0ccc08.png',
          extname: '.png',
          path: '',
          size: 841380,
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          mimetype: 'image/png',
          meta: {},
          storageId: 1,
          updatedAt: '2024-04-29T09:49:28.769Z',
          createdAt: '2024-04-29T09:49:28.769Z',
          createdById: 1,
          updatedById: 1,
        },
      },
    ],
  },
});

export default app.getRootComponent();
