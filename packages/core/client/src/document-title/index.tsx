/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plugin } from '../application/Plugin';
import { useSystemSettings } from '../system-settings';

interface DocumentTitleContextProps {
  getTitle: () => string;
  setTitle: (title?: any) => void;
}

export const DocumentTitleContext = createContext<DocumentTitleContextProps>({
  getTitle: () => '',
  setTitle: () => {},
});
DocumentTitleContext.displayName = 'DocumentTitleContext';

export const DocumentTitleProvider: React.FC<{ addonBefore?: string; addonAfter?: string }> = React.memo((props) => {
  const { addonBefore, addonAfter } = props;
  const { t } = useTranslation();
  const titleRef = React.useRef('');

  const getTitle = useCallback(() => titleRef.current, []);
  const setTitle = useCallback(
    (title) => {
      document.title = titleRef.current = `${addonBefore ? ` - ${t(addonBefore)}` : ''}${t(title || '')}${
        addonAfter ? ` - ${t(addonAfter)}` : ''
      }`;
    },
    [addonAfter, addonBefore, t],
  );

  const value = useMemo(() => {
    return {
      getTitle,
      setTitle,
    };
  }, [getTitle, setTitle]);

  return <DocumentTitleContext.Provider value={value}>{props.children}</DocumentTitleContext.Provider>;
});

DocumentTitleProvider.displayName = 'DocumentTitleProvider';

export const RemoteDocumentTitleProvider: React.FC = (props) => {
  const ctx = useSystemSettings();
  return <DocumentTitleProvider addonAfter={ctx?.data?.data?.title}>{props.children}</DocumentTitleProvider>;
};

export const useDocumentTitle = () => {
  return useContext(DocumentTitleContext);
};

export const useCurrentDocumentTitle = (title: string) => {
  const { setTitle } = useDocumentTitle();
  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);
};

export class RemoteDocumentTitlePlugin extends Plugin {
  async load() {
    this.app.use(RemoteDocumentTitleProvider, this.options);
  }
}
