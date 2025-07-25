/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Radio } from 'antd';
import { connect } from '@formily/react';
import React from 'react';
import { Button } from 'antd-mobile';

const colors = ['default', 'primary', 'success', 'danger', 'warning'];
export const ActionColorSelect = connect((props) => {
  return (
    <Radio.Group {...props}>
      {colors.map((color) => {
        return (
          <Radio value={color} key={color}>
            <Button
              color={color as any}
              size="mini"
              style={{ width: 10, height: 18 }}
              onClick={() => props.onChange(color)}
            ></Button>
          </Radio>
        );
      })}
    </Radio.Group>
  );
});
