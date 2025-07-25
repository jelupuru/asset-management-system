/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

const { resolve } = require('path');
const { Command } = require('commander');
const { PluginGenerator } = require('../plugin-generator');

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  cli
    .command('create-plugin')
    .argument('<name>')
    .allowUnknownOption()
    .action(async (name, options) => {
      const generator = new PluginGenerator({
        cwd: resolve(process.cwd(), name),
        args: options,
        context: {
          name,
        },
      });
      await generator.run();
    });
};
