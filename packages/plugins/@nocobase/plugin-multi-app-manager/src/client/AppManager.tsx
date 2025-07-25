/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaComponent, useApp, useRecord } from '@nocobase/client';
import { Card } from 'antd';
import React from 'react';
import { schema } from './settings/schemas/applications';
import { usePluginUtils } from './utils';

const useLink = () => {
  const record = useRecord();
  const app = useApp();
  if (record.cname) {
    return `//${record.cname}`;
  }
  return app.getRouteUrl(`/apps/${record.name}/admin/`);
};

const AppVisitor = () => {
  const { t } = usePluginUtils();
  const link = useLink();
  return (
    <a href={link} target={'_blank'} rel="noreferrer">
      {t('View', { ns: 'client' })}
    </a>
  );
};

export const AppManager = () => {
  return (
    <Card bordered={false}>
      <SchemaComponent schema={schema} components={{ AppVisitor }} />
    </Card>
  );
};
