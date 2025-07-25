/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Space, Tabs, TabsProps } from 'antd-mobile';
import React, { FC, useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { DndContext, DndContextProps, Icon, SortableItem } from '@nocobase/client';
import { useMobileRoutes } from '../../../../mobile-providers';
import { useMobilePage } from '../../context';
import { MobilePageTabInitializer } from './initializer';
import { MobilePageTabsSettings } from './settings';
import { useStyles } from './styles';

export const MobilePageTabs: FC = () => {
  const { activeTabBarItem, resource, refresh } = useMobileRoutes();
  const { displayTabs = false } = useMobilePage();

  const navigate = useNavigate();
  const { componentCls, hashId } = useStyles();
  const { tabSchemaUid } = useParams<{ tabSchemaUid: string }>();
  const [activeKey, setActiveKey] = React.useState<string>(() => {
    return tabSchemaUid || activeTabBarItem?.children?.[0]?.schemaUid;
  });
  const handleChange: TabsProps['onChange'] = (schemaUid) => {
    setActiveKey(schemaUid);
    navigate(`/${activeTabBarItem.type}/${activeTabBarItem.schemaUid}/tabs/${schemaUid}`);
  };

  const handleDragEnd: DndContextProps['onDragEnd'] = useCallback(
    async (event) => {
      const { active, over } = event;
      const activeId = active?.id;
      const overId = over?.id;

      if (!activeId || !overId || activeId === overId) {
        return;
      }
      await resource.move({ sourceId: activeId, targetId: overId, sortField: 'sort' });
      await refresh();
    },
    [resource, refresh],
  );

  if (!activeTabBarItem) return <Navigate replace to="/" />;
  if (!displayTabs) return null;

  return (
    <div className={`${componentCls} ${hashId}`} data-testid="mobile-page-tabs">
      <DndContext onDragEnd={handleDragEnd}>
        <Tabs activeKey={activeKey} onChange={handleChange} className="nb-mobile-page-tabs-list">
          {activeTabBarItem.children?.map((item) => (
            <Tabs.Tab
              data-testid={`mobile-page-tabs-${item.title}`}
              title={
                <SortableItem id={item.id as any}>
                  <MobilePageTabsSettings tab={item} />
                  {item.icon ? (
                    <Space>
                      <Icon type={item.icon} />
                      {item.title}
                    </Space>
                  ) : (
                    item.title
                  )}
                </SortableItem>
              }
              key={String(item.schemaUid)}
            ></Tabs.Tab>
          ))}
        </Tabs>
      </DndContext>
      <div>
        <MobilePageTabInitializer />
      </div>
    </div>
  );
};
