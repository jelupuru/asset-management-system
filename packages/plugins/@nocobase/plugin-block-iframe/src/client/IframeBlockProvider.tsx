/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaComponentOptions } from '@nocobase/client';
import React from 'react';
import { ArrayItems } from '@formily/antd-v5';

import { Iframe } from './Iframe';
import { IframeBlockInitializer } from './IframeBlockInitializer';

export const IframeBlockProvider = (props: any) => {
  return (
    <SchemaComponentOptions components={{ Iframe, IframeBlockInitializer, ArrayItems }}>
      {props.children}
    </SchemaComponentOptions>
  );
};
