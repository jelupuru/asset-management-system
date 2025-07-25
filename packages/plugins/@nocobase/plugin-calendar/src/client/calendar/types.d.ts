/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export interface ToolbarProps {
  localizer?: any;
  label?: any;
  view?: any;
  views?: any;
  onNavigate?: (action: string) => void;
  onView?: (view: string) => void;

  date: string;
  /**
   * 是否展示农历
   */
  showLunar: boolean;
}
