/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createStyles, cx } from '@nocobase/client';
import { Tag } from 'antd';
import React from 'react';

const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      margin-bottom: 1.5em;
      padding: 1em;
      background-color: ${token.colorFillAlter};

      > *:last-child {
        margin-bottom: 0;
      }

      dl {
        display: flex;
        align-items: baseline;

        dt {
          color: ${token.colorText};
          &:after {
            content: ':';
            margin-right: 0.5em;
          }
        }
      }

      p {
        color: ${token.colorTextDescription};
      }
    `,
  };
});

export function DrawerDescription(props) {
  const { label, title, description } = props;
  const { styles } = useStyles();

  return (
    <div className={cx(styles.container, props.className)}>
      <dl>
        <dt>{label}</dt>
        <dd>
          <Tag style={{ background: 'none' }}>{title}</Tag>
        </dd>
      </dl>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
