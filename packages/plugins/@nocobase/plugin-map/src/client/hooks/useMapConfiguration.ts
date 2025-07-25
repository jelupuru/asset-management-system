/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useRequest } from '@nocobase/client';
import { useMemo } from 'react';

export const MapConfigurationResourceKey = 'map-configuration';
export const getSSKey = (type) => {
  return `NOCOBASE_PLUGIN_MAP_CONFIGURATION_${type}`;
};

export const useMapConfiguration = (type: string) => {
  // cache
  const config = useMemo(() => {
    const d = sessionStorage.getItem(getSSKey(type));
    if (d) {
      return JSON.parse(d);
    }
    return d;
  }, [type]);

  const { data } = useRequest<{
    data: any;
  }>(
    {
      resource: MapConfigurationResourceKey,
      action: 'get',
      params: {
        type,
      },
    },
    {
      onSuccess(data) {
        sessionStorage.setItem(getSSKey(type), JSON.stringify(data?.data));
      },
      refreshOnWindowFocus: false,
      refreshDeps: [],
      manual: config ? true : false,
    },
  );

  if (config) return config;

  return data?.data;
};
