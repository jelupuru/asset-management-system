/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { RenderSettingsOptions, renderSettings } from './renderSettings';
import { addXReadPrettyToEachLayer, setSchemaWithSettings } from '../web';

interface RenderSingleSettingsOptions extends Omit<RenderSettingsOptions, 'schemaSettings'> {
  settingPath?: string;
}

export const renderSingleSettings = (options: RenderSingleSettingsOptions) => {
  setSchemaWithSettings(options);

  return renderSettings(options);
};

export const renderReadPrettySingleSettings = (options: RenderSingleSettingsOptions) => {
  setSchemaWithSettings(options);

  options.schema = addXReadPrettyToEachLayer(options.schema);

  return renderSettings(options);
};
