/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useApp } from '@nocobase/client';
import { Card, Form, Input } from 'antd';
import React, { useMemo } from 'react';
import { useTranslation } from '../locale';

export const AppConfiguration = () => {
  const app = useApp();
  const { t } = useTranslation();
  const targetUrl = useMemo(() => {
    return app.getRouteUrl('/mobile');
  }, [app]);
  return (
    <Card
      style={{
        minHeight: '600px',
      }}
    >
      <Form layout="vertical">
        <Form.Item
          tooltip={`${t('The full address is')} ${window.origin}${targetUrl}`}
          label={t('Mobile client access address')}
        >
          <Input value={targetUrl} disabled />
        </Form.Item>
      </Form>
    </Card>
  );
};
