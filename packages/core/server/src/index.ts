/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export * from './app-supervisor';
export * from './application';
export { Application as default } from './application';
export * from './gateway';
export * as middlewares from './middlewares';
export * from './migration';
export * from './plugin';
export * from './plugin-manager';
export * from './audit-manager';
export * from './pub-sub-manager';
export const OFFICIAL_PLUGIN_PREFIX = '@nocobase/plugin-';

export {
  appendToBuiltInPlugins,
  findAllPlugins,
  findBuiltInPlugins,
  findLocalPlugins,
  packageNameTrim,
} from './plugin-manager/findPackageNames';

export { runPluginStaticImports } from './run-plugin-static-imports';
