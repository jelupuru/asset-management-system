/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const joinComma = (value: any[]) => {
  if (!value) return null;
  return `(${value.join(',')})`;
};

export const toValue = (value?: string) => {
  if (!value) return null;
  return JSON.parse(value.replace(/\(/g, '[').replace(/\)/g, ']'));
};

export const getDialect = (ctx) => {
  return (ctx.db || ctx.database).sequelize.getDialect();
};

export const isPg = (ctx) => {
  return getDialect(ctx) === 'postgres';
};

export const isSqlite = (ctx) => {
  return getDialect(ctx) === 'sqlite';
};

export const isMysql = (ctx) => {
  return getDialect(ctx) === 'mysql';
};
