/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { forwardRef } from 'react';
import { Tooltip, Button } from 'antd';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { getPopupContainer, useGCMTranslation } from '../utils';
import { useFullscreen } from 'ahooks';

export const FullscreenAction = forwardRef(() => {
  const { t } = useGCMTranslation();

  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.getElementById('graph_container'));
  return (
    <Tooltip title={t('Full Screen')} getPopupContainer={getPopupContainer}>
      <Button
        onClick={() => {
          toggleFullscreen();
        }}
      >
        {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </Button>
    </Tooltip>
  );
});
FullscreenAction.displayName = 'FullscreenAction';
