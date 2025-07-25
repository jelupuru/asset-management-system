/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export interface PluginData {
  name?: string;
  packageName?: string;
  version?: string;
  preVersion?: string;
  registry?: string;
  clientUrl?: string;
  compressedFileUrl?: string;
  enabled?: boolean;
  type?: 'url' | 'npm' | 'upload';
  authToken?: string;
  installed?: boolean;
  builtIn?: boolean;
  options?: any;
}
