/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useTranslation } from 'react-i18next';
import { NAMESPACE } from '../../locale';
import common from './common';
import React from 'react';

export default {
  title: `{{t("Tencent COS", { ns: "${NAMESPACE}" })}}`,
  name: 'tx-cos',
  fieldset: {
    title: common.title,
    name: common.name,
    baseUrl: common.baseUrl,
    options: {
      type: 'object',
      'x-component': 'fieldset',
      properties: {
        Region: {
          title: `{{t("Region", { ns: "${NAMESPACE}" })}}`,
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
        SecretId: {
          title: `{{t("SecretId", { ns: "${NAMESPACE}" })}}`,
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
        SecretKey: {
          title: `{{t("SecretKey", { ns: "${NAMESPACE}" })}}`,
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Password',
          required: true,
        },
        Bucket: {
          title: `{{t("Bucket", { ns: "${NAMESPACE}" })}}`,
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
        thumbnailRule: {
          title: 'Thumbnail rule',
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '?imageMogr2/thumbnail/!50p',
          },
          description: '{{ renderThumbnailRuleDesc("tx-cos") }}',
        },
      },
    },
    path: common.path,
    rules: common.rules,
    default: common.default,
    paranoid: common.paranoid,
  },
  thumbnailRuleLink: 'https://cloud.tencent.com/document/product/436/42214',
};
