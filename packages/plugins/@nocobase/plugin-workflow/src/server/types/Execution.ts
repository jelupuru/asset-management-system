/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BelongsToGetAssociationMixin, Database, HasManyGetAssociationsMixin, Model } from '@nocobase/database';
import JobModel from './Job';
import WorkflowModel from './Workflow';

export default class ExecutionModel extends Model {
  declare static readonly database: Database;

  declare id: number;
  declare title: string;
  declare context: any;
  declare status: number;

  declare createdAt: Date;
  declare updatedAt: Date;

  declare key: string;

  declare workflow?: WorkflowModel;
  declare getWorkflow: BelongsToGetAssociationMixin<WorkflowModel>;

  declare jobs?: JobModel[];
  declare getJobs: HasManyGetAssociationsMixin<JobModel>;
}
