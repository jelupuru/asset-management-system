/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { PlusOutlined } from '@ant-design/icons';
import { PageHeader as AntdPageHeader } from '@ant-design/pro-layout';
import { css } from '@emotion/css';
import { FormLayout } from '@formily/antd-v5';
import { Schema, SchemaOptionsContext, useFieldSchema } from '@formily/react';
import { Button, Tabs } from 'antd';
import classNames from 'classnames';
import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, Outlet, useOutletContext } from 'react-router-dom';
import { FormDialog } from '..';
import { antTableCell } from '../../../acl/style';
import { useRequest } from '../../../api-client';
import {
  CurrentTabUidContext,
  useCurrentSearchParams,
  useCurrentTabUid,
  useNavigateNoUpdate,
  useRouterBasename,
} from '../../../application/CustomRouterContextProvider';
import { useDocumentTitle } from '../../../document-title';
import { useGlobalTheme } from '../../../global-theme';
import { Icon } from '../../../icon';
import { KeepAliveProvider, useKeepAlive } from '../../../route-switch/antd/admin-layout/KeepAlive';
import { useGetAriaLabelOfSchemaInitializer } from '../../../schema-initializer/hooks/useGetAriaLabelOfSchemaInitializer';
import { DndContext } from '../../common';
import { SortableItem } from '../../common/sortable-item';
import { SchemaComponent, SchemaComponentOptions } from '../../core';
import { useDesignable } from '../../hooks';
import { useToken } from '../__builtins__';
import { ErrorFallback } from '../error-fallback';
import { useStyles } from './Page.style';
import { PageDesigner, PageTabDesigner } from './PageTabDesigner';

interface PageProps {
  className?: string;
}

