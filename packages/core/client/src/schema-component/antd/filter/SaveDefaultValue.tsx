/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { css } from '@emotion/css';
import { useFieldSchema, useForm } from '@formily/react';
import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDesignable } from '../../hooks';

export const SaveDefaultValue = (props) => {
  const { t } = useTranslation();
  const { designable, dn, refresh } = useDesignable();
  const fieldSchema = useFieldSchema();
  const form = useForm();
  if (!designable) {
    return null;
  }
  return (
    <Button
      className={css`
        border-color: var(--colorSettings);
        color: var(--colorSettings);
      `}
      type={'dashed'}
      onClick={() => {
        const filterSchema = fieldSchema?.parent?.parent?.parent?.properties?.filter;
        if (!filterSchema) {
          return;
        }
        const defaultValue = form.values.filter;
        dn.emit('patch', {
          schema: {
            'x-uid': filterSchema['x-uid'],
            default: defaultValue,
          },
        });
        dn.refresh();
        filterSchema.default = defaultValue;
        console.log('filterSchema', defaultValue);
      }}
    >
      {t('Save conditions')}
    </Button>
  );
};
