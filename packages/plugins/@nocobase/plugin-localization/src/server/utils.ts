/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const compile = (title: string) => (title || '').replace(/{{\s*t\(["|'|`](.*)["|'|`]\)\s*}}/g, '$1');

/* istanbul ignore next -- @preserve */
export const getTextsFromUISchema = (schema: any) => {
  const texts = [];
  const title = compile(schema.title);
  const componentPropsTitle = compile(schema['x-component-props']?.title);
  const decoratorPropsTitle = compile(schema['x-decorator-props']?.title);
  if (title) {
    texts.push(title);
  }
  if (componentPropsTitle) {
    texts.push(componentPropsTitle);
  }
  if (decoratorPropsTitle) {
    texts.push(decoratorPropsTitle);
  }
  if (schema['x-data-templates']?.items?.length) {
    schema['x-data-templates'].items.forEach((item: any) => {
      const title = compile(item.title);
      if (title) {
        texts.push(title);
      }
    });
  }
  return texts;
};

export const getTextsFromDBRecord = (fields: string[], record: any) => {
  const texts = [];
  fields.forEach((field) => {
    const value = record[field];
    if (typeof value === 'string') {
      texts.push(compile(value));
    }
    if (typeof value === 'object') {
      if (value?.uiSchema?.title) {
        texts.push(compile(value.uiSchema.title));
      }
      if (value?.uiSchema?.enum) {
        value.uiSchema.enum.forEach((item) => {
          if (item?.label) {
            texts.push(compile(item.label));
          }
        });
      }
    }
  });
  return texts;
};
