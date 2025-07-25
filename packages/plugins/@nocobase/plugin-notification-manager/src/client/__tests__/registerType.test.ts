/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import NotificationManager from '../notification-manager';

describe('registerType', () => {
  let plugin: NotificationManager;
  beforeEach(() => {
    plugin = new NotificationManager();
  });

  it('should register a new type', () => {
    const ChannelConfigForm = () => null;
    const MessageConfigForm = () => null;
    const newChannelType = {
      type: 'newType',
      title: 'New Type',
      components: {
        ChannelConfigForm,
        MessageConfigForm,
      },
    };

    plugin.registerChannelType(newChannelType);
    expect(plugin.channelTypes.get('newType')).toEqual(newChannelType);
  });
});
