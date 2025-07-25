/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Table } from './Table';
import { TableActionColumnDesigner } from './Table.ActionColumnDesigner';
import { TableColumn } from './Table.Column';
import { TableColumnActionBar } from './Table.Column.ActionBar';
import { TableColumnDecorator } from './Table.Column.Decorator';
import { TableColumnDesigner } from './Table.Column.Designer';
import { TableIndex } from './Table.Index';
import { TableSelector } from './TableSelector';

export * from './TableBlockDesigner';
export * from './TableField';
export * from './TableSelectorDesigner';
export { useColumnSchema } from './Table.Column.Decorator';

export const TableV2 = Table;

TableV2.Column = TableColumn;
TableV2.Column.ActionBar = TableColumnActionBar;
TableV2.Column.Decorator = TableColumnDecorator;
TableV2.Column.Designer = TableColumnDesigner;
TableV2.ActionColumnDesigner = TableActionColumnDesigner;
TableV2.Selector = TableSelector;
TableV2.Index = TableIndex;
