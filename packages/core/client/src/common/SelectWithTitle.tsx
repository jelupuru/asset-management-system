/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Select } from 'antd';
import React, { useRef, useState } from 'react';

export interface SelectWithTitleProps {
  title?: any;
  defaultValue?: any;
  options?: any;
  fieldNames?: any;
  onChange?: (...args: any[]) => void;
}

export function SelectWithTitle({ title, defaultValue, onChange, options, fieldNames }: SelectWithTitleProps) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<any>(null);
  return (
    <div
      style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((v) => !v);
      }}
      onMouseLeave={() => {
        timerRef.current = setTimeout(() => {
          setOpen(false);
        }, 200);
      }}
    >
      {title}
      <Select
        open={open}
        data-testid={`select-${title}`}
        popupMatchSelectWidth={false}
        bordered={false}
        defaultValue={defaultValue}
        onChange={onChange}
        popupClassName={`select-popup-${title.replaceAll(' ', '-')}`}
        fieldNames={fieldNames}
        options={options}
        style={{ textAlign: 'right', minWidth: 100 }}
        onMouseEnter={() => {
          clearTimeout(timerRef.current);
        }}
      />
    </div>
  );
}
