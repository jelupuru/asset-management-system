/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Alert, Slider } from 'antd';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { cx, css, ErrorFallback } from '@nocobase/client';

import { Branch } from './Branch';
import { useFlowContext } from './FlowContext';
import { lang } from './locale';
import useStyles from './style';
import { TriggerConfig } from './triggers';
import { AddNodeContextProvider } from './AddNodeContext';

export function CanvasContent({ entry }) {
  const { styles } = useStyles();
  const { workflow } = useFlowContext();
  const [zoom, setZoom] = React.useState(100);

  return (
    <div className="workflow-canvas-wrapper">
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
        <AddNodeContextProvider>
          <div className="workflow-canvas" style={{ zoom: zoom / 100 }}>
            <div
              className={cx(
                styles.branchBlockClass,
                css`
                  margin-top: 0 !important;
                `,
              )}
            >
              <div className={styles.branchClass}>
                {workflow?.executed ? (
                  <Alert
                    type="warning"
                    message={lang('Executed workflow cannot be modified. Could be copied to a new version to modify.')}
                    showIcon
                    className={css`
                      margin-bottom: 1em;
                    `}
                  />
                ) : null}
                <TriggerConfig />
                <div
                  className={cx(
                    styles.branchBlockClass,
                    css`
                      margin-top: 0 !important;
                    `,
                  )}
                >
                  <Branch entry={entry} />
                </div>
                <div className={styles.terminalClass}>{lang('End')}</div>
              </div>
            </div>
          </div>
        </AddNodeContextProvider>
      </ErrorBoundary>
      <div className="workflow-canvas-zoomer">
        <Slider vertical reverse defaultValue={100} step={10} min={10} value={zoom} onChange={setZoom} />
      </div>
    </div>
  );
}
