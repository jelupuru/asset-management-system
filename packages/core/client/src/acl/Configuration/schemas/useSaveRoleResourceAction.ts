/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useForm } from '@formily/react';
import { useActionContext, useAPIClient, useRecord, useResourceActionContext } from '../../../';

export const useSaveRoleResourceAction = () => {
  const form = useForm();
  const api = useAPIClient();
  const record = useRecord();
  const ctx = useActionContext();
  const { refresh } = useResourceActionContext();
  return {
    async run() {
      await api.resource('roles.resources', record.roleName)[record.exists ? 'update' : 'create']({
        filterByTk: record.name,
        values: {
          ...form.values,
          name: record.name,
        },
      });
      ctx.setVisible(false);
      refresh();
    },
  };
};
