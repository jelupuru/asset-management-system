/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC } from 'react';
import { CollectionFieldsProps, useCollectionFieldContext } from './utils';
import { AssociationCollectionFields, ParentCollectionFields, SelfFields } from './items';

export const CollectionFieldsToInitializerItems: FC<CollectionFieldsProps> = (props) => {
  const { selfField, parentField, associationField, block } = props;
  const context = useCollectionFieldContext();
  if (!context.collection) return null;
  return (
    <>
      <SelfFields block={block} {...selfField} context={{ ...context, collection: context.collection }} />
      {parentField && (
        <ParentCollectionFields
          block={block}
          {...parentField}
          context={{ ...context, collection: context.collection }}
        />
      )}
      {associationField && (
        <AssociationCollectionFields
          block={block}
          {...associationField}
          context={{ ...context, collection: context.collection }}
        />
      )}
    </>
  );
};