const InternalPage = React.memo((props: PageProps) => {
  const { t } = useTranslation();
  const fieldSchema = useFieldSchema();
  const dn = useDesignable();
  const { theme } = useGlobalTheme();
  const { getAriaLabel } = useGetAriaLabelOfSchemaInitializer();
  const currentTabUid = useCurrentTabUid();
  const basenameOfCurrentRouter = useRouterBasename();
  const disablePageHeader = fieldSchema['x-component-props']?.disablePageHeader;
  const enablePageTabs = fieldSchema['x-component-props']?.enablePageTabs;
  const options = useContext(SchemaOptionsContext);
  const navigate = useNavigateNoUpdate();
  const searchParams = useCurrentSearchParams();
  const loading = false;
  const activeKey = useMemo(
    // 处理 searchParams 是为了兼容旧版的 tab 参数
    () => currentTabUid || searchParams.get('tab') || Object.keys(fieldSchema.properties || {}).shift(),
    [fieldSchema.properties, searchParams, currentTabUid],
  );
  const { token } = useToken();

  // 这里的样式是为了保证页面 tabs 标签下面的分割线和页面内容对齐（页面内边距可以通过主题编辑器调节）
  const tabBarStyle = useMemo(
    () => ({
      paddingLeft: token.paddingLG - token.paddingPageHorizontal,
      paddingRight: token.paddingLG - token.paddingPageHorizontal,
      marginLeft: token.paddingPageHorizontal - token.paddingLG,
      marginRight: token.paddingPageHorizontal - token.paddingLG,
    }),
    [token.paddingLG, token.paddingPageHorizontal],
  );

  const handleTabsChange = useCallback(
    (activeKey: string): void => {
      navigateToTab({ activeKey, navigate, basename: basenameOfCurrentRouter });
    },
    [basenameOfCurrentRouter, navigate],
  );

  const tabBarExtraContent = useMemo(() => {
    return (
      dn.designable && (
        <Button
          aria-label={getAriaLabel('tabs')}
          icon={<PlusOutlined />}
          className={'addTabBtn'}
          type={'dashed'}
          onClick={async () => {
            const values = await FormDialog(
              t('Add tab'),
              () => {
                return (
                  <SchemaComponentOptions scope={options.scope} components={{ ...options.components }}>
                    <FormLayout layout={'vertical'}>
                      <SchemaComponent
                        schema={{
                          properties: {
                            title: {
                              title: t('Tab name'),
                              'x-component': 'Input',
                              'x-decorator': 'FormItem',
                              required: true,
                            },
                            icon: {
                              title: t('Icon'),
                              'x-component': 'IconPicker',
                              'x-decorator': 'FormItem',
                            },
                          },
                        }}
                      />
                    </FormLayout>
                  </SchemaComponentOptions>
                );
              },
              theme,
            ).open({
              initialValues: {},
            });
            const { title, icon } = values;
            dn.insertBeforeEnd({
              type: 'void',
              title,
              'x-icon': icon,
              'x-component': 'Grid',
              'x-initializer': 'page:addBlock',
              properties: {},
            });
          }}
        >
          {t('Add tab')}
        </Button>
      )
    );
  }, [dn, getAriaLabel, options?.components, options?.scope, t, theme]);

  const items = useMemo(() => {
    return fieldSchema.mapProperties((schema) => {
      return {
        label: (
          <SortableItem
            id={schema.name as string}
            schema={schema}
            className={classNames('nb-action-link', 'designerCss', props.className)}
          >
            {schema['x-icon'] && <Icon style={{ marginRight: 8 }} type={schema['x-icon']} />}
            <span>{schema.title || t('Unnamed')}</span>
            <PageTabDesigner schema={schema} />
          </SortableItem>
        ),
        key: schema.name as string,
      };
    });
  }, [fieldSchema, props.className, t, fieldSchema.mapProperties((schema) => schema.title || t('Unnamed')).join()]);

  const footer = useMemo(() => {
    return enablePageTabs ? (
      <DndContext>
        <Tabs
          size={'small'}
          activeKey={activeKey}
          tabBarStyle={tabBarStyle}
          onChange={handleTabsChange}
          tabBarExtraContent={tabBarExtraContent}
          items={items}
        />
      </DndContext>
    ) : null;
  }, [activeKey, enablePageTabs, handleTabsChange, items, tabBarExtraContent, tabBarStyle]);

  const outletContext = useMemo(
    () => ({ loading, disablePageHeader, enablePageTabs, fieldSchema, tabUid: currentTabUid }),
    [currentTabUid, disablePageHeader, enablePageTabs, fieldSchema, loading],
  );

  return (
    <>
      <NocoBasePageHeader footer={footer} />
      <div className="nb-page-wrapper">
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
          {currentTabUid ? (
            // used to match the rout with name "admin.page.tab"
            <Outlet context={outletContext} />
          ) : (
            <>
              <PageContent
                loading={loading}
                disablePageHeader={disablePageHeader}
                enablePageTabs={enablePageTabs}
                fieldSchema={fieldSchema}
                activeKey={activeKey}
              />
              {/* Used to match the route with name "admin.page.popup" */}
              <Outlet />
            </>
          )}
        </ErrorBoundary>
      </div>
    </>
  );
});

const hiddenStyle = {
  transform: 'translateX(100%)',
};

export const Page = React.memo((props: PageProps) => {
  const { hashId, componentCls } = useStyles();
  const { active: pageActive } = useKeepAlive();

  return (
    <div className={`${componentCls} ${hashId} ${antTableCell}`} style={pageActive ? null : hiddenStyle}>
      <InternalPage className={props.className} />
    </div>
  );
});

Page.displayName = 'NocoBasePage';

export const PageTabs = () => {
  const { loading, disablePageHeader, enablePageTabs, fieldSchema, tabUid } = useOutletContext<any>();
  return (
    <CurrentTabUidContext.Provider value={tabUid}>
      <PageContent
        loading={loading}
        disablePageHeader={disablePageHeader}
        enablePageTabs={enablePageTabs}
        fieldSchema={fieldSchema}
        activeKey={tabUid}
      />
      {/* used to match the route with name "admin.page.tab.popup" */}
      <Outlet />
    </CurrentTabUidContext.Provider>
  );
};

Page.displayName = 'Page';

const className1 = css`
  > .nb-grid-container:not(:last-child) {
    > .nb-grid > .nb-grid-warp > button:last-child {
      display: none;
    }
  }
`;

