/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { connect, useField } from '@formily/react';
import { Checkbox } from 'antd';
import { Field } from '@formily/core';

export const ChartFilterCheckbox = connect((props) => {
  const { content } = props;
  const field = useField<Field>();
  const handleClick = () => {
    field.setValue(!field.value);
  };
  return (
    <Checkbox onClick={handleClick} checked={field.value}>
      {content}
    </Checkbox>
  );
});
