/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useApp } from '@nocobase/client';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import pkg from './../../package.json';

export const NAMESPACE = 'public-forms';

export function useT() {
  const app = useApp();
  return (str: string) => app.i18n.t(str, { ns: [pkg.name, 'client'] });
}

export function tStr(key: string) {
  return `{{t(${JSON.stringify(key)}, { ns: ['${pkg.name}', 'client'], nsMode: 'fallback' })}}`;
}

export function usePublicFormTranslation() {
  return useTranslation([NAMESPACE, 'client'], {
    nsMode: 'fallback',
  });
}
