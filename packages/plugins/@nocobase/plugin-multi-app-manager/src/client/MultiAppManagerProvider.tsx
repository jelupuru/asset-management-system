/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Icon, PinnedPluginListProvider, SchemaComponentOptions, useApp, useRequest } from '@nocobase/client';
import { Button, Dropdown } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppNameInput } from './AppNameInput';
import { useStyles } from './MultiAppManagerProvider.style';
import { usePluginUtils } from './utils';

const MultiAppManager = () => {
  const { styles } = useStyles();
  const { data, run } = useRequest<{
    data: any[];
  }>(
    {
      resource: 'applications',
      action: 'listPinned',
    },
    {
      manual: true,
    },
  );
  const { t } = usePluginUtils();
  const instance = useApp();
  const items = [
    ...(data?.data || []).map((app) => {
      let link = instance.getRouteUrl(`/apps/${app.name}/admin/`);
      if (app.cname) {
        link = `//${app.cname}`;
      }
      return {
        key: app.name,
        label: (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {app.displayName || app.name}
          </a>
        ),
      };
    }),
    {
      key: '.manager',
      label: (
        <Link to={instance.pluginSettingsManager.getRoutePath('multi-app-manager')}>{t('Manage applications')}</Link>
      ),
    },
  ];
  return (
    <Dropdown
      onOpenChange={(visible) => {
        run();
      }}
      menu={{ items }}
    >
      <Button className={styles.button} title={'Apps'} icon={<Icon type={'AppstoreOutlined'} />} />
    </Dropdown>
  );
};

export const MultiAppManagerProvider = (props) => {
  return (
    <PinnedPluginListProvider
      items={{
        am: { order: 201, component: 'MultiAppManager', pin: true },
      }}
    >
      <SchemaComponentOptions components={{ MultiAppManager, AppNameInput }}>{props.children}</SchemaComponentOptions>
    </PinnedPluginListProvider>
  );
};
