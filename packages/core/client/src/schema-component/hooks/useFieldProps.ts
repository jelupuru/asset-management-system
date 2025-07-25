/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useContext, useRef } from 'react';
import { Schema, SchemaExpressionScopeContext, SchemaOptionsContext } from '@formily/react';

export const useFieldProps = (schema: Schema) => {
  const options = useContext(SchemaOptionsContext);
  const scope = useContext(SchemaExpressionScopeContext);
  const scopeRef = useRef<any>();
  scopeRef.current = scope;
  return schema.toFieldProps({
    ...options,
    get scope() {
      return {
        ...options.scope,
        ...scopeRef.current,
      };
    },
  }) as any;
};
