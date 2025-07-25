/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useRef, useEffect } from 'react';

interface IRecycleTarget {
  onMount: () => void;
  onUnmount: () => void;
}

export const useAttach = <T extends IRecycleTarget>(target: T): T => {
  const oldTargetRef = useRef<IRecycleTarget>(null);
  useEffect(() => {
    if (oldTargetRef.current && target !== oldTargetRef.current) {
      oldTargetRef.current.onUnmount();
    }
    oldTargetRef.current = target;
    target.onMount();
    return () => {
      target.onUnmount();
    };
  }, [target]);
  return target;
};
