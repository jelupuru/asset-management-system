/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export async function bindMenuToRole({ schemaInstance, db, options }) {
  const { transaction } = options;
  const addNewMenuRoles = await db.getRepository('roles').find({
    filter: {
      allowNewMenu: true,
    },
  });

  for (const role of addNewMenuRoles) {
    await db.getRepository('roles.menuUiSchemas', role.get('name')).add({
      tk: schemaInstance.get('x-uid'),
      transaction,
    });
  }
}
