/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

/* istanbul ignore file -- @preserve */

import Application from '../application';

export default (app: Application) => {
  app
    .command('migrator')
    .preload()
    .action(async (opts) => {
      console.log('migrating...');
      await app.emitAsync('cli.beforeMigrator', opts);
      await app.db.migrator.runAsCLI(process.argv.slice(3));
      await app.stop();
    });
};
