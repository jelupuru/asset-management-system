/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import association from './association';
import date from './date';
import array from './array';
import empty from './empty';
import string from './string';
import eq from './eq';
import ne from './ne';
import notIn from './notIn';
import boolean from './boolean';
import childCollection from './child-collection';

export default {
  ...association,
  ...date,
  ...array,
  ...empty,
  ...string,
  ...eq,
  ...ne,
  ...notIn,
  ...boolean,
  ...childCollection,
};
