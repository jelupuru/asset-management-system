/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { UiSchemaRepository } from '../../repository';

export async function removeParentsIfNoChildren({ schemaInstance, db, options, params }) {
  const { transaction, oldParentUid } = options;
  const uiSchemaRepository: UiSchemaRepository = db.getRepository('uiSchemas');
  await uiSchemaRepository.recursivelyRemoveIfNoChildren({
    transaction,
    uid: oldParentUid,
    breakRemoveOn: params?.breakRemoveOn,
  });
}
