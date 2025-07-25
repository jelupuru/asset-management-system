/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC } from 'react';
import { MainComponent } from './MainComponent';

const Loading: FC = () => <div>Loading...</div>;
const AppError: FC<{ error: Error }> = ({ error }) => {
  return (
    <div>
      <div>App Error</div>
      {error?.message}
      {process.env.__TEST__ && error?.stack}
    </div>
  );
};

const AppNotFound: FC = () => <div></div>;

export const defaultAppComponents = {
  AppMain: MainComponent,
  AppSpin: Loading,
  AppError: AppError,
  AppNotFound: AppNotFound,
};
