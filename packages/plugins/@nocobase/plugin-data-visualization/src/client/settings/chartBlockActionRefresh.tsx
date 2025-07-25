/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useContext } from 'react';
import { SchemaSettings, useDesignable } from '@nocobase/client';
import { useChartsTranslation } from '../locale';
import { AutoRefreshItem } from './AutoRefreshItem';
import { useField, useFieldSchema } from '@formily/react';
import { GlobalAutoRefreshContext } from '../block';

export const chartBlockActionRefreshSettings = new SchemaSettings({
  name: 'chartBlockActionSettings:refresh',
  items: [
    {
      name: 'refresh',
      Component: () => {
        const field = useField();
        const fieldSchema = useFieldSchema();
        const { dn } = useDesignable();
        const { setAutoRefresh } = useContext(GlobalAutoRefreshContext);
        return (
          <AutoRefreshItem
            value={field.decoratorProps?.autoRefresh || false}
            onChange={(v) => {
              setAutoRefresh(v);
              field.decoratorProps = {
                ...field.decoratorProps,
                autoRefresh: v,
              };
              fieldSchema['x-decorator-props'] = field.decoratorProps;
              dn.emit('patch', {
                schema: {
                  ['x-uid']: fieldSchema['x-uid'],
                  'x-decorator-props': field.decoratorProps,
                },
              });
              dn.refresh();
            }}
          />
        );
      },
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      name: 'delete',
      type: 'remove',
      useComponentProps() {
        const { t } = useChartsTranslation();
        return {
          removeParentsIfNoChildren: true,
          breakRemoveOn: (s) => {
            return s['x-component'] === 'Space' || s['x-component'].endsWith('ActionBar');
          },
          confirm: {
            title: t('Delete action'),
          },
        };
      },
    },
  ],
});
