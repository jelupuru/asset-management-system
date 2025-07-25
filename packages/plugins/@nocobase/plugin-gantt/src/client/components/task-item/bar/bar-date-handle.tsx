/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';

type BarDateHandleProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  barCornerRadius: number;
  onMouseDown: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
};
export const BarDateHandle: React.FC<BarDateHandleProps> = ({ x, y, width, height, barCornerRadius, onMouseDown }) => {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      className={'barHandle'}
      role="button"
      ry={barCornerRadius}
      rx={barCornerRadius}
      onMouseDown={onMouseDown}
    />
  );
};
