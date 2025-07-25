/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export enum ActionType {
  Visible = 'visible',
  Editable = 'editable',
  ReadOnly = 'disabled',
  ReadPretty = 'readPretty',
  None = 'none',
  Hidden = 'hidden',
  Required = 'required',
  InRequired = 'notRequired',
  Disabled = 'disabled',
  Value = 'value',
  Active = 'enabled',
  Color = 'color',
  BackgroundColor = 'backgroundColor',
  TextAlign = 'textAlign',
}

export enum LinkageRuleCategory {
  default = 'default',
  style = 'style',
}

export const LinkageRuleDataKeyMap: Record<`${LinkageRuleCategory}`, string> = {
  [LinkageRuleCategory.style]: 'x-linkage-style-rules',
  [LinkageRuleCategory.default]: 'x-linkage-rules',
};
