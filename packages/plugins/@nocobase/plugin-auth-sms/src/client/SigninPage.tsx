/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaComponent } from '@nocobase/client';
import { ISchema } from '@formily/react';
import React from 'react';
import VerificationCode from './VerificationCode';
import { Authenticator, useSignIn } from '@nocobase/plugin-auth/client';

const phoneForm: ISchema = {
  type: 'object',
  name: 'phoneForm',
  'x-component': 'Form',
  properties: {
    phone: {
      type: 'string',
      required: true,
      'x-component': 'Input',
      'x-validator': 'phone',
      'x-decorator': 'FormItem',
      'x-component-props': { placeholder: '{{t("Phone")}}', style: {} },
    },
    code: {
      type: 'string',
      required: true,
      'x-component': 'VerificationCode',
      'x-component-props': {
        actionType: 'auth:signIn',
        targetFieldName: 'phone',
      },
      'x-decorator': 'FormItem',
    },
    actions: {
      title: '{{t("Sign in")}}',
      type: 'void',
      'x-component': 'Action',
      'x-component-props': {
        htmlType: 'submit',
        block: true,
        type: 'primary',
        useAction: '{{ useSMSSignIn }}',
        style: { width: '100%' },
      },
    },
    tip: {
      type: 'void',
      'x-component': 'div',
      'x-content': '{{t("User will be registered automatically if not exists.", {ns: "auth-sms"})}}',
      'x-component-props': { style: { color: '#ccc' } },
      'x-visible': '{{ autoSignup }}',
    },
  },
};

export const SigninPage = (props: { authenticator: Authenticator }) => {
  const authenticator = props.authenticator;
  const { name, options } = authenticator;
  const autoSignup = !!options?.autoSignup;
  const useSMSSignIn = () => {
    return useSignIn(name);
  };
  return <SchemaComponent schema={phoneForm} scope={{ useSMSSignIn, autoSignup }} components={{ VerificationCode }} />;
};
