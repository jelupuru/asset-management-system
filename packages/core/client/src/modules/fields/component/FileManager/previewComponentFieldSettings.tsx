/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Field } from '@formily/core';
import { useField, useFieldSchema } from '@formily/react';
import { useTranslation } from 'react-i18next';
import { SchemaSettings } from '../../../../application/schema-settings/SchemaSettings';
import { useColumnSchema } from '../../../../schema-component/antd/table/Table.Column.Decorator';
import { useDesignable } from '../../../../schema-component/hooks/useDesignable';

export const previewComponentFieldSettings = new SchemaSettings({
  name: 'fieldSettings:component:Preview',
  items: [
    {
      name: 'size',
      type: 'select',
      useVisible() {
        const { fieldSchema: tableColumnSchema } = useColumnSchema();
        const isInTable = tableColumnSchema?.parent?.['x-component'] === 'TableV2.Column';
        return !isInTable;
      },
      useComponentProps() {
        const { t } = useTranslation();
        const field = useField<Field>();
        const fieldSchema = useFieldSchema();
        const { dn } = useDesignable();
        return {
          title: t('Size'),
          options: [
            { label: t('Large'), value: 'large' },
            { label: t('Default'), value: 'default' },
            { label: t('Small'), value: 'small' },
          ],
          value: field?.componentProps?.size || 'default',
          onChange(size) {
            const schema = {
              ['x-uid']: fieldSchema['x-uid'],
            };
            fieldSchema['x-component-props'] = fieldSchema['x-component-props'] || {};
            fieldSchema['x-component-props']['size'] = size;
            schema['x-component-props'] = fieldSchema['x-component-props'];
            field.componentProps = field.componentProps || {};
            field.componentProps.size = size;
            dn.emit('patch', {
              schema,
            });
            dn.refresh();
          },
        };
      },
    },
  ],
});
