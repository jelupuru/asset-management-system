/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useMemo } from 'react';
import { Templates } from '../..';
import { useFormBlockContext } from '../../../block-provider/FormBlockProvider';
import { withDynamicSchemaProps } from '../../../hoc/withDynamicSchemaProps';
import { withSkeletonComponent } from '../../../hoc/withSkeletonComponent';
import { useToken } from '../../../style';
import { Form } from './Form';

export const FormWithDataTemplates: any = withDynamicSchemaProps(
  withSkeletonComponent((props) => {
    const formBlockCtx = useFormBlockContext();
    const { token } = useToken();
    const style = useMemo(() => ({ marginBottom: token.margin }), [token.margin]);
    return (
      <>
        <Templates style={style} form={props.form || formBlockCtx?.form} />
        <Form {...props} />
      </>
    );
  }),
);

FormWithDataTemplates.displayName = 'FormWithDataTemplates';
