/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CollectionFieldInterface } from '../../data-source/collection-field-interface/CollectionFieldInterface';
import { defaultProps } from './properties';

export class IconFieldInterface extends CollectionFieldInterface {
  name = 'icon';
  type = 'object';
  group = 'basic';
  order = 10;
  title = '{{t("Icon")}}';
  default = {
    type: 'string',
    uiSchema: {
      type: 'string',
      'x-component': 'IconPicker',
    },
  };
  availableTypes = ['string'];
  hasDefaultValue = true;
  properties = {
    ...defaultProps,
  };
}
