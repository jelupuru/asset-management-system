/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { useField, Schema } from '@formily/react';
import { Field } from '@formily/core';
import { useUsersTranslation } from './locale';
import { Tag } from 'antd';

export const UserRolesField: React.FC = () => {
  const { t } = useUsersTranslation();
  const field = useField<Field>();
  return (field.value || []).map((role: { name: string; title: string }) => (
    <Tag key={role.name}>{Schema.compile(role.title, { t })}</Tag>
  ));
};
