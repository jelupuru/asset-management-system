/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useCallback } from 'react';
import { CollectionCategoriesProvider, useAPIClient, useRequest } from '@nocobase/client';
import { Outlet } from 'react-router-dom';

export const CollectionMainProvider = (props) => {
  const api = useAPIClient();

  const coptions = {
    url: 'collectionCategories:list',
    params: {
      paginate: false,
      sort: ['sort'],
    },
  };

  const result = useRequest<{
    data: any;
  }>(coptions);

  const refreshCategory = useCallback(async () => {
    const { data } = await api.request(coptions);
    result.mutate(data);
    return data?.data || [];
  }, [result]);
  return (
    <CollectionCategoriesProvider service={result} refreshCategory={refreshCategory}>
      {<Outlet />}
    </CollectionCategoriesProvider>
  );
};
