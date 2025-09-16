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
    transformOptions(value) {
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
  onChange?: (value: number[]) => void;
  disabled?: boolean;
  mapType: string;
  readonly: string;
  zoom: number;
  type: MapEditorType;
  style?: React.CSSProperties;
  overlayCommonOptions?: OverlayOptions;
  block?: boolean;
  featureLayerUrl?: string; // ✅ ArcGIS FeatureLayer URL
}

export interface GoogleMapForwardedRefProps {
  setOverlay: (t: MapEditorType, v: any, o?: OverlayOptions) => google.maps.MVCObject;
  getOverlay: (t: MapEditorType, v: any, o?: OverlayOptions) => google.maps.MVCObject;
  setFitView: (overlays: google.maps.MVCObject[]) => void;
  createDraw: (onlyCreate?: boolean, additionalOptions?: OverlayOptions) => any;
  map: google.maps.Map;
  overlay: google.maps.MVCObject;
  drawingManager: google.maps.drawing.DrawingManager;
  errMessage?: string;
}

// ✅ ArcGIS FeatureLayer loader
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

    // Style ArcGIS features
    map.data.setStyle({
      fillColor: '#4e9bff',
      strokeColor: '#003366',
      strokeWeight: 2,
    });
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
    const [needUpdateFlag, forceUpdate] = useState([]);
    const [errMessage, setErrMessage] = useState('');
    const api = useAPIClient();
    const { modal } = App.useApp();
    const height = useMapHeight();

    useEffect(() => {
      if (map.current) {
        map.current.setZoom(zoom);
      }
    }, [zoom]);

    const type = useMemo<MapEditorType>(() => {
      if (props.type) return props.type;
      const collectionField = getField(fieldSchema?.name);
      return collectionField?.interface;
    }, [props?.type, fieldSchema?.name]);

    const drawingMode = useRef(getDrawingMode(type) as google.maps.drawing.OverlayType);

    const [commonOptions] = useState<OverlayOptions>({
      strokeWeight: 5,
      strokeColor: '#4e9bff',
      fillColor: '#4e9bff',
      strokeOpacity: 1,
      editable: !disabled,
      draggable: !disabled,
      ...overlayCommonOptions,
    });

    const navigate = useNavigateNoUpdate();
    const mapContainerRef = useRef<HTMLDivElement>();
    const cleanupOverlayListenersRef = useRef<Set<() => void>>(new Set());

    const toRemoveOverlay = useMemoizedFn(() => {
      if (overlayRef.current) {
        overlayRef.current.unbindAll();
        overlayRef.current.setMap(null);
      }
      if (type !== 'point') {
        drawingManagerRef.current?.setDrawingMode(null);
      }
    });

    const toCenter = useMemoizedFn((position) => {
      if (map.current && position) {
        map.current?.setCenter(position);
        map.current?.setZoom(zoom);
      }
    });

    const setupOverlay = useMemoizedFn((nextOverlay: typeof overlayRef.current) => {
      toRemoveOverlay();
      overlayRef.current = nextOverlay;
    });

    const setFitView = useMemoizedFn((overlays: google.maps.MVCObject[]) => {
      const bounds = new google.maps.LatLngBounds();
      overlays.forEach((overlay) => {
        if (overlay instanceof google.maps.Marker) {
          bounds.extend(overlay.getPosition());
        } else if (overlay instanceof google.maps.Polyline || overlay instanceof google.maps.Polygon) {
          const path = overlay.getPath();
          for (let i = 0; i < path.getLength(); i++) {
            bounds.extend(path.getAt(i));
          }
        } else if (overlay instanceof google.maps.Circle) {
          bounds.union(overlay.getBounds());
        }
      });
      map.current?.setCenter?.(bounds.getCenter());
    });

    const onFocusOverlay = () => {
      if (overlayRef.current) {
        setFitView([overlayRef.current]);
      }
    };

    const createDraw = useMemoizedFn((onlyCreate = false, additionalOptions?: OverlayOptions) => {
      const currentOptions = {
        ...commonOptions,
        ...additionalOptions,
        map: map.current,
      };
      drawingManagerRef.current = new google.maps.drawing.DrawingManager({
        drawingMode: drawingMode.current,
        drawingControl: false,
        markerOptions: { ...currentOptions, icon: getIcon(defaultImage) },
        polygonOptions: currentOptions,
        polylineOptions: currentOptions,
        circleOptions: currentOptions,
        map: map.current,
      });

      return drawingManagerRef.current;
    });

    const getOverlay = useMemoizedFn((t = type, v = value, o?: OverlayOptions) => {
      const mapping = methodMapping[t];
      if (!mapping) return;
      const options = { ...commonOptions, icon: getIcon(defaultImage), ...o };

      if ('transformOptions' in mapping) {
        Object.assign(options, mapping.transformOptions(v));
      } else if ('propertyKey' in mapping) {
        options[mapping.propertyKey] = Array.isArray(v[0])
          ? v.map((item) => new google.maps.LatLng(item[1], item[0]))
          : new google.maps.LatLng(v[1], v[0]);
      }
      return new google.maps[mapping.overlay](options);
    });

    const setOverlay = useMemoizedFn((t = type, v = value, o?: OverlayOptions) => {
      if (!map.current) return;
      return getOverlay(t, v, { ...o, map: map.current }) as google.maps.Polyline;
    });

    // Init Google Maps
    useEffect(() => {
      if (!accessKey || map.current || !mapContainerRef.current) return;
      let loader: Loader;
      try {
        loader = new Loader({
          apiKey: accessKey,
          version: 'weekly',
          language: api.auth.getLocale(),
        });
      } catch (err) {
        setErrMessage(t('Load google maps failed, Please check the Api key and refresh the page'));
        return;
      }

      Promise.all([loader.importLibrary('drawing'), loader.importLibrary('core'), loader.importLibrary('geometry')])
        .then(async () => {
          const center = await getCurrentPosition();
          map.current = new google.maps.Map(mapContainerRef.current, {
            zoom,
            center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          });
          setErrMessage('');
          forceUpdate([]);

          // ✅ Load ArcGIS FeatureLayer if provided or fallback to default
          const defaultFeatureLayerUrl =
            'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3';

          if (featureLayerUrl) {
            loadArcGISFeatureLayer(map.current, featureLayerUrl);
          } else {
            console.warn('No FeatureLayer URL provided, loading default layer.');
            loadArcGISFeatureLayer(map.current, defaultFeatureLayerUrl);
          }
        })
        .catch((err) => {
          if (err instanceof Error) {
            setErrMessage(err.message);
          }
        });

      return () => {
        map.current?.unbindAll();
        map.current = null;
        drawingManagerRef.current?.unbindAll();
      };
    }, [accessKey, api.auth, type, zoom, featureLayerUrl]);

    useImperativeHandle(ref, () => ({
      setOverlay,
      getOverlay,
      setFitView,
      createDraw,
      map: map.current,
      overlay: overlayRef.current,
      drawingManager: drawingManagerRef.current,
      errMessage,
    }));

    const app = useApp();
    if (!accessKey || errMessage) {
      return (
        <Alert
          action={
            <Button
              type="primary"
              onClick={() => navigate(app.pluginSettingsManager.getRoutePath('map') + '?tab=google')}
            >
              {t('Go to the configuration page')}
            </Button>
          }
          message={errMessage || t('Please configure the Api key first')}
          type="error"
        />
      );
    }

    return (
      <div
        className={css`
          position: relative;
          height: ${height || 500}px !important;
        `}
      >
        {!map.current && (
          <div
            className={css`
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <Spin />
          </div>
        )}
        {map.current && <Search toCenter={toCenter} mapRef={map} />}
        <div
          ref={mapContainerRef}
          className={css`
            width: 100%;
            height: 100%;
          `}
          style={props?.style}
        />
      </div>
    );
  },
);

GoogleMapsComponent.displayName = 'GoogleMapsComponent';
