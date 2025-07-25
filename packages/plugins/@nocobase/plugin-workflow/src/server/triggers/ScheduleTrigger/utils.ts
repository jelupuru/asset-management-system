/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const SCHEDULE_MODE = {
  STATIC: 0,
  DATE_FIELD: 1,
} as const;

export function parseDateWithoutMs(date: string) {
  return Math.floor(Date.parse(date) / 1000) * 1000;
}
