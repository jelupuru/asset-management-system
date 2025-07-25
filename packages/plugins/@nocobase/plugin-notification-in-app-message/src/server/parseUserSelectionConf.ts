/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Repository } from '@nocobase/database';
export async function parseUserSelectionConf(
  userSelectionConfig: Array<Record<any, any> | string>,
  UserRepo: Repository,
) {
  const SelectionConfigs = userSelectionConfig.flat().filter(Boolean);
  const users = new Set<string>();
  for (const item of SelectionConfigs) {
    if (typeof item === 'object') {
      const result = await UserRepo.find({
        ...item,
        fields: ['id'],
      });
      result.forEach((item) => users.add(item.id));
    } else {
      users.add(item);
    }
  }

  return [...users];
}
