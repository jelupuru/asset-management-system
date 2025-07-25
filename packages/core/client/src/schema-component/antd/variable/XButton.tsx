/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Button, ButtonProps } from 'antd';
import React, { forwardRef, useMemo } from 'react';

export const XButton = forwardRef((props: ButtonProps, ref: any) => {
  const style = useMemo(() => {
    return {
      fontStyle: 'italic',
      fontFamily: 'New York, Times New Roman, Times, serif',
    };
  }, []);

  return (
    <Button aria-label="variable-button" ref={ref} style={style} {...props}>
      x{props.children}
    </Button>
  );
});
XButton.displayName = 'XButton';
