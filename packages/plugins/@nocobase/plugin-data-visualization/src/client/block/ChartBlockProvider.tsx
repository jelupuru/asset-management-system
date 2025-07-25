/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { BlockRefreshButton } from '../initializers/BlockRefreshAction';
import { SchemaComponentOptions, useCurrentPopupContext, useLocalVariables } from '@nocobase/client';
import { GlobalAutoRefreshProvider } from './GlobalAutoRefreshProvider';
import _ from 'lodash';

export const ChartBlockProvider: React.FC = (props) => {
  const currentPopupContext = useCurrentPopupContext();
  const localVariables = useLocalVariables();
  const popupRecordVariable = localVariables?.find((variable) => variable.name === '$nPopupRecord');
  const popupCtxReady =
    _.isEmpty(currentPopupContext) || !popupRecordVariable?.collectionName || popupRecordVariable?.ctx;

  if (!popupCtxReady) {
    return null;
  }

  return (
    <SchemaComponentOptions
      components={{
        BlockRefreshButton,
      }}
    >
      <GlobalAutoRefreshProvider>{props.children}</GlobalAutoRefreshProvider>
    </SchemaComponentOptions>
  );
};
