/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export interface PubSubManagerOptions {
  channelPrefix?: string;
}

export interface PubSubManagerPublishOptions {
  skipSelf?: boolean;
  onlySelf?: boolean;
}

export interface PubSubManagerSubscribeOptions {
  debounce?: number;
}

export type PubSubCallback = (message: any) => Promise<void>;

export interface IPubSubAdapter {
  isConnected(): Promise<boolean> | boolean;
  connect(): Promise<any>;
  close(): Promise<any>;
  subscribe(channel: string, callback: PubSubCallback): Promise<any>;
  unsubscribe(channel: string, callback: PubSubCallback): Promise<any>;
  publish(channel: string, message: string): Promise<any>;
}
