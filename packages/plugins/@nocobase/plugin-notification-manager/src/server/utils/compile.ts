/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Handlebars } from '@nocobase/utils';

function deepCompile(template: unknown, data: Record<string, any>): unknown {
  if (typeof template === 'string') {
    const c = Handlebars.compile(template);
    return c(data);
  } else if (Array.isArray(template)) {
    return template.map((item) => deepCompile(item, data));
  } else if (typeof template === 'object') {
    const result = Object.keys(template).reduce((object, key) => {
      const value = deepCompile(template[key], data);
      return Object.assign(object, { [key]: value });
    }, {});
    return result;
  } else {
    return template;
  }
}

export function compile(template: Record<string, any>, data: Record<string, any>): Record<string, any> {
  if (!template) {
    return {};
  }
  return deepCompile(template, data);
}
