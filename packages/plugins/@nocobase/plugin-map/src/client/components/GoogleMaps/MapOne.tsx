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
  "_isJSONSchemaObject": true,
  "version": "2.0",
  "x-uid": "zbjhncq2cq9",
  "type": "void",
  "x-component": "MapBlock",
  "x-use-component-props": "useMapBlockProps",
  "x-app-version": "1.5.7",
  "x-action-context": {
    "dataSource": "main",
    "collection": "community_halls_data"
  },
  "x-async": false,
  "x-index": 2,
  "name": "e36u0nf11zu"
};

const collectionName = fieldSchema["x-action-context"]?.collection;
console.log("collectionName",   collectionName); // 👉 "community_halls_data"


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
    // store removal functions for listeners
    const cleanupOverlayListenersRef = useRef<Set<() => void>>(new Set());

    // attach/detach listeners for overlay edits (path changes, circle center/radius)
    const onAndOffListenOverlay = useMemoizedFn((target: typeof overlayRef.current) => {
      // remove previous listeners
      cleanupOverlayListenersRef.current.forEach((removeFn) => {
        try {
          removeFn();
        } catch (e) {
          // ignore
        }
      });
      cleanupOverlayListenersRef.current.clear();

      if (!target) return;

      if ('getPath' in target && typeof (target as any).getPath === 'function') {
        const mvcArray: google.maps.MVCArray<google.maps.LatLng> = (target as any).getPath();
        ['insert_at', 'remove_at', 'set_at'].forEach((event) => {
          const listener = mvcArray.addListener(event as any, () => {
            onMapChange(target, true);
          });
          cleanupOverlayListenersRef.current.add(() => listener.remove());
        });
      } else if (target instanceof google.maps.Circle) {
        ['center_changed', 'radius_changed'].forEach((event) => {
          const listener = (target as google.maps.Circle).addListener(event as any, () => {
            onMapChange(target, true);
          });
          cleanupOverlayListenersRef.current.add(() => listener.remove());
        });
      }
    });

    const toRemoveOverlay = useMemoizedFn(() => {
      if (overlayRef.current) {
        try {
          // try to remove listeners attached to overlay
          cleanupOverlayListenersRef.current.forEach((removeFn) => {
            try {
              removeFn();
            } catch (e) {}
          });
          cleanupOverlayListenersRef.current.clear();

          overlayRef.current.unbindAll?.();
        } catch (e) {
          // ignore
        }
        overlayRef.current.setMap?.(null);
      }
      if (type !== 'point') {
        drawingManagerRef.current?.setDrawingMode?.(null);
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
      onAndOffListenOverlay(nextOverlay);
      overlayRef.current = nextOverlay;
    });

    const setFitView = useMemoizedFn((overlays: google.maps.MVCObject[]) => {
      const bounds = new google.maps.LatLngBounds();
      overlays.forEach((overlay) => {
        if (overlay instanceof google.maps.Marker) {
          bounds.extend(overlay.getPosition() as google.maps.LatLng);
        } else if (overlay instanceof google.maps.Polyline || overlay instanceof google.maps.Polygon) {
          const path = overlay.getPath();
          for (let i = 0; i < path.getLength(); i++) {
            bounds.extend(path.getAt(i));
          }
        } else if (overlay instanceof google.maps.Circle) {
          bounds.union(overlay.getBounds() as google.maps.LatLngBounds);
        }
      });
      map.current?.setCenter?.(bounds.getCenter());
    });

    const onFocusOverlay = () => {
      if (overlayRef.current) {
        setFitView([overlayRef.current]);
      }
    };

    const onMapChange = useMemoizedFn((target: typeof overlayRef.current, onlyChange = false) => {
      let nextValue: any = null;

      if (!target) {
        onChange?.(null);
        return;
      }

      if (type === 'point') {
        const pos = (target as google.maps.Marker).getPosition();
        if (!pos) return;
        nextValue = [pos.lng(), pos.lat()];
      } else if (type === 'polygon' || type === 'lineString') {
        const arr = (target as google.maps.Polyline)
          .getPath()
          .getArray()
          .map((item) => [item.lng(), item.lat()]);
        if (arr.length < 2) {
          return;
        }
        nextValue = arr;
      } else if (type === 'circle') {
        const center = (target as google.maps.Circle).getCenter();
        const radius = (target as google.maps.Circle).getRadius();
        nextValue = [center.lng(), center.lat(), radius];
      }

      if (!onlyChange) {
        setupOverlay(target);
      }
      onChange?.(nextValue);
    });

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

      // attach overlaycomplete to capture created overlay
      if (!onlyCreate) {
        drawingManagerRef.current.addListener('overlaycomplete', (event: any) => {
          // event.overlay is the created overlay (Marker/Polygon/Polyline/Circle)
          const overlay = event.overlay as
            | google.maps.Marker
            | google.maps.Polygon
            | google.maps.Polyline
            | google.maps.Circle;
          // Make sure drawing stops if not point type
          if (type !== 'point') {
            drawingManagerRef.current?.setDrawingMode?.(null);
          }
          onMapChange(overlay);
        });
      }

      return drawingManagerRef.current;
    });
    const overlayConstructorsRef = useRef<Record<string, any>>({});

    useEffect(() => {
      if (window.google) {
        overlayConstructorsRef.current = {
          Marker: window.google.maps.Marker,
          Polygon: window.google.maps.Polygon,
          Polyline: window.google.maps.Polyline,
          Circle: window.google.maps.Circle,
        };
      }
    }, []);

    // ✅ Safe Overlay constructors map
    const getOverlayConstructors = () => {
      if (typeof window === 'undefined' || !window.google || !window.google.maps) {
        return {};
      }
      return {
        Marker: window.google.maps.Marker,
        Polygon: window.google.maps.Polygon,
        Polyline: window.google.maps.Polyline,
        Circle: window.google.maps.Circle,
      };
    };

    const getOverlay = useMemoizedFn((t = type, v = value, o?: OverlayOptions) => {
      const mapping: any = (methodMapping as any)[t];
      if (!mapping) return;

      const options: any = { ...commonOptions, icon: getIcon(defaultImage), ...o };

      if ('transformOptions' in mapping && typeof mapping.transformOptions === 'function') {
        Object.assign(options, mapping.transformOptions(v));
      } else if ('propertyKey' in mapping) {
        if (!v) return;
        options[mapping.propertyKey] = Array.isArray(v[0])
          ? v.map((item: any) => new window.google.maps.LatLng(item[1], item[0]))
          : new window.google.maps.LatLng(v[1], v[0]);
      }

      const overlayConstructors = getOverlayConstructors();
      const Ctor = overlayConstructors[mapping.overlay];
      if (!Ctor) return;

      return new Ctor(options) as google.maps.MVCObject;
    });

    const setOverlay = useMemoizedFn((t = type, v = value, o?: OverlayOptions) => {
      if (!map.current) return;
      const nextOverlay = getOverlay(t, v, {
        ...o,
        map: map.current,
      }) as google.maps.MVCObject;
      return nextOverlay;
    });

    // edit mode: when value present, create overlay for edit / view
    useEffect(() => {
      if (!value && map.current) {
        toRemoveOverlay();
        drawingManagerRef?.current?.setDrawingMode?.(drawingMode.current);
        onChange?.(null);
      }
      if (!map.current) return;
      if (!value || (!readonly && overlayRef.current)) {
        return;
      }
      const nextOverlay = setOverlay();
      if (nextOverlay) {
        setupOverlay(nextOverlay as any);
        setFitView([nextOverlay]);
      }
    }, [value, needUpdateFlag, type, disabled, readonly, setOverlay, setFitView, setupOverlay]);

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

      // google maps api error
      const origConsoleError = console.error;
      console.error = (err: any, ...args: any[]) => {
        try {
          if (typeof err === 'string' && err.includes('InvalidKeyMapError')) {
            setErrMessage(t('Load google maps failed, Please check the Api key and refresh the page'));
          }
        } catch (e) {}
        origConsoleError(err, ...args);
      };

      Promise.all([loader.importLibrary('drawing'), loader.importLibrary('core'), loader.importLibrary('geometry')])
        .then(async () => {
          const center = await getCurrentPosition();
          map.current = new google.maps.Map(mapContainerRef.current as HTMLElement, {
            zoom,
            center,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            streetViewControl: false,
            panControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          });
          setErrMessage('');
          forceUpdate([]);

          // Load ArcGIS FeatureLayer if provided or fallback to default https://gisserver.neogeoinfo.in/server/rest/services/GHMC/GHMC_utility/MapServer
          const defaultFeatureLayerUrl =
            'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer';
            console.log('defaultFeatureLayerUrl', defaultFeatureLayerUrl);
          const urlToLoad = featureLayerUrl || defaultFeatureLayerUrl;
          if (urlToLoad) {
            loadArcGISFeatureLayer(map.current, urlToLoad);
          }
        })
        .catch((err) => {
          if (err instanceof Error) {
            setErrMessage(err.message);
            return;
          }
        });

      return () => {
        // restore console.error
        console.error = origConsoleError;
        try {
          cleanupOverlayListenersRef.current.forEach((removeFn) => {
            try {
              removeFn();
            } catch (e) {}
          });
          cleanupOverlayListenersRef.current.clear();
          map.current?.unbindAll?.();
        } catch (e) {}
        map.current = undefined as any;
        drawingManagerRef.current?.unbindAll?.();
      };
    }, [accessKey, api.auth, type, zoom, featureLayerUrl]);

    useEffect(() => {
      if (!map.current || !type || disabled || drawingManagerRef.current) return;
      createDraw();
    }, [createDraw, disabled, needUpdateFlag, type]);

    // Imperative handle must contain all methods required by interface
    useImperativeHandle(ref, () => ({
      setOverlay: (t: MapEditorType, v: any, o?: OverlayOptions) => setOverlay(t, v, o) as any,
      getOverlay: (t: MapEditorType, v: any, o?: OverlayOptions) => getOverlay(t, v, o) as any,
      setFitView: (overlays: google.maps.MVCObject[]) => setFitView(overlays),
      createDraw: (onlyCreate?: boolean, additionalOptions?: OverlayOptions) =>
        createDraw(onlyCreate, additionalOptions),
      map: map.current,
      overlay: overlayRef.current,
      drawingManager: drawingManagerRef.current,
      errMessage,
    }));

    const onReset = useMemoizedFn(() => {
      const ok = () => {
        toRemoveOverlay();
        drawingManagerRef.current?.setDrawingMode?.(drawingMode.current);
        onChange?.(null);
      };
      modal.confirm({
        title: t('Clear the canvas'),
        content: t('Are you sure to clear the canvas?'),
        okText: t('Confirm'),
        cancelText: t('Cancel'),
        getContainer: () => mapContainerRef.current,
        onOk() {
          ok();
        },
      });
    });

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
        {!disabled ? (
          <>
            {map.current && <Search toCenter={toCenter} mapRef={map} />}
            <div
              className={css`
                position: absolute;
                bottom: 80px;
                right: 20px;
                z-index: 10;
              `}
            >
              <Button
                onClick={onFocusOverlay}
                disabled={!overlayRef.current}
                type="primary"
                shape="round"
                size="large"
                icon={<SyncOutlined />}
              />
            </div>
            {type === 'lineString' || type === 'polygon' ? (
              <div
                className={css`
                  position: absolute;
                  bottom: 20px;
                  left: 10px;
                  z-index: 2;
                  pointer-events: none;
                `}
              >
                <Alert
                  message={t('Click to select the starting point and double-click to end the drawing')}
                  type="info"
                />
              </div>
            ) : null}
            <div
              className={css`
                position: absolute;
                bottom: 20px;
                right: 20px;
                z-index: 2;
              `}
            >
              <Button
                disabled={!value}
                style={{
                  height: '40px',
                }}
                onClick={onReset}
                type="primary"
                danger
              >
                {t('Clear')}
              </Button>
            </div>
          </>
        ) : null}
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
