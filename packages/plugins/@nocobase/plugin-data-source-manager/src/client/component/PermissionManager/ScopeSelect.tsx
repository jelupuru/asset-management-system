/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createForm } from '@formily/core';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { FormProvider, SchemaComponent, useCollectionRecord, useRecord } from '@nocobase/client';
import { getScopesSchema } from './schemas/scopes';

const RolesResourcesScopesSelectedRowKeysContext = createContext(null);
RolesResourcesScopesSelectedRowKeysContext.displayName = 'RolesResourcesScopesSelectedRowKeysContext';

const RolesResourcesScopesSelectedRowKeysProvider: React.FC = (props) => {
  const [keys, setKeys] = useState([]);
  return (
    <RolesResourcesScopesSelectedRowKeysContext.Provider value={[keys, setKeys]}>
      {props.children}
    </RolesResourcesScopesSelectedRowKeysContext.Provider>
  );
};

export const useRolesResourcesScopesSelectedRowKeys = () => {
  return useContext(RolesResourcesScopesSelectedRowKeysContext);
};

export const ScopeSelect = (props) => {
  const form = useMemo(
    () =>
      createForm({
        values: {
          scope: props.value,
        },
      }),
    [],
  );

  const { key } = useCollectionRecord()?.parentRecord.data || ({} as any);
  const scopesSchema = getScopesSchema(key);
  return (
    <FormProvider form={form}>
      <SchemaComponent
        components={{ RolesResourcesScopesSelectedRowKeysProvider }}
        scope={{
          onChange(value) {
            props?.onChange?.(value);
          },
        }}
        schema={scopesSchema}
      />
    </FormProvider>
  );
};
