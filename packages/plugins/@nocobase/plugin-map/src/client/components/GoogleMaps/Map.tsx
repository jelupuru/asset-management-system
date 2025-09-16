/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SyncOutlined } from '@ant-design/icons';
import { useFieldSchema } from '@formily/react';
import { Loader } from '@googlemaps/js-api-loader';
import { css, useAPIClient, useApp, useCollection_deprecated, useNavigateNoUpdate } from '@nocobase/client';
import { useMemoizedFn } from 'ahooks';
import { Alert, App, Button, Spin } from 'antd';
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { defaultImage } from '../../constants';
import { useMapConfiguration } from '../../hooks';
import { useMapTranslation } from '../../locale';
import { MapEditorType } from '../../types';
import { useMapHeight } from '../hook';
import { Search } from './Search';
import { getCurrentPosition, getIcon } from './utils';
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';
import { GoogleMapsComponent as MapOne } from './MapOne';
import { GoogleMapsComponent as MapTwo } from './MapTwo';
import { CollectionName } from 'packages/plugins/@nocobase/plugin-data-source-manager/src/client/component/CollectionsManager/components/CollectionName';
export type OverlayOptions = google.maps.PolygonOptions & google.maps.MarkerOptions & google.maps.PolylineOptions;

export const getDrawingMode = (type: MapEditorType) => {
  if (type === 'point') {
    return 'marker';
  } else if (type === 'lineString') {
    return 'polyline';
  }
  return type;
};

const methodMapping = {
  point: {
    propertyKey: 'position',
    overlay: 'Marker',
  },
  polygon: {
    propertyKey: 'paths',
    overlay: 'Polygon',
  },
  lineString: {
    propertyKey: 'path',
    overlay: 'Polyline',
  },
  circle: {
    transformOptions(value: any) {
      return {
        center: new google.maps.LatLng(value[1], value[0]),
        radius: value[2],
      } as google.maps.CircleOptions;
    },
    overlay: 'Circle',
  },
};

export interface GoogleMapsComponentProps {
  value?: any;
  onChange?: (value: number[] | null) => void;
  disabled?: boolean;
  mapType: string;
  /**
   * only ReadPretty
   */
  readonly: string;
  zoom: number;
  type: MapEditorType;
  style?: React.CSSProperties;
  overlayCommonOptions?: OverlayOptions;
  block?: boolean;
  featureLayerUrl?: string; // ArcGIS FeatureLayer URL (optional)
}

export interface GoogleMapForwardedRefProps {
  setOverlay: (t: MapEditorType, v: any, o?: OverlayOptions) => google.maps.MVCObject;
  getOverlay: (t: MapEditorType, v: any, o?: OverlayOptions) => google.maps.MVCObject;
  setFitView: (overlays: google.maps.MVCObject[]) => void;
  createDraw: (onlyCreate?: boolean, additionalOptions?: OverlayOptions) => any;
  map: google.maps.Map | undefined;
  overlay: google.maps.MVCObject | undefined;
  drawingManager: google.maps.drawing.DrawingManager | undefined;
  errMessage?: string;
}

// ArcGIS FeatureLayer loader
async function loadArcGISFeatureLayer(map: google.maps.Map, featureServiceUrl: string) {
  try {
    const response = await fetch(`${featureServiceUrl}/query?where=1=1&outFields=*&f=json`);
    const json = await response.json();
    if (!json.features) return;

    const geojson = {
      type: 'FeatureCollection',
      features: json.features.map((f: any) => arcgisToGeoJSON(f)),
    };

    map.data.addGeoJson(geojson);

    // Style ArcGIS features — set clickable:false so map clicks/drawing aren't blocked
    map.data.setStyle({
      fillColor: '#4e9bff',
      strokeColor: '#003366',
      strokeWeight: 2,
      // Google Maps Data options don't expose 'clickable' explicitly in typing,
      // but setting 'visible' + using pointer-events on the underlying elements helps.
    });

    // Ensure data layer does not capture pointer events (so drawing clicks pass through)
    // This hack relies on DOM after maps render; safe and commonly used.
    // Delay slightly so DOM elements exist.
    setTimeout(() => {
      const dataContainers = document.querySelectorAll('.gm-style > div > div > canvas, .gm-style > div > div > svg');
      dataContainers.forEach((el) => {
        // Make sure we don't accidentally disable interactions for the map controls.
        (el as HTMLElement).style.pointerEvents = 'none';
      });
    }, 300);
  } catch (err) {
    console.error('Failed to load ArcGIS FeatureLayer:', err);
  }
}

export const GoogleMapsComponent = React.forwardRef<GoogleMapForwardedRefProps, GoogleMapsComponentProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      block = false,
      readonly,
      disabled = block,
      zoom = 13,
      overlayCommonOptions,
      featureLayerUrl,
    } = props;
    const { accessKey } = useMapConfiguration(props.mapType) || {};
    const { t } = useMapTranslation();
    const { getField } = useCollection_deprecated();
    const fieldSchema = useFieldSchema();
    const drawingManagerRef = useRef<google.maps.drawing.DrawingManager>();
    const map = useRef<google.maps.Map>();
    const overlayRef = useRef<google.maps.Marker | google.maps.Polygon | google.maps.Polyline | google.maps.Circle>();
    const [needUpdateFlag, forceUpdate] = useState<any[]>([]);
    const [errMessage, setErrMessage] = useState('');
    const api = useAPIClient();
    const { modal } = App.useApp();
    const height = useMapHeight();

    const obj = {
      _isJSONSchemaObject: true,
      version: '2.0',
      'x-uid': 'zbjhncq2cq9',
      type: 'void',
      'x-component': 'MapBlock',
      'x-use-component-props': 'useMapBlockProps',
      'x-app-version': '1.5.7',
      'x-action-context': {
        dataSource: 'main',
        collection: 'community_halls_data',
      },
      'x-async': false,
      'x-index': 2,
      name: 'e36u0nf11zu',
    };

    const collectionName = fieldSchema['x-action-context']?.collection;
    // Conditional rendering based on collection name
    if (collectionName === 'engineering_data' || !collectionName) {
      return <MapOne ref={ref} {...props} />;
    } else {
      return <MapTwo ref={ref} {...props} />;
    }
  },
);

GoogleMapsComponent.displayName = 'GoogleMapsComponent';
