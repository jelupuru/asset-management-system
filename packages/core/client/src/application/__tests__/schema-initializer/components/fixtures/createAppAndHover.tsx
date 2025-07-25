/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { screen, userEvent, waitFor } from '@nocobase/test/client';

import { createApp } from '../../fixures/createApp';
import { SchemaInitializerItemType } from '@nocobase/client';

export async function createAndHover(items: SchemaInitializerItemType[], appOptions: any = {}) {
  await createApp({ items }, appOptions);
  await userEvent.hover(screen.getByText('Test'));

  await waitFor(async () => {
    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  });
}
