/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { LinkOutlined } from '@ant-design/icons';
import { css, useApp } from '@nocobase/client';
import { Button } from 'antd';
import React from 'react';
import { useTranslation } from '../locale';

export const OpenInNewTab = () => {
  const { t } = useTranslation();
  const app = useApp();

  const onOpenInNewTab = () => {
    window.open(app.getRouteUrl('/mobile'));
  };

  return (
    <div
      className={css`
        position: absolute;
        top: -40px;
        right: 0;
      `}
    >
      <Button type="dashed" onClick={onOpenInNewTab} icon={<LinkOutlined />}>
        {t('Preview')}
      </Button>
    </div>
  );
};
