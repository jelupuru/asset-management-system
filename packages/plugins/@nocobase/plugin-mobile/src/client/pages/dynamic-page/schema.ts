/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { getMobilePageContentSchema } from './content';
import { mobilePageHeaderSchema } from './header';
import { mobilePageSettings } from './settings';
import { css } from '@nocobase/client';

const spaceClassName = css(`
&:first-child {
  .ant-space-item {
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
    span {
      position: relative;
      bottom: -15px;
      right: -8px;
      transform: rotate(-45deg);
      font-size: 10px;
    }
  }
}
`);

export function getMobilePageSchema(pageSchemaUid: string, firstTabUid: string) {
  const pageSchema = {
    type: 'void',
    name: pageSchemaUid,
    'x-uid': pageSchemaUid,
    'x-component': 'MobilePageProvider',
    'x-settings': mobilePageSettings.name,
    'x-decorator': 'BlockItem',
    'x-decorator-props': {
      style: {
        height: '100%',
      },
    },
    'x-toolbar-props': {
      draggable: false,
      spaceWrapperStyle: { right: -15, top: -15 },
      spaceClassName,
      toolbarStyle: {
        overflowX: 'hidden',
      },
    },
    properties: {
      header: mobilePageHeaderSchema,
      content: getMobilePageContentSchema(firstTabUid),
    },
  };

  return { schema: pageSchema };
}
