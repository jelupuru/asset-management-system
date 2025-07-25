/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useCallback, useMemo } from 'react';

/**
 * Used to get the DOM container for rendering popups or subpages.
 * @returns
 */
export const usePopupOrSubpagesContainerDOM = () => {
  const containerDOM: HTMLElement = useMemo(
    () => document.querySelector('.nb-subpages-slot-without-header-and-side'),
    [],
  );
  const getContainerDOM = useCallback(() => containerDOM, [containerDOM]);

  return { getContainerDOM };
};
