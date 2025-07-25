/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export interface Channel {
  name: string;
  title: string;
  userId: string;
  unreadMsgCnt: number;
  totalMsgCnt: number;
  latestMsgReceiveTimestamp: number;
  latestMsgTitle: string;
}

export interface Message {
  id: string;
  title: string;
  userId: string;
  channelName: string;
  content: string;
  receiveTimestamp: number;
  status: 'read' | 'unread';
  url: string;
  options: Record<string, any>;
}

export type SSEData = {
  type: 'message:created';
  data: Message;
};
export interface InAppMessageFormValues {
  receivers: string[];
  content: string;
  senderName: string;
  senderId: string;
  url: string;
  title: string;
  options: Record<string, any>;
}

export const InAppMessagesDefinition = {
  name: 'notificationInAppMessages',
  fieldNameMap: {
    id: 'id',
    channelName: 'channelName',
    userId: 'userId',
    content: 'content',
    status: 'status',
    title: 'title',
    receiveTimestamp: 'receiveTimestamp',
    options: 'options',
  },
} as const;

export const ChannelsDefinition = {
  name: 'notificationInAppChannels',
  fieldNameMap: {
    id: 'id',
    senderId: 'senderId',
    title: 'title',
    lastMsgId: 'lastMsgId',
  },
} as const;

export const inAppTypeName = 'in-app-message';
