/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import mathjs from '../../utils/mathjs';

export default {
  label: 'Math.js',
  tooltip: `{{t('Math.js comes with a large set of built-in functions and constants, and offers an integrated solution to work with different data types.')}}`,
  link: 'https://docs.mayra.com/handbook/calculation-engines/mathjs',
  evaluate: mathjs,
};
