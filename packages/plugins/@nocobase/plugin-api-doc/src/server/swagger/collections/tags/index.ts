/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Collection } from '@nocobase/database';
import { associationFields } from '../paths/associations';
import { relationTypeToString } from '../paths/collection';

export default (collection: Collection, options) => {
  const associations = associationFields(collection);

  const tags = [
    {
      name: collection.name,
      description: collection.options?.title || collection.name,
    },
  ];

  if (options.withAssociation) {
    for (const field of associations) {
      tags.push({
        name: `${collection.name}.${field.name}`,
        description: `${relationTypeToString(field)} relationship, ${collection.options?.title || collection.name}/${
          field.options?.uiSchema?.title || field.name
        }`,
      });
    }
  }

  return tags;
};
