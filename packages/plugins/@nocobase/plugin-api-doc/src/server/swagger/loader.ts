/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { requireModule } from '@nocobase/utils';
import { merge } from './merge';

export const loadSwagger = (packageName: string) => {
  const prefixes = ['src', 'lib', 'dist'];
  const targets = ['swagger.json', 'swagger/index.json', 'swagger'];
  for (const prefix of prefixes) {
    for (const dict of targets) {
      try {
        const file = `${packageName}/${prefix}/${dict}`;
        const filePath = require.resolve(file);
        delete require.cache[filePath];
        return requireModule(file);
      } catch (error) {
        //
      }
    }
  }
  return {};
};

export const getPluginsSwagger = async (db: any, pluginNames?: string[]) => {
  const nameFilter = pluginNames?.length ? { name: { $in: pluginNames } } : {};
  const plugins = await db.getRepository('applicationPlugins').find({
    filter: {
      enabled: true,
      ...nameFilter,
    },
  });
  const swaggers = {};
  for (const plugin of plugins) {
    const packageName = plugin.get('packageName');
    if (!packageName) {
      continue;
    }
    const res = loadSwagger(packageName);
    if (Object.keys(res).length) {
      swaggers[plugin.get('name')] = res;
    }
  }

  return swaggers;
};

export const mergeObjects = (objs: any[]) => {
  return objs.reduce((cur, obj) => {
    return merge(cur, obj);
  }, {});
};

export const getSwaggerDocument = async (db: any, pluginNames?: string[]) => {
  const swaggers = await getPluginsSwagger(db, pluginNames);
  return mergeObjects(Object.values(swaggers));
};
