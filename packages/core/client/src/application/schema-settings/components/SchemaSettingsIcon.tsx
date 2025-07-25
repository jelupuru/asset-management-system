/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { MenuOutlined } from '@ant-design/icons';
import React, { FC, useMemo } from 'react';
import { useGetAriaLabelOfDesigner } from '../../../schema-settings/hooks/useGetAriaLabelOfDesigner';
import { SchemaSettingOptions } from '../types';

export interface SchemaSettingsIconProps {
  options: SchemaSettingOptions;
}

export const SchemaSettingsIcon: FC<SchemaSettingOptions> = React.memo((props) => {
  const { name } = props;
  const { getAriaLabel } = useGetAriaLabelOfDesigner();
  const style = useMemo(() => ({ cursor: 'pointer', fontSize: 12 }), []);
  return <MenuOutlined role="button" style={style} aria-label={getAriaLabel('schema-settings', name)} />;
});
SchemaSettingsIcon.displayName = 'SchemaSettingsIcon';
