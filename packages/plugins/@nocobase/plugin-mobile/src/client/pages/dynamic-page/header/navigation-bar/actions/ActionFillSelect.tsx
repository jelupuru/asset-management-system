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

const fillList = ['solid', 'outline'];
export const ActionFillSelect = connect((props) => {
  return (
    <Radio.Group {...props}>
      {fillList.map((fill) => {
        return (
          <Radio value={fill} key={fill}>
            <Button
              color="primary"
              size="mini"
              fill={fill as any}
              style={{ width: 10, height: 18 }}
              onClick={() => props.onChange(fill)}
            ></Button>
          </Radio>
        );
      })}
    </Radio.Group>
  );
});
