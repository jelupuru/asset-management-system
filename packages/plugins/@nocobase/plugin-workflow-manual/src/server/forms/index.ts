/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Processor } from '@nocobase/plugin-workflow';

import ManualInstruction from '../ManualInstruction';

import create from './create';
import update from './update';

export type FormHandler = (this: ManualInstruction, instance, formConfig, processor: Processor) => Promise<void>;

export default function ({ formTypes }) {
  formTypes.register('create', create);
  formTypes.register('update', update);
}
