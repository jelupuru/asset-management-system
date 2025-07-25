/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

const chalk = require('chalk');
const { Command } = require('commander');
const { run, isDev } = require('../util');

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  cli
    .command('pm2')
    .allowUnknownOption()
    .action(() => {
      run('pm2', process.argv.slice(3));
    });
  cli
    .command('pm2-restart')
    .allowUnknownOption()
    .action(() => {
      run('pm2', ['restart', 'all']);
    });
  cli
    .command('pm2-stop')
    .allowUnknownOption()
    .action(() => {
      run('pm2', ['stop', 'all']);
    });
};
