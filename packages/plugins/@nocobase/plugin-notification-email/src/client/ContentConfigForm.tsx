/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { SchemaComponent, css } from '@nocobase/client';
import { useNotifyMailTranslation } from './hooks/useTranslation';

export const ContentConfigForm = ({ variableOptions }) => {
  const { t } = useNotifyMailTranslation();
  return (
    <SchemaComponent
      scope={{ t }}
      schema={{
        type: 'void',
        properties: {
          subject: {
            type: 'string',
            required: true,
            title: `{{t("Subject")}}`,
            'x-decorator': 'FormItem',
            'x-component': 'Variable.TextArea',
            'x-component-props': {
              scope: variableOptions,
            },
          },
          contentType: {
            type: 'string',
            title: `{{t("Content type")}}`,
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
            enum: [
              { label: 'HTML', value: 'html' },
              { label: `{{t("Plain text")}}`, value: 'text' },
            ],
            default: 'html',
          },
          html: {
            type: 'string',
            required: true,
            title: `{{t("Content")}}`,
            'x-decorator': 'FormItem',
            'x-component': 'Variable.RawTextArea',
            'x-component-props': {
              scope: variableOptions,
              placeholder: 'Hi,',
              autoSize: {
                minRows: 10,
              },
            },
            'x-reactions': [
              {
                dependencies: ['.contentType'],
                fulfill: {
                  state: {
                    visible: '{{$deps[0] === "html"}}',
                  },
                },
              },
            ],
          },
          text: {
            type: 'string',
            required: true,
            title: `{{t("Content")}}`,
            'x-decorator': 'FormItem',
            'x-component': 'Variable.RawTextArea',
            'x-component-props': {
              scope: variableOptions,
              placeholder: 'Hi,',
              autoSize: {
                minRows: 10,
              },
            },
            'x-reactions': [
              {
                dependencies: ['.contentType'],
                fulfill: {
                  state: {
                    visible: '{{$deps[0] === "text"}}',
                  },
                },
              },
            ],
          },
        },
      }}
    />
  );
};
