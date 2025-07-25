/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { action } from '@formily/reactive';

import { useCollectionManager_deprecated } from '.';
import { useCompile } from '../../schema-component';

export function useCollectionDataSource(filter?: Function) {
  const compile = useCompile();
  const { collections = [] } = useCollectionManager_deprecated();
  return (field: any) => {
    action.bound((data: any) => {
      const filtered = typeof filter === 'function' ? data.filter(filter) : data;
      field.dataSource = filtered.map((item) => ({
        label: compile(item.title),
        value: item.name,
      }));
    })(collections);
  };
}
