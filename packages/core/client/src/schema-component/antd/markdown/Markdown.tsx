/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { LoadingOutlined } from '@ant-design/icons';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { Input as AntdInput, Spin } from 'antd';
import React, { useMemo } from 'react';
import { useGlobalTheme } from '../../../global-theme';
import { ReadPretty as InputReadPretty } from '../input';
import { MarkdownVoid } from './Markdown.Void';
import { useStyles } from './style';
import { convertToText, useParseMarkdown } from './util';

export const Markdown: any = connect(
  AntdInput.TextArea,
  mapProps((props: any, field) => {
    return {
      autoSize: {
        maxRows: 10,
        minRows: 3,
      },
      ...props,
      suffix: <span>{field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffix}</span>,
    };
  }),
  mapReadPretty((props) => <MarkdownReadPretty {...props} />),
);

export const MarkdownReadPretty = (props) => {
  const { isDarkTheme } = useGlobalTheme();
  const { wrapSSR, hashId, componentCls: className } = useStyles({ isDarkTheme });
  const { html = '', loading } = useParseMarkdown(props.value);
  const text = useMemo(() => convertToText(html), [html]);

  if (loading) {
    return wrapSSR(<Spin />);
  }

  const value = (
    <div
      className={`${hashId} ${className} nb-markdown nb-markdown-default nb-markdown-table`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );

  return wrapSSR(<InputReadPretty.TextArea {...props} autop={false} text={text} value={value} />);
};

Markdown.Void = MarkdownVoid;

export default Markdown;
