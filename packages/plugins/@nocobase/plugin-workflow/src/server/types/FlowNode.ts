/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BelongsToGetAssociationMixin, Database, Model } from '@nocobase/database';
import WorkflowModel from './Workflow';

export default class FlowNodeModel extends Model {
  declare static readonly database: Database;

  declare id: number;
  declare title: string;
  declare branchIndex: null | number;
  declare type: string;
  declare config: any;

  declare createdAt: Date;
  declare updatedAt: Date;

  declare upstream: FlowNodeModel;
  declare downstream: FlowNodeModel;

  declare workflow?: WorkflowModel;
  declare getWorkflow: BelongsToGetAssociationMixin<WorkflowModel>;
}
