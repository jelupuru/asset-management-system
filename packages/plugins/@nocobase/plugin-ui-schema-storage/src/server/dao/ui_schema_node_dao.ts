/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export interface TargetPosition {
  type: 'before' | 'after';
  target: string;
}

export interface ChildOptions {
  parentUid: string;
  parentPath?: string[];
  type: string;
  position?: 'first' | 'last' | TargetPosition;
  sort?: number;
}

export interface SchemaNode {
  name: string;
  'x-uid': string;
  schema: object;
  'x-async'?: boolean;
  childOptions?: ChildOptions;
}
