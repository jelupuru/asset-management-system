/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import * as client from '@nocobase/client';
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import formatters from '../configure/formatters';
import transformers from '../transformers';
import {
  useChartFields,
  useFieldsWithAssociation,
  useFieldTransformer,
  useFormatters,
  useOrderFieldsOptions,
  useTransformers,
} from '../hooks';

describe('hooks', () => {
  beforeEach(() => {
    vi.spyOn(client, 'useDataSourceManager').mockReturnValue({
      getDataSource: () => ({
        collectionManager: {
          getCollectionFields: (name: string) =>
            ({
              orders: [
                {
                  interface: 'string',
                  name: 'name',
                  uiSchema: {
                    title: '{{t("Name")}}',
                  },
                  type: 'string',
                },
                {
                  interface: 'number',
                  name: 'price',
                  uiSchema: {
                    title: '{{t("Price")}}',
                  },
                  type: 'double',
                },
                {
                  interface: 'createdAt',
                  name: 'createdAt',
                  uiSchema: {
                    title: '{{t("Created At")}}',
                  },
                  type: 'date',
                },
                {
                  interface: 'm2o',
                  name: 'user',
                  uiSchema: {
                    title: '{{t("User")}}',
                  },
                  target: 'users',
                  type: 'belongsTo',
                },
              ],
              users: [
                {
                  interface: 'string',
                  name: 'name',
                  uiSchema: {
                    title: '{{t("Name")}}',
                  },
                  type: 'string',
                },
              ],
            })[name],
        },
      }),
      collectionFieldInterfaceManager: {
        getFieldInterface: (i: string) => {
          switch (i) {
            case 'm2o':
              return {
                filterable: {
                  nested: true,
                },
              };
            default:
              return {};
          }
        },
      },
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('useFieldsWithAssociation', () => {
    const { result } = renderHook(() => useFieldsWithAssociation('main', 'orders'));
    expect(result.current).toMatchObject([
      {
        key: 'name',
        label: 'Name',
        value: 'name',
      },
      {
        key: 'price',
        label: 'Price',
        value: 'price',
      },
      {
        key: 'createdAt',
        label: 'Created At',
        value: 'createdAt',
      },
      {
        key: 'user',
        label: 'User',
        value: 'user',
        target: 'users',
        targetFields: [
          {
            key: 'user.name',
            label: 'User / Name',
            value: 'user.name',
          },
        ],
      },
    ]);
  });

  test('useChartFields', () => {
    const fields = renderHook(() => useFieldsWithAssociation('main', 'orders')).result.current;
    const { result } = renderHook(() => useChartFields(fields));
    const func = result.current;
    const field = {
      query: () => ({
        get: () => ({
          measures: [
            {
              field: ['price'],
              alias: 'Price Alias',
            },
          ],
          dimensions: [
            {
              field: ['user', 'name'],
            },
          ],
        }),
      }),
      dataSource: [],
    };
    func(field);
    expect(field.dataSource).toMatchObject([
      {
        key: 'Price Alias',
        label: 'Price Alias',
        value: 'Price Alias',
      },
      {
        key: 'user.name',
        label: 'User / Name',
        value: 'user.name',
      },
    ]);
  });

  test('useFormatters', () => {
    const fields = renderHook(() => useFieldsWithAssociation('main', 'orders')).result.current;
    const { result } = renderHook(() => useFormatters(fields));
    const func = result.current;
    const field = {
      query: () => ({
        get: () => 'createdAt',
      }),
      dataSource: [],
    };
    func(field);
    expect(field.dataSource).toEqual(formatters.datetime);
  });

  test('useTransformers', () => {
    const field = {
      query: () => ({
        get: () => 'datetime',
      }),
      dataSource: [],
    };
    renderHook(() => useTransformers(field));
    expect(field.dataSource.map((item) => item.value)).toEqual(
      Object.keys({ ...transformers['general'], ...transformers['datetime'] }),
    );
  });

  test('useFieldTransformers', () => {
    const { result } = renderHook(() =>
      useFieldTransformer([
        {
          field: '1',
          type: 'datetime',
          format: 'YYYY',
        },
        {
          field: '2',
          type: 'number',
          format: 'YYYY',
        },
      ]),
    );
    expect(result.current['1']).toBeDefined();
    expect(result.current['2']).toBeUndefined();
  });

  test('useOrderFieldsOptions', () => {
    const fields = renderHook(() => useFieldsWithAssociation('main', 'orders')).result.current;
    const { result } = renderHook(() => useOrderFieldsOptions([], fields));
    const func = result.current;
    const field1 = {
      query: () => ({
        get: () => ({
          measures: [{ field: ['price'] }],
        }),
      }),
      dataSource: [],
      componentProps: {
        fieldNames: {},
      },
    };
    const field2 = {
      query: () => ({
        get: () => ({
          measures: [{ field: ['price'], aggregation: 'sum' }],
        }),
      }),
      componentProps: {
        fieldNames: {},
      },
      dataSource: [],
    };
    func(field1);
    func(field2);
    expect(field1.dataSource).toEqual([]);
    expect(field1.componentProps.fieldNames).toEqual({
      label: 'title',
      value: 'name',
      children: 'children',
    });
    expect(field2.dataSource).toMatchObject([{ key: 'price', value: 'price', label: 'Price' }]);
    expect(field2.componentProps.fieldNames).toEqual({});
  });
});
