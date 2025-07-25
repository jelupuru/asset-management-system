/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export { BackButtonUsedInSubPage, useBackButton } from './BackButtonUsedInSubPage';
export * from './Page';
export * from './Page.Settings';
export { PagePopups, useCurrentPopupContext } from './PagePopups';
export { getPopupPathFromParams, getStoredPopupContext, storePopupContext, withSearchParams } from './pagePopupUtils';
export * from './PageTab.Settings';
export { PopupSettingsProvider, usePopupSettings } from './PopupSettingsProvider';
