/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { FormOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';

import { SchemaInitializerItem, useSchemaInitializer, useSchemaInitializerItem } from '../../application';
import { useCollectionManager_deprecated } from '../../collection-manager';
import { createDetailsWithPaginationUISchema } from '../../modules/blocks/data-blocks/details-multi/createDetailsWithPaginationUISchema';
import { useSchemaTemplateManager } from '../../schema-templates';
import { useRecordCollectionDataSourceItems } from '../utils';

export const RecordAssociationDetailsBlockInitializer = () => {
  const itemConfig = useSchemaInitializerItem();
  const { onCreateBlockSchema, componentType, createBlockSchema, ...others } = itemConfig;
  const { insert } = useSchemaInitializer();
  const { getTemplateSchemaByMode } = useSchemaTemplateManager();
  const { getCollection } = useCollectionManager_deprecated();
  const field = itemConfig.field;
  const collection = getCollection(field.target);
  const resource = `${field.collectionName}.${field.name}`;
  return (
    <SchemaInitializerItem
      icon={<FormOutlined />}
      {...others}
      onClick={async ({ item }) => {
        if (item.template) {
          const s = await getTemplateSchemaByMode(item);
          insert(s);
        } else {
          insert(
            createDetailsWithPaginationUISchema({
              dataSource: collection.dataSource,
              association: resource,
              rowKey: collection.filterTargetKey || 'id',
            }),
          );
        }
      }}
      items={useRecordCollectionDataSourceItems('Details', itemConfig, field.target, resource)}
    />
  );
};

export function useCreateAssociationDetailsBlock() {
  const { insert } = useSchemaInitializer();
  const { getCollection } = useCollectionManager_deprecated();

  const createAssociationDetailsBlock = useCallback(
    ({ item }) => {
      const field = item.associationField;
      const collection = getCollection(field.target);

      insert(
        createDetailsWithPaginationUISchema({
          dataSource: collection.dataSource,
          association: `${field.collectionName}.${field.name}`,
          rowKey: collection.filterTargetKey || 'id',
        }),
      );
    },
    [getCollection, insert],
  );

  return { createAssociationDetailsBlock };
}
