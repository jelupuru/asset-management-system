/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { css } from '@emotion/css';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { ColorPicker as AntdColorPicker, ColorPickerProps as AntdColorPickerProps } from 'antd';
import cls from 'classnames';
import React from 'react';

export interface ColorPickerProps extends Omit<AntdColorPickerProps, 'onChange'> {
  onChange?: (color: string) => void;
}

export const ColorPicker = connect(
  (props: ColorPickerProps) => {
    const { value, onChange, ...others } = props;
    return (
      <div role="button" aria-label="color-picker-normal" style={{ display: 'inline-block' }}>
        <AntdColorPicker
          value={value}
          trigger="hover"
          {...others}
          destroyTooltipOnHide
          // getPopupContainer={(current) => current}
          presets={[
            {
              label: 'Recommended',
              colors: [
                '#8BBB11',
                '#52C41A',
                '#13A8A8',
                '#1677FF',
                '#F5222D',
                '#FADB14',
                '#FA8C164D',
                '#FADB144D',
                '#52C41A4D',
                '#1677FF4D',
                '#2F54EB4D',
                '#722ED14D',
                '#EB2F964D',
              ],
            },
          ]}
          onChange={(color) => onChange(color.toHexString())}
        />
      </div>
    );
  },
  mapProps((props, field) => {
    return {
      ...props,
    };
  }),
  mapReadPretty((props) => {
    const prefixCls = usePrefixCls('description-color-picker', props);
    return (
      <div
        role="button"
        aria-label="color-picker-read-pretty"
        className={cls(
          prefixCls,
          css`
            display: inline-flex;
            .ant-color-picker-trigger-disabled {
              cursor: default;
            }
          `,
          props.className,
        )}
      >
        <AntdColorPicker disabled value={props.value} size="small" {...props} />
      </div>
    );
  }),
);

export default ColorPicker;
