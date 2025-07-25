/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import Instruction from '.';
import Processor from '../Processor';
import { JOB_STATUS } from '../constants';
import { FlowNodeModel } from '../types';

interface Config {
  endStatus: number;
}

export default class extends Instruction {
  async run(node: FlowNodeModel, prevJob, processor: Processor) {
    const { endStatus = JOB_STATUS.RESOLVED } = <Config>node.config;
    await processor.saveJob({
      status: endStatus,
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: prevJob?.id ?? null,
    });

    return processor.exit(endStatus);
  }
}
