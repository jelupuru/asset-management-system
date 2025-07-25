/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { DragOutlined } from '@ant-design/icons';
import { useFieldSchema } from '@formily/react';
import { Space } from 'antd';
import React from 'react';
import { DragHandler, useDesignable } from '../..';
import { useSchemaSettingsRender } from '../../../application/schema-settings/hooks/useSchemaSettingsRender';
import { SchemaToolbarProvider } from '../../../application/schema-toolbar/context';
import { SchemaToolbar } from '../../../schema-settings/GeneralSchemaDesigner';
import { useGetAriaLabelOfDesigner } from '../../../schema-settings/hooks/useGetAriaLabelOfDesigner';

export const PageDesigner = ({ title }) => {
  const { designable } = useDesignable();

  if (!designable) {
    return null;
  }

  return (
    <SchemaToolbarProvider title={title}>
      <SchemaToolbar settings="PageSettings" showBorder={false} />
    </SchemaToolbarProvider>
  );
};

export const PageTabDesigner = ({ schema }) => {
  const { designable } = useDesignable();
  const { getAriaLabel } = useGetAriaLabelOfDesigner();
  const fieldSchema = useFieldSchema();
  const { render } = useSchemaSettingsRender(
    fieldSchema['x-settings'] || 'PageTabSettings',
    fieldSchema['x-settings-props'],
  );
  if (!designable) {
    return null;
  }
  return (
    <SchemaToolbarProvider schema={schema}>
      <div className={'general-schema-designer'}>
        <div className={'general-schema-designer-icons'}>
          <Space size={3} align={'center'}>
            <DragHandler>
              <DragOutlined style={{ marginRight: 0 }} role="button" aria-label={getAriaLabel('drag-handler', 'tab')} />
            </DragHandler>
            {render()}
          </Space>
        </div>
      </div>
    </SchemaToolbarProvider>
  );
};
