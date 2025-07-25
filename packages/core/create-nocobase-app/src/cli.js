/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

const chalk = require('chalk');
const { resolve } = require('path');
const { Command } = require('commander');
const { AppGenerator } = require('./generator');
const { concat } = require('./util');
const packageJson = require('../package.json');

const cli = new Command('create-nocobase');

cli
  .arguments('<name>', 'directory of new AMS-GHMC app')
  .option('--quickstart', 'quickstart app creation')
  .option('-a, --all-db-dialect', 'install all database dialect dependencies')
  .option('-d, --db-dialect <dbDialect>', 'database dialect, current support sqlite/mysql/postgres', 'sqlite')
  .option('-e, --env <env>', 'environment variables write into .env file', concat, [])
  .description('create a new application')
  .action(async (name, options) => {
    if (options.quickstart) {
      console.log(`⚠️  ${chalk.yellow('quickstart option is deprecated')}`);
    }

    const generator = new AppGenerator({
      cwd: resolve(process.cwd(), name),
      args: options,
      context: {
        name,
        version: packageJson.version,
      },
    });

    await generator.run();
  });

module.exports = cli;
