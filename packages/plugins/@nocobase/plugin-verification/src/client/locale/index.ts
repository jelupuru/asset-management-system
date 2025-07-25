/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { i18n } from '@nocobase/client';
import { useTranslation } from 'react-i18next';

export const NAMESPACE = 'verification';

// i18n.addResources('zh-CN', NAMESPACE, zhCN);

export function lang(key: string) {
  return i18n.t(key, { ns: NAMESPACE });
}

export function useVerificationTranslation() {
  return useTranslation(NAMESPACE);
}
