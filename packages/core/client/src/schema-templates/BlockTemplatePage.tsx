/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { PageHeader as AntdPageHeader } from '@ant-design/pro-layout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaComponent } from '../schema-component';
import { uiSchemaTemplatesSchema } from './schemas/uiSchemaTemplates';

export const BlockTemplatePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <AntdPageHeader style={{ backgroundColor: 'white' }} ghost={false} title={t('Block templates')} />
      <div style={{ margin: 'var(--nb-spacing)' }}>
        <SchemaComponent schema={uiSchemaTemplatesSchema} />
      </div>
    </div>
  );
};

export const BlockTemplatesPane = () => {
  return <SchemaComponent schema={uiSchemaTemplatesSchema} />;
};
