/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { AvailableActionOptions } from '@nocobase/acl';

const availableActions: {
  [key: string]: AvailableActionOptions;
} = {
  create: {
    displayName: '{{t("Add new")}}',
    type: 'new-data',
    onNewRecord: true,
    aliases: ['create', 'firstOrCreate', 'updateOrCreate'],
    allowConfigureFields: true,
  },
  // import: {
  //   displayName: '{{t("Import")}}',
  //   type: 'new-data',
  //   scope: false,
  // },
  // export: {
  //   displayName: '{{t("Export")}}',
  //   type: 'old-data',
  //   allowConfigureFields: true,
  // },
  view: {
    displayName: '{{t("View")}}',
    type: 'old-data',
    aliases: ['get', 'list'],
    allowConfigureFields: true,
  },
  update: {
    displayName: '{{t("Edit")}}',
    type: 'old-data',
    aliases: ['update', 'move', 'add', 'set', 'remove', 'toggle'],
    allowConfigureFields: true,
  },
  destroy: {
    displayName: '{{t("Delete")}}',
    aliases: ['destroy'],
    type: 'old-data',
  },
};

export { availableActions };
