/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useTranslation } from 'react-i18next';

export const usePluginUtils = () => {
  const { t } = useTranslation('multi-app-share-collection');

  return { t };
};

export const i18nText = (text) => {
  return `{{t("${text}", { ns: 'multi-app-share-collection' })}}`;
};
