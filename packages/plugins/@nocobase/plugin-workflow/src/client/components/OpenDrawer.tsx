/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useState } from 'react';
import { useFieldSchema } from '@formily/react';

import { ActionContextProvider, SchemaComponent } from '@nocobase/client';

export default function ({ component = 'div', children, ...props }) {
  const [visible, setVisible] = useState(false);
  const fieldSchema = useFieldSchema();
  return (
    <ActionContextProvider value={{ visible, setVisible, fieldSchema }}>
      {React.createElement(
        component,
        {
          ...props,
          onClick() {
            setVisible(true);
          },
        },
        children,
      )}
      <SchemaComponent schema={fieldSchema} onlyRenderProperties />
    </ActionContextProvider>
  );
}
