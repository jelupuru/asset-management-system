/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { LoadingOutlined } from '@ant-design/icons';
import { ISchema } from '@formily/json-schema';
import { useForm } from '@formily/react';
import { uid } from '@formily/shared';
import { App, Modal, Result } from 'antd';
import type { RcFile } from 'antd/es/upload';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAPIClient } from '../../../api-client';
import { SchemaComponent } from '../../../schema-component';
import { IPluginData } from '../../types';

const { confirm } = Modal;

interface IPluginUploadFormProps {
  onClose: (refresh?: boolean) => void;
  isUpgrade: boolean;
  pluginData?: IPluginData;
}

export const PluginUploadForm: FC<IPluginUploadFormProps> = ({ onClose, pluginData, isUpgrade }) => {
  const { message } = App.useApp();
  const useSaveValues = () => {
    const api = useAPIClient();
    const { t } = useTranslation();
    const form = useForm();

    return {
      async run() {
        await form.submit();
        const formData = new FormData();
        formData.append('file', form.values.uploadFile?.[0]?.originFileObj);
        if (pluginData?.packageName) {
          formData.append('packageName', pluginData.packageName);
        }
        await api.request({
          url: `pm:${isUpgrade ? 'update' : 'add'}`,
          method: 'post',
          data: formData,
        });
        Modal.info({
          icon: null,
          width: 520,
          content: (
            <Result
              icon={<LoadingOutlined />}
              title={t('Plugin uploading')}
              subTitle={t('Plugin is uploading, please wait...')}
            />
          ),
          footer: null,
        });
        onClose(true);
        function __health_check() {
          api
            .silent()
            .request({
              url: `__health_check`,
              method: 'get',
            })
            .then((response) => {
              if (response?.data === 'ok') {
                window.location.reload();
              }
            })
            .catch((error) => {
              // console.error('Health check failed:', error);
            });
        }
        setInterval(__health_check, 1000);
      },
    };
  };

  const useCancel = () => {
    return {
      run() {
        onClose();
      },
    };
  };

  const schema = useMemo<ISchema>(() => {
    return {
      type: 'object',
      properties: {
        [uid()]: {
          'x-decorator': 'Form',
          'x-component': 'div',
          type: 'void',
          properties: {
            uploadFile: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Upload.Dragger',
              required: true,
              'x-component-props': {
                action: '',
                multiple: false,
                maxCount: 1,
                height: '150px',
                tipContent: `{{t('Drag and drop the file here or click to upload, file size should not exceed 30M')}}`,
                beforeUpload: (file: RcFile) => {
                  const compressedFileRegex = /\.(zip|rar|tar|gz|bz2|tgz)$/;
                  const isCompressedFile = compressedFileRegex.test(file.name);
                  if (!isCompressedFile) {
                    message.error('File only support zip, rar, tar, gz, bz2!');
                  }

                  const fileSizeLimit = file.size / 1024 / 1024 < 30;
                  if (!fileSizeLimit) {
                    message.error('File must smaller than 30MB!');
                  }
                  return false;
                  return isCompressedFile && fileSizeLimit;
                },
              },
            },
            footer: {
              type: 'void',
              'x-component': 'ActionBar',
              'x-component-props': {
                layout: 'one-column',
                style: {
                  justifyContent: 'right',
                },
              },
              properties: {
                cancel: {
                  title: 'Cancel',
                  'x-component': 'Action',
                  'x-component-props': {
                    useAction: '{{ useCancel }}',
                  },
                },
                submit: {
                  title: '{{t("Submit")}}',
                  'x-component': 'Action',
                  'x-component-props': {
                    type: 'primary',
                    htmlType: 'submit',
                    useAction: '{{ useSaveValues }}',
                  },
                },
              },
            },
          },
        },
      },
    };
  }, [message]);

  return <SchemaComponent scope={{ useCancel, useSaveValues }} schema={schema} />;
};
