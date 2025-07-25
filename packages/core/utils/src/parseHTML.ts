/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

/**
 * parseHTML('<span>{{version}}</span>', { version: '1.0.0' }) -> '<span>1.0.0</span>'
 * @param html
 * @param variables
 * @returns
 */
export function parseHTML(html: string, variables: Record<string, any>) {
  return html.replace(/\{\{(\w+)\}\}/g, function (match, key) {
    return typeof variables[key] !== 'undefined' ? variables[key] : match;
  });
}
