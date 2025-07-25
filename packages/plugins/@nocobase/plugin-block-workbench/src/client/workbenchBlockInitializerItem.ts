/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaInitializerItemType, useSchemaInitializer } from '@nocobase/client';
import { useTranslation } from 'react-i18next';
import { blockSchema } from './blockSchema';

export const workbenchBlockInitializerItem: SchemaInitializerItemType = {
  type: 'item',
  name: 'workbenchBlock',
  icon: 'AppstoreAddOutlined',
  useComponentProps() {
    const { t } = useTranslation('@nocobase/plugin-block-workbench');
    const { insert } = useSchemaInitializer();
    return {
      title: t('Action panel'),
      onClick: () => {
        insert(blockSchema);
      },
    };
  },
};
