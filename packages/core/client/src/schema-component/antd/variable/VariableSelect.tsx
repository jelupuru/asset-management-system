/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { cx } from '@emotion/css';
import { Cascader } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToken } from '../__builtins__';
import useStyles from './VariableSelect.style';
import { XButton } from './XButton';

export function VariableSelect({
  options,
  setOptions,
  onInsert,
  changeOnSelect = false,
  fieldNames = {},
  className,
}: {
  options: any[];
  setOptions: (options: any) => void;
  onInsert: (keyPaths: string[]) => void;
  changeOnSelect?: boolean;
  fieldNames?: any;
  className?: string;
}): JSX.Element {
  const { t } = useTranslation();
  const [selectedVar, setSelectedVar] = useState<string[]>([]);
  const { wrapSSR, componentCls, hashId } = useStyles();
  const { token } = useToken();

  async function loadData(selectedOptions) {
    const option = selectedOptions[selectedOptions.length - 1];
    if (!option.children?.length && !option.isLeaf && option.loadChildren) {
      await option.loadChildren(option);
      setOptions((prev) => [...prev]);
    }
  }

  return wrapSSR(
    <XButton className={cx('x-button', componentCls, hashId, className)}>
      <Cascader
        placeholder={t('Select a variable')}
        value={[]}
        options={options}
        fieldNames={fieldNames}
        loadData={loadData}
        onChange={(keyPaths = [], selectedOptions = []) => {
          setSelectedVar(keyPaths as string[]);
          if (!keyPaths.length) {
            return;
          }
          const option = selectedOptions[selectedOptions.length - 1];
          if ((!option?.children?.length && !option?.loadChildren) || option?.isLeaf) {
            onInsert(keyPaths);
          }
        }}
        changeOnSelect={changeOnSelect}
        onClick={(e: any) => {
          if (e.detail !== 2 || !changeOnSelect) {
            return;
          }
          for (let n = e.target; n && n !== e.currentTarget; n = n.parentNode) {
            if (Array.from(n.classList ?? []).includes('ant-cascader-menu-item')) {
              onInsert(selectedVar);
            }
          }
        }}
        popupClassName={'Cascader-popupClassName'}
        dropdownRender={
          changeOnSelect
            ? (menu) => (
                <>
                  {menu}
                  <div
                    style={{
                      padding: '0.5em',
                      borderTop: `1px solid ${token.colorBorder}`,
                      color: token.colorTextDescription,
                    }}
                  >
                    {t('Double click to choose entire object')}
                  </div>
                </>
              )
            : null
        }
      />
    </XButton>,
  );
}
