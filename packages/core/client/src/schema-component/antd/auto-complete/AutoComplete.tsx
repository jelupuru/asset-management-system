/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { connect, mapProps, mapReadPretty } from '@formily/react';
import { AutoComplete as AntdAutoComplete } from 'antd';
import { withDynamicSchemaProps } from '../../../hoc/withDynamicSchemaProps';
import { ReadPretty } from '../input';

export const AutoComplete = withDynamicSchemaProps(
  connect(
    AntdAutoComplete,
    mapProps({
      dataSource: 'options',
    }),
    mapReadPretty(ReadPretty.Input),
  ),
);
