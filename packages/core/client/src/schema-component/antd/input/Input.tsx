/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { LoadingOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { Input as AntdInput, Button } from 'antd';
import { InputProps, TextAreaProps } from 'antd/es/input';
import React, { useState } from 'react';
import { JSONTextAreaProps, Json } from './Json';
import { InputReadPrettyComposed, ReadPretty } from './ReadPretty';

export { ReadPretty as InputReadPretty } from './ReadPretty';

type ComposedInput = React.FC<InputProps> & {
  ReadPretty: InputReadPrettyComposed['Input'];
  TextArea: React.FC<TextAreaProps> & { ReadPretty: InputReadPrettyComposed['TextArea'] };
  URL: React.FC<InputProps> & { ReadPretty: InputReadPrettyComposed['URL'] };
  JSON: React.FC<JSONTextAreaProps> & { ReadPretty: InputReadPrettyComposed['JSON'] };
  Location: React.FC<InputProps> & { ReadPretty: InputReadPrettyComposed['Location'] };
};

const LocationInput: React.FC<InputProps> = (props) => {
  const [location, setLocation] = useState('');

  // const getLocation = () => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude;
  //         const lng = position.coords.longitude;
  //         console.log(`Latitude: ${lat}, Longitude: ${lng}`);
  //         setLocation(`${lat}, ${lng}`);
  //       },
  //       (error) => {
  //         switch (error.code) {
  //           case error.PERMISSION_DENIED:
  //             console.error("User denied the request for Geolocation.");
  //             break;
  //           case error.POSITION_UNAVAILABLE:
  //             console.error("Location information is unavailable.");
  //             break;
  //           case error.TIMEOUT:
  //             console.error("The request to get user location timed out.");
  //             break;
  //         }
  //       },
  //       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // };
  

  const { value, onChange, } = props;
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`GPS Location: ${lat}, ${lng}`);
          const event = { target: { value: `${lat}, ${lng}` } } as React.ChangeEvent<HTMLInputElement>;
          onChange(event);
          setLocation(`${lat}, ${lng}`);
        },
        async (error) => {
          console.error("GPS error, using Google API:", error);
          try {
            const response = await fetch(
              "https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY",
              { method: "POST", headers: { "Content-Type": "application/json" } }
            );
            const data = await response.json();
            const event = { target: { value: `${data.location.lat}, ${data.location.lng}` } } as React.ChangeEvent<HTMLInputElement>;
            onChange(event);
            setLocation(`${data.location.lat}, ${data.location.lng}`);
          } catch (apiError) {
            console.error("Google API Error:", apiError);
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  
  // const getLocation = () => {
  //   fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyATlK8B6RftO7M2EwMnxWvHzYBqezrE1Kg", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" }
  // })
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log("Latitude:", data.location.lat);
  //         console.log("Longitude:", data.location.lng);
  //         const event = { target: { value: `${data.location.lat}, ${data.location.lng}` } } as React.ChangeEvent<HTMLInputElement>;
  //         onChange(event);
  //         setLocation(`${data.location.lat}, ${data.location.lng}`);
  //     })
  //     .catch(error => console.error("Error:", error));
  
  // };

  return (
    <AntdInput
      {...props}
      value={location || value}
      placeholder="Latitude, Longitude"
      onChange={(e) => {
        setLocation(e.target.value);
        onChange(e);
      }}
      allowClear
      addonAfter={
        <Button type="primary" onClick={getLocation} icon={<EnvironmentOutlined />}>
          Get Location
        </Button>
      }
    />
  );
};

export const Input: ComposedInput = Object.assign(
  connect(
    AntdInput,
    mapProps((props, field) => {
      return {
        ...props,
        suffix: <span>{field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffix}</span>,
      };
    }),
    mapReadPretty(ReadPretty.Input),
  ),
  {
    TextArea: connect(
      AntdInput.TextArea,
      mapProps((props, field) => {
        return {
          autoSize: {
            maxRows: 10,
            minRows: 3,
          },
          ...props,
        };
      }),
      mapReadPretty(ReadPretty.TextArea),
    ),
    URL: connect(AntdInput, mapReadPretty(ReadPretty.URL)),
    JSON: connect(Json, mapReadPretty(ReadPretty.JSON)),
    Location: connect(LocationInput, mapReadPretty(ReadPretty.Input)), // Added Location input type
    ReadPretty: ReadPretty.Input,
    Preview: ReadPretty.Preview,
  } as unknown as ComposedInput,
);

Input.displayName = 'Input';

export default Input;
