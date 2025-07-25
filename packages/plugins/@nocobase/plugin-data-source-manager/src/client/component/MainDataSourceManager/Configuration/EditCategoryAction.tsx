/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useForm } from '@formily/react';
import { cloneDeep } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import {
  useAPIClient,
  useRequest,
  RecordProvider,
  useRecord,
  ActionContextProvider,
  SchemaComponent,
  useActionContext,
  useCompile,
  useResourceActionContext,
  useCancelAction,
  CollectionCategoriesContext,
} from '@nocobase/client';
import { collectionCategoryEditSchema } from './schemas/collections';

const useEditCategry = () => {
  const form = useForm();
  const ctx = useActionContext();
  const { refresh } = useContext(CollectionCategoriesContext);
  const { refresh: refreshCM } = useResourceActionContext();

  const api = useAPIClient();
  const { id } = useRecord();
  return {
    async run() {
      await form.submit();
      const values = cloneDeep(form.values);
      await api.resource('collectionCategories').update({
        filter: { id: id },
        values: {
          ...values,
        },
      });
      ctx.setVisible(false);
      await form.reset();
      await refresh();
      await refreshCM();
    },
  };
};

const useValuesFromRecord = (options) => {
  const record = useRecord();
  const result = useRequest(() => Promise.resolve({ data: cloneDeep(record) }), {
    ...options,
    manual: true,
  });
  const ctx = useActionContext();
  useEffect(() => {
    if (ctx.visible) {
      result.run();
    }
  }, [ctx.visible]);
  return result;
};

export const EditCategory = (props) => {
  return <EditCategoryAction {...props} />;
};

export const EditCategoryAction = (props) => {
  const { scope, getContainer, item, children } = props;
  const [visible, setVisible] = useState(false);
  const compile = useCompile();
  return (
    <RecordProvider record={item}>
      <ActionContextProvider value={{ visible, setVisible }}>
        <>{children || <span onClick={() => setVisible(true)}>{compile('{{ t("Edit category") }}')}</span>}</>
        <SchemaComponent
          schema={collectionCategoryEditSchema}
          scope={{
            getContainer,
            useCancelAction,
            createOnly: true,
            useEditCategry,
            useValuesFromRecord,
            ...scope,
          }}
        />
      </ActionContextProvider>
    </RecordProvider>
  );
};
