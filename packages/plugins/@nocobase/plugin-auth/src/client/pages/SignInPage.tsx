/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { css } from '@emotion/css';
import { Space, Tabs } from 'antd';
import React, { createElement, useContext } from 'react';
import { useCurrentDocumentTitle, usePlugin, useViewport } from '@nocobase/client';
import AuthPlugin, { AuthOptions } from '..';
import { Authenticator, AuthenticatorsContext } from '../authenticator';
import { useAuthTranslation } from '../locale';
import { Schema } from '@formily/react';

export const useSignInForms = (): {
  [authType: string]: AuthOptions['components']['SignInForm'];
} => {
  const plugin = usePlugin(AuthPlugin);
  const authTypes = plugin.authTypes.getEntities();
  const signInForms = {};
  for (const [authType, options] of authTypes) {
    if (options.components?.SignInForm) {
      signInForms[authType] = options.components.SignInForm;
    }
  }
  return signInForms;
};

export const useSignInButtons = (authenticators = []) => {
  const plugin = usePlugin(AuthPlugin);
  const authTypes = plugin.authTypes.getEntities();
  const customs = {};
  for (const [authType, options] of authTypes) {
    if (options.components?.SignInButton) {
      customs[authType] = options.components.SignInButton;
    }
  }

  const types = Object.keys(customs);
  return authenticators
    .filter((authenticator) => types.includes(authenticator.authType))
    .map((authenticator, index) => React.createElement(customs[authenticator.authType], { key: index, authenticator }));
};

export const SignInPage = () => {
  const { t } = useAuthTranslation();
  useCurrentDocumentTitle('Signin');
  useViewport();
  const signInForms = useSignInForms();
  const authenticators = useContext(AuthenticatorsContext);
  const signInButtons = useSignInButtons(authenticators);

  if (!authenticators.length) {
    return <div style={{ color: '#ccc' }}>{t('No authentication methods available.')}</div>;
  }

  const tabs = authenticators
    .map((authenticator) => {
      const C = signInForms[authenticator.authType];
      if (!C) {
        return;
      }
      const defaultTabTitle = `${t('Sign-in')} (${Schema.compile(
        authenticator.authTypeTitle || authenticator.authType,
        { t },
      )})`;
      return {
        component: createElement<{
          authenticator: Authenticator;
        }>(C, { authenticator }),
        tabTitle: authenticator.title || defaultTabTitle,
        ...authenticator,
      };
    })
    .filter((i) => i);

  return (
    <Space
      direction="vertical"
      className={css`
        display: flex;
      `}
    >
      {tabs.length > 1 ? (
        <Tabs items={tabs.map((tab) => ({ label: tab.tabTitle, key: tab.name, children: tab.component }))} />
      ) : tabs.length ? (
        <div>{tabs[0].component}</div>
      ) : (
        <></>
      )}
      <Space
        direction="vertical"
        className={css`
          display: flex;
        `}
      >
        {signInButtons}
      </Space>
    </Space>
  );
};
