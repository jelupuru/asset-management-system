/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';

import { NAMESPACE } from '../../locale';
import common from './common';
import { useTranslation } from 'react-i18next';

export default {
  title: `{{t("Aliyun OSS", { ns: "${NAMESPACE}" })}}`,
  name: 'ali-oss',
  fieldset: {
    title: common.title,
    name: common.name,
    baseUrl: common.baseUrl,
    options: {
      type: 'object',
      'x-component': 'fieldset',
      properties: {
        region: {
          title: `{{t("Region", { ns: "${NAMESPACE}" })}}`,
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          description: `{{t('Aliyun OSS region part of the bucket. For example: "oss-cn-beijing".', { ns: "${NAMESPACE}" })}}`,
          required: true,
        },
        accessKeyId: {
          title: `{{t("AccessKey ID", { ns: "${NAMESPACE}" })}}`,
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
        accessKeySecret: {
          title: `{{t("AccessKey Secret", { ns: "${NAMESPACE}" })}}`,
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Password',
          required: true,
        },
        bucket: {
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
            placeholder: '?x-oss-process=image/auto-orient,1/resize,m_fill,w_94,h_94/quality,q_90',
          },
          description: '{{ renderThumbnailRuleDesc("ali-oss") }}',
        },
      },
    },
    path: common.path,
    rules: common.rules,
    default: common.default,
    paranoid: common.paranoid,
  },
  thumbnailRuleLink: 'https://help.aliyun.com/zh/oss/user-guide/resize-images-4',
};
