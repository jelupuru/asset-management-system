/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { connect } from '@formily/react';

import { useCollectionRecordData } from '../../../data-source';
import { Upload } from '../upload/Upload';

/**
 * @deprecated
 * Only used for file collection preview field.
 * For file object preview, please use `Upload.ReadPretty` instead.
 */
export const Preview = connect((props) => {
  const data = useCollectionRecordData();
  return <Upload.ReadPretty {...props} value={data} />;
});

export default Preview;
