/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import {
  ExtendCollectionsProvider,
  SchemaComponent,
  usePlugin,
  SchemaComponentContext,
  useSchemaComponentContext,
} from '@nocobase/client';
import React, { useMemo } from 'react';
import PluginPublicFormsClient from '..';
import { publicFormsCollection } from '../collections';
import { useDeleteActionProps, useEditFormProps, useSubmitActionProps } from '../hooks';
import { publicFormsSchema } from '../schemas';

export const AdminPublicFormList = () => {
  const plugin = usePlugin(PluginPublicFormsClient);
  const scCtx = useSchemaComponentContext();
  const formTypes = useMemo(() => plugin.getFormTypeOptions(), [plugin]);
  return (
    <ExtendCollectionsProvider collections={[publicFormsCollection]}>
      <SchemaComponentContext.Provider value={{ ...scCtx, designable: false }}>
        <SchemaComponent
          schema={publicFormsSchema}
          scope={{ formTypes, useSubmitActionProps, useEditFormProps, useDeleteActionProps }}
        />
      </SchemaComponentContext.Provider>
    </ExtendCollectionsProvider>
  );
};
