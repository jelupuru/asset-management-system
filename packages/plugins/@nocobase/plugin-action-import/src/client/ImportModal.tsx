/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { css } from '@nocobase/client';
import { Button, Modal, Space, Spin } from 'antd';
import { saveAs } from 'file-saver';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NAMESPACE } from './constants';
import { useImportContext } from './context';

export const ImportStatus = {
  IMPORTING: 1,
  IMPORTED: 2,
};

export const ImportModal = (props: any) => {
  const { t } = useTranslation(NAMESPACE);
  const { importModalVisible, importStatus, importResult, setImportModalVisible } = useImportContext();
  const { data: fileData, meta } = importResult ?? {};
  const doneHandler = () => {
    setImportModalVisible(false);
  };
  const downloadFailureDataHandler = () => {
    const arrayBuffer = new Int8Array(fileData?.data);
    const blob = new Blob([arrayBuffer], { type: 'application/x-xls' });
    saveAs(blob, `fail.xlsx`);
  };
  return (
    <Modal
      title={t('Import Data')}
      width="50%"
      styles={{ body: { height: 'calc(80vh - 200px)' } }}
      open={importModalVisible}
      footer={null}
      closable={importStatus === ImportStatus.IMPORTED}
      onCancel={doneHandler}
    >
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        `}
      >
        {importStatus === ImportStatus.IMPORTING && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} tip={t('Excel data importing')} />
        )}
        {importStatus === ImportStatus.IMPORTED && (
          <Space direction="vertical" align="center">
            <ExclamationCircleFilled style={{ fontSize: 72, color: '#1890ff' }} />
            <p>
              {t('{{successCount}} records have been successfully imported', {
                ...(meta ?? {}),
              })}
            </p>
            <Space>
              {meta?.failureCount > 0 && (
                <Button onClick={downloadFailureDataHandler}>{t('To download the failure data')}</Button>
              )}
              <Button type="primary" onClick={doneHandler}>
                {t('Done')}
              </Button>
            </Space>
          </Space>
        )}
      </div>
    </Modal>
  );
};
