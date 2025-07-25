/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const CACHE_KEY = 'localization:texts';

export const NAMESPACE_PREFIX = 'lm-';
export const NAMESPACE_MENUS = `${NAMESPACE_PREFIX}menus`;
export const NAMESPACE_COLLECTIONS = `${NAMESPACE_PREFIX}collections`;
export const EXTEND_MODULES = [
  {
    value: NAMESPACE_MENUS,
    label: 'Menu',
  },
  {
    value: NAMESPACE_COLLECTIONS,
    label: 'Collections & Fields',
  },
];
