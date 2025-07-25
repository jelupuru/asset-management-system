/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ArrayBase } from '@formily/antd-v5';
import { Switch } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AsDefaultTemplate = React.forwardRef((props: any, ref) => {
  const array = ArrayBase.useArray();
  const index = ArrayBase.useIndex(props.index);
  const { t } = useTranslation();

  return (
    <Switch
      {...props}
      checkedChildren={t('Default')}
      unCheckedChildren={t('Default')}
      checked={array?.field?.value[index].default}
      style={{
        transition: 'all 0.25s ease-in-out',
        color: 'rgba(0, 0, 0, 0.8)',
        fontSize: 16,
        marginLeft: 6,
        marginBottom: 3,
      }}
      onChange={(checked, e) => {
        e.stopPropagation();
        array.field.value.splice(index, 1, { ...array?.field?.value[index], default: checked });
        array.field.value.forEach((item, i) => {
          if (i !== index) {
            array.field.value.splice(i, 1, { ...array?.field?.value[i], default: false });
          }
        });
      }}
      onClick={(checked, e) => {
        e.stopPropagation();
      }}
    />
  );
});
AsDefaultTemplate.displayName = 'AsDefaultTemplate';
