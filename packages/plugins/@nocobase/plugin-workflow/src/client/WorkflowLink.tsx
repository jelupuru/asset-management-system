/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useActionContext, useGetAriaLabelOfAction, useRecord } from '@nocobase/client';

import { getWorkflowDetailPath } from './utils';

export const WorkflowLink = () => {
  const { t } = useTranslation();
  const { id } = useRecord();
  const { setVisible } = useActionContext();
  const { getAriaLabel } = useGetAriaLabelOfAction('Configure');

  return (
    <Link aria-label={getAriaLabel()} to={getWorkflowDetailPath(id)} onClick={() => setVisible(false)}>
      {t('Configure')}
    </Link>
  );
};
