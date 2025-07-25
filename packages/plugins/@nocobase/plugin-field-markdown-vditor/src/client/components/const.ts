/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { usePlugin } from '@nocobase/client';
import { PluginFieldMarkdownVditorClient } from '../';

export const useCDN = () => {
  const plugin = usePlugin(PluginFieldMarkdownVditorClient);
  if (!plugin.dependencyLoaded) {
    plugin.initVditorDependency();
    plugin.dependencyLoaded = true;
  }
  return plugin.getCDN();
};
