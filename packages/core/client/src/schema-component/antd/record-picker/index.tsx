/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import ActionContainer from '../action/Action.Container';
import { RecordPicker } from './RecordPicker';

RecordPicker.Viewer = ActionContainer;
RecordPicker.Selector = ActionContainer;

export { RecordPicker };
export * from './useFieldNames';
export * from './util';
export * from './ReadPrettyRecordPicker';
export * from './InputRecordPicker';
