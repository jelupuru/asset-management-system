/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { BlockItemCard } from '@nocobase/client';
import { Result } from 'antd';
import { usePublicFormTranslation, NAMESPACE } from '../locale';

export const UnEnabledFormPlaceholder = () => {
  const { t } = usePublicFormTranslation();

  return (
    <BlockItemCard style={{ boxShadow: 'unset' }}>
      <Result status="403" subTitle={t(`The form is not enabled and cannot be accessed`, { ns: NAMESPACE })} />
    </BlockItemCard>
  );
};

export const UnFoundFormPlaceholder = () => {
  const { t } = usePublicFormTranslation();

  return (
    <BlockItemCard style={{ boxShadow: 'unset' }}>
      <Result status="404" />
    </BlockItemCard>
  );
};
