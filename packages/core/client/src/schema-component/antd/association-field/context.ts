/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { GeneralField } from '@formily/core';
import { Schema } from '@formily/react';
import { createContext } from 'react';

export interface AssociationFieldContextProps {
  options?: any;
  field?: GeneralField;
  fieldSchema?: Schema;
  currentMode?: string;
  allowMultiple?: boolean;
  allowDissociate?: boolean;
}

export const AssociationFieldContext = createContext<AssociationFieldContextProps>({});
AssociationFieldContext.displayName = 'AssociationFieldContext';
