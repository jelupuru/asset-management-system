/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useFieldSchema } from '@formily/react';
import { cx, NocoBaseRecursionField, SchemaToolbarProvider } from '@nocobase/client';
import { NavBar } from 'antd-mobile';
import React, { FC } from 'react';

import { useMobileTitle } from '../../../../mobile-providers';
import { useMobilePage } from '../../context';
import { useStyles } from './styles';

export const MobilePageNavigationBar: FC = () => {
  const { title } = useMobileTitle();
  const { displayNavigationBar = true, displayPageTitle = true } = useMobilePage();
  const fieldSchema = useFieldSchema();
  const { componentCls, hashId } = useStyles();

  if (!displayNavigationBar) return null;

  return (
    <div className={cx('mobile-page-navigation-bar', componentCls, hashId)} data-testid="mobile-page-navigation-bar">
      <NavBar
        backArrow={false}
        back={null}
        left={
          <SchemaToolbarProvider position="left">
            <NocoBaseRecursionField name="actionBarLeft" schema={fieldSchema} onlyRenderProperties />
          </SchemaToolbarProvider>
        }
        right={
          <SchemaToolbarProvider position="right">
            <NocoBaseRecursionField name="actionBarRight" schema={fieldSchema} onlyRenderProperties />
          </SchemaToolbarProvider>
        }
      >
        {displayPageTitle ? title : null}
      </NavBar>

      <SchemaToolbarProvider position="bottom">
        <NocoBaseRecursionField name="actionBarBottom" schema={fieldSchema} onlyRenderProperties />
      </SchemaToolbarProvider>
    </div>
  );
};
