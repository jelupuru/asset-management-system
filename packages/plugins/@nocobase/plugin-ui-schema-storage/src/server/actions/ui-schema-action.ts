/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Context } from '@nocobase/actions';
import { ActionParams } from '@nocobase/resourcer';
import lodash from 'lodash';
import UiSchemaRepository, { GetJsonSchemaOptions, GetPropertiesOptions } from '../repository';

const getRepositoryFromCtx = (ctx: Context) => {
  const repo = ctx.db.getCollection('uiSchemas').repository as UiSchemaRepository;
  repo.setCache(ctx.cache);
  return repo;
};

const callRepositoryMethod = (method, paramsKey: 'resourceIndex' | 'values', optionsBuilder?) => {
  return async (ctx, next) => {
    const params = lodash.get(ctx.action.params, paramsKey);
    const options = optionsBuilder ? optionsBuilder(ctx.action.params) : {};

    const repository = getRepositoryFromCtx(ctx);
    const returnValue = await repository[method](params, options);

    ctx.body = returnValue || {
      result: 'ok',
    };

    await next();
  };
};

function parseInsertAdjacentValues(values) {
  if (lodash.has(values, 'schema')) {
    return values;
  }

  return { schema: values, wrap: null };
}

export const uiSchemaActions = {
  getJsonSchema: callRepositoryMethod('getJsonSchema', 'resourceIndex', (params: ActionParams) => {
    const includeAsyncNode = params?.includeAsyncNode;
    return {
      readFromCache: !includeAsyncNode,
      includeAsyncNode,
    } as GetJsonSchemaOptions;
  }),

  getProperties: callRepositoryMethod(
    'getProperties',
    'resourceIndex',
    () =>
      ({
        readFromCache: true,
      }) as GetPropertiesOptions,
  ),

  getParentJsonSchema: callRepositoryMethod('getParentJsonSchema', 'resourceIndex'),
  getParentProperty: callRepositoryMethod('getParentProperty', 'resourceIndex'),

  insert: callRepositoryMethod('insert', 'values'),
  insertNewSchema: callRepositoryMethod('insertNewSchema', 'values'),
  remove: callRepositoryMethod('remove', 'resourceIndex'),
  patch: callRepositoryMethod('patch', 'values'),
  initializeActionContext: callRepositoryMethod('initializeActionContext', 'values'),
  batchPatch: callRepositoryMethod('batchPatch', 'values'),
  clearAncestor: callRepositoryMethod('clearAncestor', 'resourceIndex'),

  insertAdjacent: insertPositionActionBuilder(),
  insertBeforeBegin: insertPositionActionBuilder('beforeBegin'),
  insertAfterBegin: insertPositionActionBuilder('afterBegin'),
  insertBeforeEnd: insertPositionActionBuilder('beforeEnd'),
  insertAfterEnd: insertPositionActionBuilder('afterEnd'),

  async saveAsTemplate(ctx: Context, next) {
    const { filterByTk, values } = ctx.action.params;
    const db = ctx.db;
    const transaction = await db.sequelize.transaction();
    try {
      await db.getRepository('uiSchemaTemplates').create({
        values: {
          ...values,
          uid: filterByTk,
        },
        transaction,
      });
      await getRepositoryFromCtx(ctx).clearAncestor(filterByTk, { transaction });
      ctx.body = {
        result: 'ok',
      };
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    await next();
  },
};

function insertPositionActionBuilder(
  position: 'beforeBegin' | 'afterBegin' | 'beforeEnd' | 'afterEnd' | undefined = undefined,
) {
  return async function (ctx: Context, next) {
    const {
      resourceIndex,
      values,
      removeParentsIfNoChildren,
      breakRemoveOn,
      position: positionFromUser,
    } = ctx.action.params;

    const repository = getRepositoryFromCtx(ctx);
    const { schema, wrap } = parseInsertAdjacentValues(values);

    ctx.body = await repository.insertAdjacent(position || positionFromUser, resourceIndex, schema, {
      removeParentsIfNoChildren,
      breakRemoveOn,
      wrap,
    });

    await next();
  };
}
