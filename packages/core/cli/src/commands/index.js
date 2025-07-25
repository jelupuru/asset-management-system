/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

const { Command } = require('commander');
const { isPackageValid, generateAppDir } = require('../util');

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  generateAppDir();
  require('./global')(cli);
  require('./create-nginx-conf')(cli);
  require('./build')(cli);
  require('./tar')(cli);
  require('./dev')(cli);
  require('./start')(cli);
  require('./e2e')(cli);
  require('./clean')(cli);
  require('./doc')(cli);
  require('./pm2')(cli);
  require('./test')(cli);
  require('./test-coverage')(cli);
  require('./umi')(cli);
  require('./upgrade')(cli);
  require('./postinstall')(cli);
  require('./pkg')(cli);
  if (isPackageValid('@umijs/utils')) {
    require('./create-plugin')(cli);
  }
};
