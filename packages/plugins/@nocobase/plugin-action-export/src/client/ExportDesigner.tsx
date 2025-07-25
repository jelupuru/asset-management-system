/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ArrayItems } from '@formily/antd-v5';
import type { ISchema } from '@formily/react';
import { useField, useFieldSchema } from '@formily/react';
import {
  GeneralSchemaDesigner,
  SchemaSettingsActionModalItem,
  SchemaSettingsDivider,
  SchemaSettingsModalItem,
  SchemaSettingsRemove,
  useDesignable,
} from '@nocobase/client';
import React, { useEffect, useState } from 'react';
import { useShared } from './useShared';
import { useExportTranslation } from './locale';

export const ExportDesigner = () => {
  const field = useField();
  const fieldSchema = useFieldSchema();
  const { t } = useExportTranslation();
  const { dn } = useDesignable();
  const [schema, setSchema] = useState<ISchema>();
  const { schema: pageSchema } = useShared();

  useEffect(() => {
    setSchema(pageSchema);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.address, fieldSchema?.['x-action-settings']?.['exportSettings']]);

  return (
    <GeneralSchemaDesigner disableInitializer>
      <SchemaSettingsModalItem
        title={t('Edit button')}
        schema={
          {
            type: 'object',
            title: t('Edit button'),
            properties: {
              title: {
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                title: t('Button title'),
                default: fieldSchema.title,
                'x-component-props': {},
                // description: `原字段标题：${collectionField?.uiSchema?.title}`,
              },
              icon: {
                'x-decorator': 'FormItem',
                'x-component': 'IconPicker',
                title: t('Button icon'),
                default: fieldSchema?.['x-component-props']?.icon,
                'x-component-props': {},
                // description: `原字段标题：${collectionField?.uiSchema?.title}`,
              },
              type: {
                'x-decorator': 'FormItem',
                'x-component': 'Radio.Group',
                title: t('Button background color'),
                default: fieldSchema?.['x-component-props']?.danger
                  ? 'danger'
                  : fieldSchema?.['x-component-props']?.type === 'primary'
                    ? 'primary'
                    : 'default',
                enum: [
                  { value: 'default', label: '{{t("Default")}}' },
                  { value: 'primary', label: '{{t("Highlight")}}' },
                  { value: 'danger', label: '{{t("Danger red")}}' },
                ],
              },
            },
          } as ISchema
        }
        onSubmit={({ title, icon, type }) => {
          fieldSchema.title = title;
          field.title = title;
          field.componentProps.icon = icon;
          field.componentProps.danger = type === 'danger';
          field.componentProps.type = type;
          fieldSchema['x-component-props'] = fieldSchema['x-component-props'] || {};
          fieldSchema['x-component-props'].icon = icon;
          fieldSchema['x-component-props'].danger = type === 'danger';
          fieldSchema['x-component-props'].type = type;
          dn.emit('patch', {
            schema: {
              ['x-uid']: fieldSchema['x-uid'],
              title,
              'x-component-props': {
                ...fieldSchema['x-component-props'],
              },
            },
          });
          dn.refresh();
        }}
      />
      <SchemaSettingsActionModalItem
        title={t('Exportable fields')}
        schema={schema}
        initialValues={{ exportSettings: fieldSchema?.['x-action-settings']?.exportSettings }}
        scope={{ t }}
        components={{ ArrayItems }}
        onSubmit={({ exportSettings }) => {
          fieldSchema['x-action-settings']['exportSettings'] = exportSettings
            ?.filter((fieldItem) => fieldItem?.dataIndex?.length)
            .map((item) => ({
              dataIndex: item.dataIndex.map((di) => di.name ?? di),
              title: item.title,
            }));

          dn.emit('patch', {
            schema: {
              ['x-uid']: fieldSchema['x-uid'],
              'x-action-settings': fieldSchema['x-action-settings'],
            },
          });
          dn.refresh();
        }}
      />
      <SchemaSettingsDivider />
      <SchemaSettingsRemove
        removeParentsIfNoChildren
        breakRemoveOn={(s) => {
          return s['x-component'] === 'Space' || s['x-component'].endsWith('ActionBar');
        }}
        confirm={{
          title: t('Delete action'),
        }}
      />
    </GeneralSchemaDesigner>
  );
};
