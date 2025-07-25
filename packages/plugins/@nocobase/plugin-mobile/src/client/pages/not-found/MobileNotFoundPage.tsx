/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Result } from 'antd';
import { Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { usePluginTranslation } from '../../locale';

export const MobileNotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = usePluginTranslation();
  return (
    <Result
      status="404"
      title="404"
      subTitle={t('Sorry, the page you visited does not exist.')}
      extra={
        <Button onClick={() => navigate('/', { replace: true })} color="primary" fill="solid">
          {t('Back Home')}
        </Button>
      }
    />
  );
};
