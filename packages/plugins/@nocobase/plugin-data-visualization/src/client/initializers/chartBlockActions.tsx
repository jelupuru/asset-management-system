/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaInitializer } from '@nocobase/client';
import { lang } from '../locale';
import { BlockRefreshActionInitializer } from './BlockRefreshAction';

export const chartBlockActionsInitializer = new SchemaInitializer({
  name: 'chartBlock:configureActions',
  title: lang('Configure actions'),
  icon: 'SettingOutlined',
  items: [
    {
      name: 'refresh',
      title: lang('Refresh'),
      Component: BlockRefreshActionInitializer,
    },
  ],
});
