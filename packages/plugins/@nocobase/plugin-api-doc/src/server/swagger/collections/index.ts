/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Collection } from '@nocobase/database';
import paths from './paths';
import components from './components';
import tags from './tags';

function collectionToSwaggerObject(collection: Collection, options) {
  return {
    paths: paths(collection, options),
    components: components(collection, options),
    tags: tags(collection, options),
  };
}

export default collectionToSwaggerObject;
