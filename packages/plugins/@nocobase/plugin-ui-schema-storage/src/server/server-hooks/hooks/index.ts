/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { bindMenuToRole } from './bind-menu-to-role';
import { hookFactory } from './factory';
import { removeParentsIfNoChildren } from './remove-parents-if-no-children';
import { removeSchema } from './remove-schema';

const hooks = [
  hookFactory('onCollectionDestroy', 'removeSchema', removeSchema),
  hookFactory('onCollectionFieldDestroy', 'removeSchema', removeSchema),
  hookFactory('onSelfCreate', 'bindMenuToRole', bindMenuToRole),
  hookFactory('onSelfMove', 'removeParentsIfNoChildren', removeParentsIfNoChildren),
];

export { hooks };
