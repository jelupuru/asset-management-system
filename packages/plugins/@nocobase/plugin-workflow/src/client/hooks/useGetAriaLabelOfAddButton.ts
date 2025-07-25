/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useCallback } from 'react';

export const useGetAriaLabelOfAddButton = (
  data: {
    type: string;
    title: string;
  },
  branchIndex?: number,
) => {
  const getAriaLabel = useCallback(
    (postfix?: string) => {
      return ['add-button', data?.type, data?.title, branchIndex != null ? String(branchIndex) : '', postfix]
        .filter(Boolean)
        .join('-');
    },
    [branchIndex, data?.title, data?.type],
  );

  return { getAriaLabel };
};
