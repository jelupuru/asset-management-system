/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useAPIClient, useCurrentUserContext } from '@nocobase/client';
import { error } from '@nocobase/utils/client';
import { useCallback } from 'react';

export function useUpdateThemeSettings() {
  const api = useAPIClient();
  const currentUser = useCurrentUserContext();

  const updateUserThemeSettings = useCallback(
    async (themeId: number | null) => {
      if (themeId === currentUser.data.data.systemSettings?.themeId) {
        return;
      }
      try {
        await api.resource('users').updateTheme({
          values: {
            themeId,
          },
        });
        currentUser.mutate({
          data: {
            ...currentUser.data.data,
            systemSettings: {
              ...(currentUser.data.data.systemSettings || {}),
              themeId,
            },
          },
        });
      } catch (err) {
        error(err);
      }
    },
    [api, currentUser],
  );

  return { updateUserThemeSettings };
}
