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
import { useChartsTranslation } from '../locale';

export const ChartFilterBlockDesigner: React.FC = () => {
  const { t } = useChartsTranslation();
  return (
    <GeneralSchemaDesigner disableInitializer title={t('Filter')} showDataSource={false}>
      {/* <SchemaSettings.BlockTitleItem /> */}
      {/* <SchemaSettings.Divider /> */}
      <SchemaSettingsRemove
        breakRemoveOn={{
          'x-component': 'ChartV2Block',
        }}
      />
    </GeneralSchemaDesigner>
  );
};
