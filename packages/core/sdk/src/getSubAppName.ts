/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

const getSubAppName = (publicPath = '/') => {
  const prefix = `${publicPath}apps/`;
  if (!window.location.pathname.startsWith(prefix)) {
    return;
  }
  const pathname = window.location.pathname.substring(prefix.length);
  const args = pathname.split('/', 1);
  return args[0] || '';
};

export default getSubAppName;
