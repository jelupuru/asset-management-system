/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useMemo } from 'react';
import { useMapTranslation } from '../locale';
import { AMapComponent } from './AMap';
import { GoogleMapsComponent } from './GoogleMaps';

const MapComponents = {
  amap: AMapComponent,
  google: GoogleMapsComponent,
};

export const MapComponent = React.forwardRef<any, any>((props, ref) => {
  const { t } = useMapTranslation();
  const { mapType } = props;
  const Component = useMemo(() => {
    return MapComponents[mapType];
  }, [mapType]);

  if (!Component) {
    return <div>{t(`The ${mapType} cannot found`)}</div>;
  }
  return <Component ref={ref} {...props} />;
});
MapComponent.displayName = 'MapComponent';
