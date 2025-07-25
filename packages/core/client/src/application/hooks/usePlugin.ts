/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '../Plugin';
import { useApp } from './useApp';

export function usePlugin<T extends typeof Plugin = any>(plugin: T): InstanceType<T>;
export function usePlugin<T extends {}>(name: string): T;
export function usePlugin(name: any) {
  const app = useApp();
  return app.pm.get(name);
}
