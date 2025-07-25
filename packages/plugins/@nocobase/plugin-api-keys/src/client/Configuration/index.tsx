/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { NocoBaseRecursionField, SchemaComponentOptions, useCurrentRoles } from '@nocobase/client';
import React from 'react';
import { ExpiresSelect } from './ExpiresSelect';
import { configurationSchema } from './schema';

export const Configuration = () => {
  const currentRoles = useCurrentRoles();
  return (
    <SchemaComponentOptions scope={{ currentRoles }} components={{ ExpiresSelect }}>
      <NocoBaseRecursionField schema={configurationSchema} />
    </SchemaComponentOptions>
  );
};
