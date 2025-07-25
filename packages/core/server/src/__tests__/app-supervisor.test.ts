/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { AppSupervisor } from '../app-supervisor';

describe('App Supervisor', () => {
  let appSupervisor: AppSupervisor;

  beforeEach(() => {
    appSupervisor = AppSupervisor.getInstance();
  });

  afterEach(async () => {
    await appSupervisor.destroy();
  });

  it('should get application initializing status', async () => {
    expect(appSupervisor.getAppStatus('test')).toBe(undefined);

    appSupervisor.setAppBootstrapper(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    appSupervisor.getApp('test');

    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(appSupervisor.getAppStatus('test')).toBe('initializing');

    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(appSupervisor.getAppStatus('test')).toBe('not_found');
  });
});
