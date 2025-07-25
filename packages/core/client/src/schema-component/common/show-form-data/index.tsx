/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { observer, useForm } from '@formily/react';

/**
 * show form data for doc demo
 * @internal
 */
export const ShowFormData = observer(({ children }) => {
  const form = useForm();
  return (
    <>
      {
        <pre style={{ marginBottom: 20 }} data-testid="form-data">
          {JSON.stringify(form.values, null, 2)}
        </pre>
      }
      {children}
    </>
  );
});
