/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Registry } from '@nocobase/utils/client';
import { ComponentType } from 'react';

export type RegisterChannelOptions = {
  title: string;
  type: string;
  components: {
    ChannelConfigForm: ComponentType;
    MessageConfigForm?: ComponentType<{ variableOptions: any }>;
    ContentConfigForm?: ComponentType<{ variableOptions?: any }>;
  };
  meta?: {
    creatable?: boolean;
    editable?: boolean;
    deletable?: boolean;
  };
};

export type ChannelTypes = Registry<RegisterChannelOptions>;
export type NotificationType = 'mail' | 'SMS' | 'in-app';
