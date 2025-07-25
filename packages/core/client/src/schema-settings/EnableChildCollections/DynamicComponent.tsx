/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { css } from '@emotion/css';
import { observer, useFieldSchema } from '@formily/react';
import React, { useEffect, useMemo } from 'react';
import { useCompile } from '../../schema-component';
import { Variable } from '.././../schema-component';
import { useCurrentFormVariable } from '../VariableInput/hooks/useFormVariable';
import { useCurrentObjectVariable } from '../VariableInput/hooks/useIterationVariable';

export const ChildDynamicComponent = observer(
  (props: { rootCollection: string; onChange; value; default; collectionField }) => {
    const { rootCollection, onChange, value, collectionField } = props;
    const fieldSchema = useFieldSchema();
    const { currentFormSettings } = useCurrentFormVariable({
      collectionName: rootCollection,
      collectionField,
    });
    const { currentObjectSettings } = useCurrentObjectVariable({
      schema: collectionField?.uiSchema,
      collectionField,
    });

    const compile = useCompile();
    const result = useMemo(
      () => [currentFormSettings, currentObjectSettings].filter(Boolean),
      [currentFormSettings, currentObjectSettings],
    );
    const scope = compile(result);
    useEffect(() => {
      onChange(fieldSchema.default);
    }, []);
    return (
      <Variable.Input
        value={value}
        onChange={(v) => onChange(v)}
        scope={scope}
        style={{ minWidth: '400px', marginRight: 15 }}
        className={css`
          .ant-input {
            width: 100% !important;
          }
        `}
      />
    );
  },
  { displayName: 'ChildDynamicComponent' },
);
