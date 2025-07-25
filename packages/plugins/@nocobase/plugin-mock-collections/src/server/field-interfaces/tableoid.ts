/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const tableoid = {
  options: () => ({
    name: '__collection',
    type: 'virtual',
    uiSchema: {
      type: 'string',
      title: '{{t("Table OID")}}',
      'x-component': 'CollectionSelect',
      'x-component-props': {
        isTableOid: true,
      },
      'x-read-pretty': true,
    },
  }),
};
