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
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import Graphic from '@arcgis/core/Graphic.js';
import Sketch from '@arcgis/core/widgets/Sketch.js';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import Point from '@arcgis/core/geometry/Point';

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
  /**
   * only ReadPretty
   */
  readonly: string;
  zoom: number;
  type: MapEditorType;
  style?: React.CSSProperties;
  overlayCommonOptions?: OverlayOptions;
  block?: boolean;
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

export const GoogleMapsComponent = React.forwardRef(
  (props: any, ref) => {
    const { value, onChange, block = false, readonly, disabled = block, zoom = 13, overlayCommonOptions, dataSource } = props;
    const { accessKey } = useMapConfiguration(props.mapType) || {};
    const { t } = useMapTranslation();
    const { getField } = useCollection_deprecated();
    const fieldSchema = useFieldSchema();
    console.log('fieldSchema', fieldSchema);
    const drawingManagerRef = useRef<google.maps.drawing.DrawingManager>();
    const map = useRef<google.maps.Map>();
    const overlayRef = useRef<google.maps.Marker | google.maps.Polygon | google.maps.Polyline | google.maps.Circle>();
    const [needUpdateFlag, forceUpdate] = useState([]);
    const [errMessage, setErrMessage] = useState('');
    const api = useAPIClient();
    const { modal } = App.useApp();
    const height = useMapHeight();
console.log('GoogleMapsComponent', dataSource);
    // useEffect(() => {
    //   if (map.current) {
    //     map.current.setZoom(zoom);
    //   }
    // }, [zoom]);

    const type = useMemo<MapEditorType>(() => {
      if (props.type) return props.type;
      const collectionField = getField(fieldSchema?.name);
      console.log('collectionField', collectionField);
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

    const onAndOffListenOverlay = useMemoizedFn((target: typeof overlayRef.current) => {
      cleanupOverlayListenersRef.current.forEach((cb) => {
        cleanupOverlayListenersRef.current.delete(cb);
      });

      if ('getPath' in target) {
        const mvcArray = target.getPath();
        ['insert_at', 'remove_at', 'set_at'].forEach((event) => {
          cleanupOverlayListenersRef.current.add(
            mvcArray.addListener(event, () => {
              onMapChange(target, true);
            }).remove,
          );
        });
      } else if (target instanceof google.maps.Circle) {
        ['center_changed', 'radius_changed'].forEach((event) => {
          cleanupOverlayListenersRef.current.add(
            target.addListener(event, () => {
              onMapChange(target, true);
            }).remove,
          );
        });
      }
    });

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
      // if (map.current && position) {
      //   map.current?.setCenter(position);
      //   map.current?.setZoom(zoom);
      // }
    });

    const setupOverlay = useMemoizedFn((nextOverlay: typeof overlayRef.current) => {
      toRemoveOverlay();
      onAndOffListenOverlay(nextOverlay);
      overlayRef.current = nextOverlay;
    });

    const setFitView = useMemoizedFn((overlays: google.maps.MVCObject[]) => {
      // const bounds = new google.maps.LatLngBounds();

      // overlays.forEach((overlay) => {
      //   if (overlay instanceof google.maps.Marker) {
      //     bounds.extend(overlay.getPosition());
      //   } else if (overlay instanceof google.maps.Polyline || overlay instanceof google.maps.Polygon) {
      //     const path = overlay.getPath();
      //     for (let i = 0; i < path.getLength(); i++) {
      //       bounds.extend(path.getAt(i));
      //     }
      //   } else if (overlay instanceof google.maps.Circle) {
      //     bounds.union(overlay.getBounds());
      //   }
      // });

      // map.current?.setCenter?.(bounds.getCenter());
    });

    const onFocusOverlay = () => {
      if (overlayRef.current) {
        setFitView([overlayRef.current]);
      }
    };

    const onMapChange = useMemoizedFn((target: typeof overlayRef.current, onlyChange = false) => {
      // let nextValue = null;

      // if (type === 'point') {
      //   const { lat, lng } = (target as google.maps.Marker).getPosition();
      //   nextValue = [lng(), lat()];
      // } else if (type === 'polygon' || type === 'lineString') {
      //   nextValue = (target as google.maps.Polyline)
      //     .getPath()
      //     .getArray()
      //     .map((item) => [item.lng(), item.lat()]);
      //   if (nextValue.length < 2) {
      //     return;
      //   }
      // } else if (type === 'circle') {
      //   const center = (target as google.maps.Circle).getCenter();
      //   const radius = (target as google.maps.Circle).getRadius();
      //   nextValue = [center.lng(), center.lat(), radius];
      // }

      // if (!onlyChange) {
      //   setupOverlay(target);
      // }
      // onChange?.(nextValue);
    });

    const createDraw = useMemoizedFn((onlyCreate = false, additionalOptions?: OverlayOptions) => {
      // const currentOptions = {
      //   ...commonOptions,
      //   ...additionalOptions,
      //   map: map.current,
      // };
      // drawingManagerRef.current = new google.maps.drawing.DrawingManager({
      //   drawingMode: drawingMode.current,
      //   drawingControl: false,
      //   markerOptions: { ...currentOptions, icon: getIcon(defaultImage) },
      //   polygonOptions: currentOptions,
      //   polylineOptions: currentOptions,
      //   circleOptions: currentOptions,
      //   map: map.current,
      // });

      // if (!onlyCreate) {
      //   drawingManagerRef.current.addListener('overlaycomplete', (event: { type: string; overlay: unknown }) => {
      //     const overlay = event.overlay as google.maps.Marker;
      //     onMapChange(overlay);
      //   });
      // }
      // return drawingManagerRef.current;
    });

    const getOverlay = useMemoizedFn((t = type, v = value, o?: OverlayOptions) => {
      const mapping = methodMapping[t];
      if (!mapping) {
        return;
      }
      const options = { ...commonOptions, icon: getIcon(defaultImage), ...o };

      if ('transformOptions' in mapping) {
        Object.assign(options, mapping.transformOptions(v));
      } else if ('propertyKey' in mapping) {
        options[mapping.propertyKey] = Array.isArray(v[0])
          ? v.map((item) => {
              return new google.maps.LatLng(item[1], item[0]);
            })
          : new google.maps.LatLng(v[1], v[0]);
      }

      const overlay = new google.maps[mapping.overlay](options);
      console.log('overlay', overlay);
      return overlay;
    });

    const setOverlay = useMemoizedFn((t = type, v = value, o?: OverlayOptions) => {
      if (!map.current) return;
      const nextOverlay = getOverlay(t, v, {
        ...o,
        map: map.current,
      }) as google.maps.Polyline;
      console.log('nextOverlay', nextOverlay);
      return nextOverlay;
    });
    const [error, setError] = useState('');
    const arcgisServiceUrl = "https://gisserver.neogeoinfo.in/server/rest/services/GHMC/GHMC/MapServer";
    const logoIcon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'; // Define the logoIcon variable with the correct path

    // edit mode
    useEffect(() => {
      // if (!value && map.current) {
      //   toRemoveOverlay();
      //   drawingManagerRef?.current?.setDrawingMode?.(drawingMode.current);
      //   onChange?.(null);
      // }
      // if (!map.current) return;
      // if (!value || (!readonly && overlayRef.current)) {
      //   return;
      // }
      // const nextOverlay = setOverlay();
      // setupOverlay(nextOverlay);
      // // Focus on the overlay
      // setFitView([nextOverlay]);
    }, [value, needUpdateFlag, type, disabled, readonly, setOverlay, setFitView, setupOverlay]);
    useEffect(() => {
      if (!mapContainerRef.current) return;

      try {
         // Create the GHMC layer
  const ghmcLayer = new MapImageLayer({
    url: 'https://gisserver.neogeoinfo.in/server/rest/services/GHMC/GHMC/MapServer',
    id: 'ghmc-layer',
    opacity: 1.0,
  });
  const map = new Map({
    basemap: 'topo-vector',
    layers: [ghmcLayer],
  });
         

          const view = new MapView({
              container: mapContainerRef.current,
              map: map,
              zoom: zoom,
              center: [78.5, 17.5],
          });

      

          view.when(() => {
            // ghmcLayer.when(() => {
            //   view.goTo(ghmcLayer.fullExtent).catch((error) => console.error(error));
            // });
          });
      
          // ✅ Create Graphics for Markers
          // const places = dataSource.map(item => ({
          //   title: item.name,
          //   latitude: item.location.split(", ")[0],
          //   longitude: item.location.split(", ")[1],
          //   description: `This is ${item.name}, located in ${item.zone}, ${item.circle}, ${item.ward}.`,
          // }));
      
            const places = dataSource
            .filter(item => item.location) // Filter out items without location
            .map(item => {
              const nameKey = Object.keys(item).find(key => key.includes("_name")) || "name";
              
              return {
              title: item[nameKey], // Set title using the first key that contains "_name"
              latitude: item.location.split(", ")[0],
              longitude: item.location.split(", ")[1],
              description: `Details: ${Object.entries(item)
                .map(([key, value]) => `<b>${key}</b>: ${value}`)
                .join(", ")}`,
              };
            });
          
          
          const createGraphic = (place: { title: string; longitude: number; latitude: number; description: string }) => {
            const point = new Point({
              longitude: place.longitude,
              latitude: place.latitude,
            });
      
            const symbol = {
              type: 'picture-marker',
              url: logoIcon, // Ensure this is accessible
              width: 40,
              height: 40,
            } as __esri.PictureMarkerSymbolProperties;
      
            return new Graphic({
              geometry: point,
              symbol: symbol,
              attributes: {
                title: place.title,
                description: place.description,
              },
              popupTemplate: {
                title: '{title}',
                content: '{description}',
              },
            });
          };
      
          // ✅ Update Graphics on Data Change
          const graphics = places.map(createGraphic);
          view.graphics.removeAll();
          view.graphics.addMany(graphics);
      
          return () => {
            view.destroy();
          };
         

          // viewRef.current = view;
      } catch (err) {
          setError("Failed to load ArcGIS: " + (err as Error).message);
      }
  }, [zoom, dataSource]);
    // useEffect(() => {
    //   if (!accessKey || map.current || !mapContainerRef.current) return;
    //   let loader: Loader;
    //   try {
    //     loader = new Loader({
    //       apiKey: accessKey,
    //       version: 'weekly',
    //       language: api.auth.getLocale(),
    //     });
    //   } catch (err) {
    //     setErrMessage(t('Load google maps failed, Please check the Api key and refresh the page'));
    //     return;
    //   }

    //   // google maps api error
    //   const error = console.error;
    //   console.error = (err, ...args) => {
    //     if (err?.includes('InvalidKeyMapError')) {
    //       setErrMessage(t('Load google maps failed, Please check the Api key and refresh the page'));
    //     }
    //     error(err, ...args);
    //   };

    //   Promise.all([loader.importLibrary('drawing'), loader.importLibrary('core'), loader.importLibrary('geometry')])
    //     .then(async (res) => {
    //       const center = await getCurrentPosition();
    //       map.current = new google.maps.Map(mapContainerRef.current, {
    //         zoom,
    //         center,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP,
    //         zoomControl: false,
    //         streetViewControl: false,
    //         panControl: false,
    //         mapTypeControl: false,
    //         fullscreenControl: false,
    //       });
    //       setErrMessage('');
    //       forceUpdate([]);
    //     })
    //     .catch((err) => {
    //       if (err instanceof Error) {
    //         setErrMessage(err.message);
    //         return;
    //       }
    //     });

    //   return () => {
    //     map.current?.unbindAll();
    //     map.current = null;
    //     drawingManagerRef.current?.unbindAll();
    //   };
    // }, [accessKey, api.auth, type, zoom]);

    // useEffect(() => {
    //   if (!map.current || !type || disabled || drawingManagerRef.current) return;
    //   createDraw();
    // }, [createDraw, disabled, needUpdateFlag, type]);

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

    const onReset = useMemoizedFn(() => {
      // const ok = () => {
      //   toRemoveOverlay();
      //   drawingManagerRef.current.setDrawingMode(drawingMode.current);
      //   onChange?.(null);
      // };
      // modal.confirm({
      //   title: t('Clear the canvas'),
      //   content: t('Are you sure to clear the canvas?'),
      //   okText: t('Confirm'),
      //   cancelText: t('Cancel'),
      //   getContainer: () => mapContainerRef.current,
      //   onOk() {
      //     ok();
      //   },
      // });
    });
    // const app = useApp();
    // if (!accessKey || errMessage) {
    //   return (
    //     <Alert
    //       action={
    //         <Button
    //           type="primary"
    //           onClick={() => navigate(app.pluginSettingsManager.getRoutePath('map') + '?tab=google')}
    //         >
    //           {t('Go to the configuration page')}
    //         </Button>
    //       }
    //       message={errMessage || t('Please configure the Api key first')}
    //       type="error"
    //     />
    //   );
    // }

    return (
      <div
        className={css`
          position: relative;
          height: ${height || 150}px !important;
        `}
      >
        {/* {!map.current && (
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
        )} */}
        {!disabled ? (
          <>
            <div className="ant-row ant-row-space-between ant-row-middle">
              <div
                className={css`
                  position: absolute;
                  top: 0px;
                  left: 200px;
                  z-index: 10;
                  display: flex;
                  gap: 10px;
                  background: white;
                  padding: 10px;
                  border-radius: 5px;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                `}
              >
                <label>
                  {t('Latitude')}
                  <input
                    type="text"
                    placeholder={t('Latitude ')}
                    value={value ? value[1] : ''}
                    onChange={(e) => {
                      const lat = parseFloat(e.target.value);
                      if (!isNaN(lat) && value) {
                        onChange?.([value[0], lat]);
                      }
                    }}
                    disabled={disabled}
                  />
                </label>
                <label>
                  {t('Longitude ')}
                  <input
                    type="text"
                    placeholder={t('Longitude')}
                    value={value ? value[0] : ''}
                    onChange={(e) => {
                      const lng = parseFloat(e.target.value);
                      if (!isNaN(lng) && value) {
                        onChange?.([lng, value[1]]);
                      }
                    }}
                    disabled={disabled}
                  />
                </label>
              </div>
           
                <Button
                  className={css`
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    z-index: 10;
                    display: flex;
                    gap: 10px;
                  `}
                  onClick={async () => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const { latitude, longitude } = position.coords;
                          onChange?.([longitude, latitude]);
                          toCenter({ lat: latitude, lng: longitude });
                          console.log('Latitude:', latitude);
                          console.log('Longitude:', longitude);
                        },
                        (error) => {
                          console.error('Error getting current position:', error);
                        },
                      );
                    } else
                     {
                      fetch(
                        'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyATlK8B6RftO7M2EwMnxWvHzYBqezrE1Kg',
                        {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                        },
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          onChange?.([data.location.lng, data.location.lat]);
                          toCenter({ lat: data.location.lat, lng: data.location.lng });
                        })
                        .catch((error) => console.error('Error:', error));
                    }
                    // const position = await getCurrentPosition();
                    // onChange?.([position.lng, position.lat]);
                    // toCenter(position);
                  }}
                  type="primary"
                  shape="round"
                  size="large"
                >
                  {t('Get Current Location')}
                </Button>
          
            </div>
            <div
              className={css`
                position: absolute;
                bottom: 80px;
                right: 20px;
                z-index: 10;
                display: none;
              `}
            >
              <Button
                onClick={onFocusOverlay}
                disabled={!overlayRef.current}
                type="primary"
                shape="round"
                size="large"
                icon={<SyncOutlined />}
              ></Button>
            </div>
            {type === 'lineString' || type === 'polygon' ? (
              <div
                className={css`
                  position: absolute;
                  bottom: 20px;
                  left: 10px;
                  z-index: 2;
                  pointer-events: none;
                  display: none;
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
                display: none;
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
        ></div>
      </div>
    );
  },
);
GoogleMapsComponent.displayName = 'GoogleMapsComponent';
