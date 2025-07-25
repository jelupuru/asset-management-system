/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export type MeasureProps = {
  field: string | string[];
  type?: string;
  aggregation?: string;
  alias?: string;
  distinct?: boolean;
};

export type DimensionProps = {
  field: string | string[];
  type?: string;
  alias?: string;
  format?: string;
  options?: any;
};

export type OrderProps = {
  field: string | string[];
  alias?: string;
  order?: 'asc' | 'desc';
};

export type QueryParams = Partial<{
  uid: string;
  dataSource: string;
  collection: string;
  measures: MeasureProps[];
  dimensions: DimensionProps[];
  orders: OrderProps[];
  filter: any;
  limit: number;
  offset: number;
  sql: {
    fields?: string;
    clauses?: string;
  };
  cache: {
    enabled: boolean;
    ttl: number;
  };
  // Get the latest data from the database
  refresh: boolean;
}>;
