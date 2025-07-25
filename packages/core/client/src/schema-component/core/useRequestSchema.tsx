/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useRequest } from '../../api-client';

export const useRequestSchema = ({
  uid,
  type = 'getJsonSchema',
  onSuccess,
}: {
  uid: string;
  type?: 'getProperties' | 'getJsonSchema';
  onSuccess?: (data: any) => void;
}) => {
  const conf = {
    url: `/uiSchemas:${type}/${uid}`,
  };
  const { data, loading } = useRequest<{
    data: any;
  }>(conf, {
    refreshDeps: [uid],
    onSuccess(data) {
      onSuccess && onSuccess(data);
    },
  });

  return { schema: data?.data, loading };
};
