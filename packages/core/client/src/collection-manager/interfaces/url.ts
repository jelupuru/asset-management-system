/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema } from '@formily/react';
import { defaultProps, operators } from './properties';
import { CollectionFieldInterface } from '../../data-source/collection-field-interface/CollectionFieldInterface';

export class UrlFieldInterface extends CollectionFieldInterface {
  name = 'url';
  type = 'string';
  group = 'basic';
  order = 5;
  title = '{{t("URL")}}';
  default = {
    type: 'text',
    uiSchema: {
      type: 'string',
      'x-component': 'Input.URL',
    },
  };
  componentOptions = [
    {
      label: 'URL',
      value: 'Input.URL',
    },
    {
      label: 'Preview',
      value: 'Input.Preview',
    },
  ];
  availableTypes = ['string', 'text'];
  schemaInitialize(schema: ISchema, { block }) {}
  properties = {
    ...defaultProps,
  };
  titleUsable = true;
  filterable = {
    operators: operators.string,
  };
}
