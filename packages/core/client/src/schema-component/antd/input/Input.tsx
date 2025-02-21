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
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude;
  //         const lng = position.coords.longitude;
  //         setLocation(`${lat}, ${lng}`);
  //       },
  //       (error) => {
  //         console.error('Error getting location:', error);
  //       },
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // };

  const getLocation = () => {
    fetch("https://ipinfo.io/json")
      .then(response => response.json())
      .then(data => {
        console.log("IP Address:", data.ip);
        console.log("Location:", data.city, data.region, data.country);
        console.log("Coordinates:", data.loc); // Format: "latitude,longitude"
  
        const [latitude, longitude] = data.loc.split(",");
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        setLocation(`${latitude}, ${longitude}`);
      })
      .catch(error => console.error("Error fetching IP location:", error));
  };

  return (
    <AntdInput
      {...props}
      value={location}
      readOnly
      placeholder="Latitude, Longitude"
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
