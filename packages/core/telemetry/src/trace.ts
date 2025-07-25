/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Registry } from '@nocobase/utils';
import { BatchSpanProcessor, ConsoleSpanExporter, SpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';

export type TraceOptions = {
  tracerName?: string;
  version?: string;
  processorName?: string | string[];
};

type GetSpanProcessor = () => SpanProcessor;

export class Trace {
  processorName: string | string[];
  processors = new Registry<GetSpanProcessor>();
  tracerName: string;
  version: string;
  provider: NodeTracerProvider;

  constructor(options?: TraceOptions) {
    const { processorName, tracerName, version } = options || {};
    this.processorName = processorName || 'console';
    this.tracerName = tracerName || 'nocobase-trace';
    this.version = version || '';
    this.registerProcessor('console', () => new BatchSpanProcessor(new ConsoleSpanExporter()));
  }

  init(resource: Resource) {
    this.provider = new NodeTracerProvider({
      resource,
    });
    this.provider.register();
  }

  registerProcessor(name: string, processor: GetSpanProcessor) {
    this.processors.register(name, processor);
  }

  getProcessor(name: string) {
    return this.processors.get(name);
  }

  getTracer(name?: string, version?: string) {
    return this.provider.getTracer(name || this.tracerName, version || this.version);
  }

  start() {
    let processorName = this.processorName;
    if (typeof processorName === 'string') {
      processorName = processorName.split(',');
    }
    processorName.forEach((name) => {
      const processor = this.getProcessor(name)();
      this.provider.addSpanProcessor(processor);
    });
  }

  shutdown() {
    return this.provider.shutdown();
  }
}
