/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaSettings, createSwitchSettingsItem, useDesignable } from '@nocobase/client';
import { generatePluginTranslationTemplate, usePluginTranslation } from '../../locale';
import { useFieldSchema } from '@formily/react';
import { useMobileApp } from '../../mobile';

export const mobilePageSettings = new SchemaSettings({
  name: 'mobile:page',
  items: [
    {
      type: 'itemGroup',
      name: 'app',
      useComponentProps() {
        const { t } = usePluginTranslation();
        return {
          title: t('App settings'),
        };
      },
      useVisible() {
        const app = useMobileApp();
        return !!app;
      },
      children: [
        {
          name: 'enableTabBar',
          type: 'switch',
          useComponentProps() {
            const { t } = usePluginTranslation();
            const { showTabBar, setShowTabBar } = useMobileApp();
            const { refresh } = useDesignable();
            return {
              title: t('Display tab bar'),
              checked: showTabBar,
              onChange(v) {
                setShowTabBar(v);
                refresh();
              },
            };
          },
        },
        {
          name: 'enableBackAction',
          type: 'switch',
          useComponentProps() {
            const { t } = usePluginTranslation();
            const { showBackButton, setShowBackButton } = useMobileApp();
            const { refresh } = useDesignable();
            return {
              title: t('Display < back button'),
              checked: showBackButton,
              onChange(v) {
                setShowBackButton(v);
                refresh();
              },
            };
          },
        },
      ],
    },
    {
      type: 'itemGroup',
      name: 'page',
      useComponentProps() {
        const { t } = usePluginTranslation();
        return {
          title: t('Page settings'),
        };
      },
      children: [
        createSwitchSettingsItem({
          name: 'displayPageHeader',
          title: generatePluginTranslationTemplate('Display page header'),
          defaultValue: true,
          schemaKey: 'x-component-props.displayPageHeader',
        }),
        createSwitchSettingsItem({
          name: 'displayNavigationBar',
          title: generatePluginTranslationTemplate('Display navigation bar'),
          defaultValue: true,
          schemaKey: 'x-component-props.displayNavigationBar',
          useVisible() {
            const schema = useFieldSchema();
            return schema['x-component-props']?.['displayPageHeader'] !== false;
          },
        }),
        createSwitchSettingsItem({
          name: 'displayPageTitle',
          title: generatePluginTranslationTemplate('Display page title'),
          defaultValue: true,
          schemaKey: 'x-component-props.displayPageTitle',
          useVisible() {
            const schema = useFieldSchema();
            return (
              schema['x-component-props']?.['displayNavigationBar'] !== false &&
              schema['x-component-props']?.['displayPageHeader'] !== false
            );
          },
        }),
        createSwitchSettingsItem({
          name: 'displayTabs',
          title: generatePluginTranslationTemplate('Display tabs'),
          defaultValue: false,
          schemaKey: 'x-component-props.displayTabs',
          useVisible() {
            const schema = useFieldSchema();
            return schema['x-component-props']?.['displayPageHeader'] !== false;
          },
        }),
      ],
    },
  ],
});
