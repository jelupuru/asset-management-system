/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ExtendCollectionsProvider, TableBlockProvider } from '@nocobase/client';
import React from 'react';
import { useAuditChangesCollection, useAuditLogsCollection, useCollectionsCollection } from './collections';

export const AuditLogsBlockProvider: React.FC = ({ children, ...restProps }) => {
  const auditChangesCollection = useAuditChangesCollection();
  const auditLogsCollection = useAuditLogsCollection();
  const collectionsCollection = useCollectionsCollection();

  return (
    <ExtendCollectionsProvider collections={[auditLogsCollection, auditChangesCollection, collectionsCollection]}>
      <TableBlockProvider name="audit-logs" {...restProps}>
        {children}
      </TableBlockProvider>
    </ExtendCollectionsProvider>
  );
};
