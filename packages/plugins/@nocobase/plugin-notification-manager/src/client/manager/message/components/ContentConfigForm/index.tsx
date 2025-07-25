/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { withDynamicSchemaProps } from '@nocobase/client';
import { observer } from '@formily/react';
import { useChannelTypeMap } from '../../../../hooks';
export const ContentConfigForm = withDynamicSchemaProps(
  observer<{ variableOptions: any; channelType: string }>(
    ({ variableOptions, channelType }) => {
      const channelTypeMap = useChannelTypeMap();
      const { ContentConfigForm = () => null } = (channelType ? channelTypeMap[channelType] : {})?.components || {};
      return <ContentConfigForm variableOptions={variableOptions} />;
    },
    { displayName: 'ContentConfigForm' },
  ),
);
