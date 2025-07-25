/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { PopupContextProvider, withSkeletonComponent } from '@nocobase/client';
import React, { useMemo } from 'react';
import { useMapTranslation } from '../locale';
import { AMapBlock } from './AMap';
import { GoogleMapsBlock } from './GoogleMaps';

const MapBlocks = {
  amap: AMapBlock,
  google: GoogleMapsBlock,
};

export const MapBlockComponent: React.FC<any> = withSkeletonComponent(
  (props) => {
    const { t } = useMapTranslation();
    const { mapType } = props;

    const Component = useMemo(() => {
      return MapBlocks[mapType];
    }, [mapType]);

    if (!Component) {
      return <div>{t(`The ${mapType} cannot found`)}</div>;
    }

    return (
      <PopupContextProvider>
        <Component {...props} />
      </PopupContextProvider>
    );
  },
  {
    displayName: 'MapBlockComponent',
  },
);
