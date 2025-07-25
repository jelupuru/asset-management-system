/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useFieldSchema } from '@formily/react';
import { useCallback } from 'react';
import { useCollection } from '../../data-source/collection/CollectionProvider';

/**
 * label = 'schema-initializer' + x-component + [x-initializer] + [collectionName] + [postfix]
 * @returns
 */

export const useGetAriaLabelOfSchemaInitializer = () => {
  const fieldSchema = useFieldSchema();
  const { name } = useCollection() || {};
  const getAriaLabel = useCallback(
    (postfix?: string) => {
      if (!fieldSchema) return '';
      const component = fieldSchema['x-component'];
      const componentStr = typeof component === 'string' ? component : component?.displayName || component.name;
      const initializer = fieldSchema['x-initializer'] ? `-${fieldSchema['x-initializer']}` : '';
      const collectionName = name ? `-${name}` : '';
      postfix = postfix ? `-${postfix}` : '';

      return `schema-initializer-${componentStr}${initializer}${collectionName}${postfix}`;
    },
    [fieldSchema, name],
  );

  return { getAriaLabel };
};
