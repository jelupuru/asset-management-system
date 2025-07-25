/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CollectionGroupManager } from '../collection-group-manager';

describe('collection group manager', () => {
  it('should unify duplicator option', async () => {
    expect(CollectionGroupManager.unifyDumpRules('skipped')).toMatchObject({
      group: 'skipped',
    });

    expect(CollectionGroupManager.unifyDumpRules('required')).toMatchObject({
      group: 'required',
    });

    expect(
      CollectionGroupManager.unifyDumpRules({
        required: true,
      }),
    ).toMatchObject({
      group: 'required',
    });

    expect(
      CollectionGroupManager.unifyDumpRules({
        skipped: true,
      }),
    ).toMatchObject({
      group: 'skipped',
    });

    expect(
      CollectionGroupManager.unifyDumpRules({
        group: 'required',
        delayRestore: {},
      }),
    ).toMatchObject({
      group: 'required',
      delayRestore: {},
    });

    expect(
      CollectionGroupManager.unifyDumpRules({
        group: 'logs',
        delayRestore: {},
      }),
    ).toMatchObject({
      group: 'logs',
      delayRestore: {},
    });
  });
});
