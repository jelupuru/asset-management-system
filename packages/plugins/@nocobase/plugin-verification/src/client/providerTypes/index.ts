/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema } from '@formily/react';
import { Registry } from '@nocobase/utils/client';
import SMSAliyun from './sms-aliyun';
import SMSTencent from './sms-tencent';

const providerTypes: Registry<ISchema> = new Registry();

providerTypes.register('sms-aliyun', SMSAliyun);
providerTypes.register('sms-tencent', SMSTencent);

export default providerTypes;
