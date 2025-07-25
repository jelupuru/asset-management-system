/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export default {
  title: 'title',
  content: getLongString(),
};

function getLongString() {
  const size = 2 * 1024 * 1024;
  const buffer = Buffer.alloc(size, 'a');
  const str = buffer.toString('utf-8');
  return str;
}
