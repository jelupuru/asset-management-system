/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ButtonEditor, SchemaSettings, SchemaSettingsActionLinkItem, useSchemaInitializer } from '@nocobase/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ModalActionSchemaInitializerItem } from './ModalActionSchemaInitializerItem';
export const workbenchActionSettingsCustomRequest = new SchemaSettings({
  name: 'workbench:actionSettings:customRequest',
  items: [
    {
      name: 'editButton',
      Component: ButtonEditor,
      useComponentProps() {
        return { hasIconColor: true };
      },
    },
    {
      name: 'editLink',
      Component: SchemaSettingsActionLinkItem,
    },
    {
      sort: 800,
      name: 'd1',
      type: 'divider',
    },
    {
      sort: 900,
      type: 'remove',
      name: 'remove',
    },
  ],
});

export function WorkbenchCustomRequestActionSchemaInitializerItem(props) {
  // 调用插入功能
  const { insert } = useSchemaInitializer();
  const { t } = useTranslation();
  return (
    <ModalActionSchemaInitializerItem
      title={t('Custom request')}
      modalSchema={{
        title: t('Add custom request', { ns: 'block-workbench' }),
        properties: {
          title: {
            title: t('Title'),
            required: true,
            'x-component': 'Input',
            'x-decorator': 'FormItem',
          },
          icon: {
            title: t('Icon'),
            required: true,
            'x-component': 'IconPicker',
            'x-decorator': 'FormItem',
          },
          iconColor: {
            title: t('Color'),
            required: true,
            default: '#1677FF',
            'x-component': 'ColorPicker',
            'x-decorator': 'FormItem',
          },
        },
      }}
      onSubmit={(values) => {
        insert({
          type: 'void',
          title: values.title,
          'x-component': 'WorkbenchAction',
          'x-component-props': {
            icon: values.icon,
            iconColor: values.iconColor,
            targetComponent: 'CustomRequestAction',
          },
          'x-action': 'customize:form:request',
          'x-toolbar': 'ActionSchemaToolbar',
          'x-settings': 'actionSettings:customRequest',
          'x-decorator': 'CustomRequestAction.Decorator',
          'x-action-settings': {
            onSuccess: {
              manualClose: false,
              redirecting: false,
              successMessage: '{{t("Request success")}}',
            },
          },
        });
      }}
    />
  );
}
