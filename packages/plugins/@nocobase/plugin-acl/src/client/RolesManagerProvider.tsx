/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createContext } from 'react';

export interface Role {
  createdAt: string;
  updatedAt: string;
  name: string;
  title: string;
  description: string;
  strategy: {
    actions: string[];
  };
  default: boolean;
  hidden: boolean;
  allowConfigure: boolean;
  allowNewMenu: boolean;
  snippets: string[];
}

export const RolesManagerContext = createContext<{
  role: Role;
  setRole: (role: Role) => void;
}>({
  role: null,
} as any);
RolesManagerContext.displayName = 'RolesManagerContext';
