/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useFieldSchema } from '@formily/react';
import { theme } from 'antd';
import { useDesignable } from '../../';
import { useBlockHeightProps } from '../../../block-provider/hooks/useBlockHeightProps';
import { useDataBlockRequestData } from '../../../data-source';
import { useDataBlockHeight } from '../../hooks/useBlockSize';
import { useFormDataTemplates } from './Templates';

export const useFormBlockHeight = () => {
  const height = useDataBlockHeight();
  const schema = useFieldSchema();
  const { token } = theme.useToken();
  const { designable } = useDesignable();
  const { heightProps } = useBlockHeightProps() || {};
  const { title } = heightProps || {};
  const { display, enabled } = useFormDataTemplates();
  const actionSchema: any = schema.reduceProperties((buf, s) => {
    if (s['x-component'] === 'ActionBar') {
      return s;
    }
    return buf;
  });

  const hasFormActions = Object.keys(actionSchema?.properties || {}).length > 0;
  const isFormBlock = schema?.parent?.['x-decorator']?.includes?.('FormBlockProvider');
  const actionBarHeight =
    hasFormActions || designable ? token.controlHeight + (isFormBlock ? 1 : 2) * token.marginLG : token.marginLG;
  const blockTitleHeaderHeight = title ? token.fontSizeLG * token.lineHeightLG + token.padding * 2 - 1 : 0;
  const data = useDataBlockRequestData();
  const { count, pageSize } = (data as any)?.meta || ({} as any);
  const hasPagination = count > pageSize;
  const paginationHeight = hasPagination ? token.controlHeightSM + 1 * token.paddingLG : 0;
  const dataTemplateHeight = display && enabled ? token.controlHeight + 2 * token.padding + token.margin : 0;
  return height - actionBarHeight - token.paddingLG - blockTitleHeaderHeight - paginationHeight - dataTemplateHeight;
};
