/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { findAllPlugins, PluginManager } from '@nocobase/server';

export async function runPluginStaticImports() {
  const packages = await findAllPlugins();
  for (const name of packages) {
    const { packageName } = await PluginManager.parseName(name);
    try {
      const plugin = require(packageName);
      if (plugin && plugin.staticImport) {
        await plugin.staticImport();
      }
    } catch (error) {
      continue;
    }
  }
}
