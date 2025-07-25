/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { GeneralSchemaDesigner, SchemaSettingsRemove } from '@nocobase/client';
import React from 'react';
import { useTranslation } from '../../../../locale';

export const SettingsDesigner = () => {
  const { t } = useTranslation();

  return (
    <GeneralSchemaDesigner>
      <SchemaSettingsRemove
        key="remove"
        removeParentsIfNoChildren
        confirm={{
          title: t('Delete settings block'),
        }}
        breakRemoveOn={{
          'x-component': 'Grid',
        }}
      />
    </GeneralSchemaDesigner>
  );
};
