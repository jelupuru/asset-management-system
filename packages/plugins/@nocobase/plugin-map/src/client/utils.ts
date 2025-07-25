/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const getSource = (data: Record<string, any>, fields?: string[], type?: string) => {
  const res = fields?.reduce((obj, field, index) => {
    if (index === fields.length - 1 && (type === 'o2m' || type === 'm2m')) {
      return obj?.map((item) => item[field]).filter((v) => v !== null && v !== undefined);
    }
    return obj?.[field];
  }, data);
  return type === 'o2m' || type === 'm2m' ? res : [res];
};
