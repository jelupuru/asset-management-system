/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { AttachmentModel, StorageType } from '.';
import { STORAGE_TYPE_ALI_OSS } from '../../constants';
import { cloudFilenameGetter, getFileKey } from '../utils';

export default class extends StorageType {
  make(storage) {
    const createAliOssStorage = require('multer-aliyun-oss');
    return new createAliOssStorage({
      config: storage.options,
      filename: cloudFilenameGetter(storage),
    });
  }
  defaults() {
    return {
      title: '阿里云对象存储',
      type: STORAGE_TYPE_ALI_OSS,
      name: 'ali-oss-1',
      baseUrl: process.env.ALI_OSS_STORAGE_BASE_URL,
      options: {
        region: process.env.ALI_OSS_REGION,
        accessKeyId: process.env.ALI_OSS_ACCESS_KEY_ID,
        accessKeySecret: process.env.ALI_OSS_ACCESS_KEY_SECRET,
        bucket: process.env.ALI_OSS_BUCKET,
      },
    };
  }
  async delete(storage, records: AttachmentModel[]): Promise<[number, AttachmentModel[]]> {
    const { client } = this.make(storage);
    const { deleted } = await client.deleteMulti(records.map(getFileKey));
    return [deleted.length, records.filter((record) => !deleted.find((item) => item.Key === getFileKey(record)))];
  }
}
