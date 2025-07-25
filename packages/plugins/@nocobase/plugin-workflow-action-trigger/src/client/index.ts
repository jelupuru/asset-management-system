/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import WorkflowPlugin, {
  useRecordTriggerWorkflowsActionProps,
  useTriggerWorkflowsActionProps,
} from '@nocobase/plugin-workflow/client';

import ActionTrigger from './ActionTrigger';

export default class extends Plugin {
  async load() {
    const workflow = this.app.pm.get('workflow') as WorkflowPlugin;
    workflow.registerTrigger('action', ActionTrigger);

    this.app.addScopes({
      useTriggerWorkflowsActionProps,
      useRecordTriggerWorkflowsActionProps,
    });
  }
}