const displayBlock = {
  display: 'block',
};

const displayNone = {
  display: 'none',
};

// Add a TabPane component to manage caching, implementing an effect similar to Vue's keep-alive
const TabPane = React.memo(({ schema, active: tabActive }: { schema: Schema; active: boolean }) => {
  const mountedRef = useRef(false);
  const { active: pageActive } = useKeepAlive();

  if (tabActive && !mountedRef.current) {
    mountedRef.current = true;
  }

  const newSchema = useMemo(
    () =>
      new Schema({
        properties: {
          [schema.name]: schema,
        },
      }),
    [schema],
  );

  if (!mountedRef.current) {
    return null;
  }

  return (
    <div style={tabActive ? displayBlock : displayNone}>
      <KeepAliveProvider active={pageActive && tabActive}>
        <SchemaComponent distributed schema={newSchema} />
      </KeepAliveProvider>
    </div>
  );
});

const PageContent = memo(
  ({
    loading,
    disablePageHeader,
    enablePageTabs,
    fieldSchema,
    activeKey,
  }: {
    loading: boolean;
    disablePageHeader: any;
    enablePageTabs: any;
    fieldSchema: Schema<any, any, any, any, any, any, any, any, any>;
    activeKey: string;
  }) => {
    if (!disablePageHeader && enablePageTabs) {
      return (
        <>
          {fieldSchema.mapProperties((schema) => (
            <TabPane key={schema.name} schema={schema} active={schema.name === activeKey} />
          ))}
        </>
      );
    }

    return (
      <div className={className1}>
        <SchemaComponent schema={fieldSchema} distributed />
      </div>
    );
  },
);

function NocoBasePageHeader({ footer }: { footer: React.JSX.Element }) {
  const fieldSchema = useFieldSchema();
  const { setTitle: setDocumentTitle } = useDocumentTitle();
  const { t } = useTranslation();
  const [pageTitle, setPageTitle] = useState(() => t(fieldSchema.title));

  const disablePageHeader = fieldSchema['x-component-props']?.disablePageHeader;
  const enablePageTabs = fieldSchema['x-component-props']?.enablePageTabs;
  const hidePageTitle = fieldSchema['x-component-props']?.hidePageTitle;

  useEffect(() => {
    if (fieldSchema.title) {
      const title = t(fieldSchema.title);
      setDocumentTitle(title);
      setPageTitle(title);
    }
  }, [fieldSchema.title, pageTitle, setDocumentTitle, t]);

  useRequest(
    {
      url: `/uiSchemas:getParentJsonSchema/${fieldSchema['x-uid']}`,
    },
    {
      ready: !hidePageTitle && !fieldSchema.title,
      onSuccess(data) {
        setPageTitle(data.data.title);
        setDocumentTitle(data.data.title);
      },
    },
  );

  return (
    <>
      <PageDesigner title={pageTitle} />
      {!disablePageHeader && (
        <AntdPageHeader
          className={classNames('pageHeaderCss', pageTitle || enablePageTabs ? '' : 'height0')}
          ghost={false}
          // 如果标题为空的时候会导致 PageHeader 不渲染，所以这里设置一个空白字符，然后再设置高度为 0
          title={hidePageTitle ? ' ' : pageTitle || ' '}
          footer={footer}
        />
      )}
    </>
  );
}

export function navigateToTab({
  activeKey,
  navigate,
  basename,
  pathname = window.location.pathname,
}: {
  activeKey: string;
  navigate: NavigateFunction;
  /** the router basename */
  basename: string;
  pathname?: string;
}) {
  pathname = pathname.replace(basename, '');

  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`;
  }

  if (isTabPage(pathname)) {
    navigate(`${pathname.replace(/\/tabs\/[^/]+$/, `/tabs/${activeKey}`)}`, { replace: true });
  } else {
    navigate(`${pathname}/tabs/${activeKey}`, { replace: true });
  }
}

export function isTabPage(pathname: string) {
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  const list = pathname.split('/');
  return list[list.length - 2] === 'tabs';
}
