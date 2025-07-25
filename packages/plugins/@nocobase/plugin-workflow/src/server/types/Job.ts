/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { BelongsToGetAssociationMixin, Model } from '@nocobase/database';
import FlowNodeModel from './FlowNode';

export default class JobModel extends Model {
  declare id: number;
  declare status: number;
  declare result: any;

  declare createdAt: Date;
  declare updatedAt: Date;

  declare upstreamId: number;
  declare upstream: JobModel;

  declare nodeId: number;
  declare node?: FlowNodeModel;
  declare getNode: BelongsToGetAssociationMixin<FlowNodeModel>;
}
