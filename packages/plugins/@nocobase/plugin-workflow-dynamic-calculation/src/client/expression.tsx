/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CollectionFieldInterface, interfacesProperties } from '@nocobase/client';

import { NAMESPACE } from '../locale';

const { defaultProps } = interfacesProperties;

export class ExpressionFieldInterface extends CollectionFieldInterface {
  name = 'expression';
  type = 'string';
  group = 'advanced';
  order = 1;
  title = `{{t("Expression", { ns: "${NAMESPACE}" })}}`;
  description = `{{t("Used to store expressions for use in workflows so that different expressions can be called for different data.", { ns: "${NAMESPACE}" })}}`;
  sortable = true;
  default = {
    type: 'text',
    uiSchema: {
      'x-component': 'DynamicExpression',
    },
  };
  properties = {
    ...defaultProps,
  };
  hidden = true;
}
