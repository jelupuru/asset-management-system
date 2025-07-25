/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { cx, SchemaComponent } from '@nocobase/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ExecutionCanvas } from './ExecutionCanvas';
import useStyles from './style';

export const ExecutionPage = () => {
  const params = useParams<any>();
  const { styles } = useStyles();

  return (
    <div className={cx(styles.workflowPageClass)}>
      <SchemaComponent
        schema={{
          type: 'void',
          properties: {
            [`execution_${params.id}`]: {
              type: 'void',
              'x-decorator': 'ResourceActionProvider',
              'x-decorator-props': {
                collection: {
                  name: 'executions',
                  fields: [],
                },
                resourceName: 'executions',
                request: {
                  resource: 'executions',
                  action: 'get',
                  params: {
                    filter: params,
                    appends: ['jobs', 'workflow', 'workflow.nodes'],
                  },
                },
              },
              'x-component': 'ExecutionCanvas',
            },
          },
        }}
        components={{
          ExecutionCanvas,
        }}
      />
    </div>
  );
};
