/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { connect } from '@formily/react';

import Expression from './Expression';
import Result from './Result';

export const Formula = () => null;

Formula.Expression = Expression;
Formula.Result = connect(Result);

export default Formula;
