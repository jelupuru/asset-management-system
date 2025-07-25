/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useCollectionRecord, useResourceActionContext, useAPIClient } from '@nocobase/client';
export function useSendAction() {
  const { data }: any = useCollectionRecord();

  const apiClient = useAPIClient();
  return {
    async run() {
      await apiClient.request({
        url: 'messages:send',
        method: 'post',
        data: {
          id: data.id,
        },
      });
    },
  };
}
