/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { AppTelemetryOptions } from '@nocobase/server';

export const telemetry: AppTelemetryOptions = {
  enabled: process.env.TELEMETRY_ENABLED === 'on',
  metric: {
    readerName: process.env.TELEMETRY_METRIC_READER,
  },
  trace: {
    processorName: process.env.TELEMETRY_TRACE_PROCESSOR,
  },
};
