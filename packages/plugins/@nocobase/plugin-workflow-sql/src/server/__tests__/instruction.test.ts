/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import Database, { fn } from '@nocobase/database';
import { Application } from '@nocobase/server';
import WorkflowPluginServer, { EXECUTION_STATUS, JOB_STATUS } from '@nocobase/plugin-workflow';
import { getApp, sleep } from '@nocobase/plugin-workflow-test';

import Plugin from '..';
import SQLInstruction from '../SQLInstruction';

const mysql = process.env.DB_DIALECT === 'mysql' ? describe : describe.skip;

describe('workflow > instructions > sql', () => {
  let app: Application;
  let db: Database;
  let PostRepo;
  let PostCollection;
  let ReplyRepo;
  let WorkflowModel;
  let workflow;
  let instruction: SQLInstruction;

  beforeEach(async () => {
    app = await getApp({
      plugins: [Plugin],
    });
    instruction = (app.pm.get(WorkflowPluginServer) as WorkflowPluginServer).instructions.get('sql') as SQLInstruction;
    db = app.db;
    WorkflowModel = db.getCollection('workflows').model;
    PostCollection = db.getCollection('posts');
    PostRepo = PostCollection.repository;
    ReplyRepo = db.getCollection('replies').repository;

    workflow = await WorkflowModel.create({
      enabled: true,
      type: 'collection',
      config: {
        mode: 1,
        collection: 'posts',
      },
    });
  });

  afterEach(() => app.destroy());

  describe('invalid', () => {
    it('no sql', async () => {
      const n1 = await workflow.createNode({
        type: 'sql',
        config: {},
      });

      const post = await PostRepo.create({ values: { title: 't1' } });

      await sleep(500);

      const [execution] = await workflow.getExecutions();
      const [sqlJob] = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(execution.status).toBe(EXECUTION_STATUS.RESOLVED);
      expect(sqlJob.status).toBe(JOB_STATUS.RESOLVED);
    });

    it('empty sql', async () => {
      const n1 = await workflow.createNode({
        type: 'sql',
        config: {
          sql: '',
        },
      });

      const post = await PostRepo.create({ values: { title: 't1' } });

      await sleep(500);

      const [execution] = await workflow.getExecutions();
      const [sqlJob] = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(execution.status).toBe(EXECUTION_STATUS.RESOLVED);
      expect(sqlJob.status).toBe(JOB_STATUS.RESOLVED);
    });

    it('invalid sql', async () => {
      const n1 = await workflow.createNode({
        type: 'sql',
        config: {
          sql: '1',
        },
      });

      const post = await PostRepo.create({ values: { title: 't1' } });

      await sleep(500);

      const [execution] = await workflow.getExecutions();
      const [sqlJob] = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(execution.status).toBe(EXECUTION_STATUS.ERROR);
      expect(sqlJob.status).toBe(JOB_STATUS.ERROR);
    });
  });

  describe('sql with variables', () => {
    it('$system.now', async () => {
      const queryInterface = db.sequelize.getQueryInterface();
      const n1 = await workflow.createNode({
        type: 'sql',
        config: {
          sql: `select '{{$system.now}}' as a`,
        },
      });

      const post = await PostRepo.create({ values: { title: 't1' } });

      await sleep(500);

      const [execution] = await workflow.getExecutions();
      const [sqlJob] = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(sqlJob.status).toBe(JOB_STATUS.RESOLVED);
    });

    it('update', async () => {
      const queryInterface = db.sequelize.getQueryInterface();
      const n1 = await workflow.createNode({
        type: 'sql',
        config: {
          sql: `update ${PostCollection.quotedTableName()} set ${queryInterface.quoteIdentifier(
            'read',
          )}={{$context.data.id}} where ${queryInterface.quoteIdentifier('id')}={{$context.data.id}}`,
        },
      });

      const n2 = await workflow.createNode({
        type: 'query',
        config: {
          collection: 'posts',
          params: {
            filter: {
              id: '{{ $context.data.id }}',
            },
          },
        },
        upstreamId: n1.id,
      });

      await n1.setDownstream(n2);

      const post = await PostRepo.create({ values: { title: 't1' } });

      await sleep(500);

      const [execution] = await workflow.getExecutions();
      const [sqlJob, queryJob] = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(sqlJob.status).toBe(JOB_STATUS.RESOLVED);
      expect(queryJob.status).toBe(JOB_STATUS.RESOLVED);
      expect(queryJob.result.read).toBe(post.id);
    });

    it('delete', async () => {
      const queryInterface = db.sequelize.getQueryInterface();
      const n1 = await workflow.createNode({
        type: 'sql',
        config: {
          sql: `delete from ${PostCollection.quotedTableName()} where ${queryInterface.quoteIdentifier(
            'id',
          )}={{$context.data.id}};`,
        },
      });

      const n2 = await workflow.createNode({
        type: 'query',
        config: {
          collection: 'posts',
          params: {
            filter: {
              id: '{{ $context.data.id }}',
            },
          },
        },
        upstreamId: n1.id,
      });

      await n1.setDownstream(n2);

      const post = await PostRepo.create({ values: { title: 't1' } });

      await sleep(500);

      const [execution] = await workflow.getExecutions();
      const [sqlJob, queryJob] = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(sqlJob.status).toBe(JOB_STATUS.RESOLVED);
      expect(queryJob.status).toBe(JOB_STATUS.RESOLVED);
      expect(queryJob.result).toBeNull();
    });
  });

  describe('run in sync mode', () => {
    it('sync workflow', async () => {
      const w2 = await WorkflowModel.create({
        enabled: true,
        sync: true,
        type: 'collection',
        config: {
          mode: 1,
          collection: 'categories',
        },
      });

      const CategoryCollection = db.getCollection('categories');

      const n1 = await w2.createNode({
        type: 'sql',
        config: {
          sql: `select count(id) as count from ${CategoryCollection.quotedTableName()}`,
        },
      });

      const category = await CategoryCollection.repository.create({ values: { title: 't1' } });

      const [execution] = await w2.getExecutions();
      expect(execution.status).toBe(EXECUTION_STATUS.RESOLVED);
      const [job] = await execution.getJobs();
      expect(job.status).toBe(JOB_STATUS.RESOLVED);
      expect(job.result.length).toBe(1);
      expect(job.result[0].count).toBe(1);
    });
  });

  describe('legacy', () => {
    it('withMeta', async () => {
      const w2 = await WorkflowModel.create({
        enabled: true,
        sync: true,
        type: 'collection',
        config: {
          mode: 1,
          collection: 'categories',
        },
      });

      const CategoryCollection = db.getCollection('categories');

      const n1 = await w2.createNode({
        type: 'sql',
        config: {
          sql: `select count(id) as count from ${CategoryCollection.quotedTableName()}`,
          withMeta: true,
        },
      });

      const category = await CategoryCollection.repository.create({ values: { title: 't1' } });

      const [execution] = await w2.getExecutions();
      const [sqlJob] = await execution.getJobs({ order: [['id', 'ASC']] });
      expect(sqlJob.status).toBe(JOB_STATUS.RESOLVED);
      expect(sqlJob.result.length).toBe(2);
      expect(sqlJob.result[0].length).toBe(1);
      expect(sqlJob.result[0][0].count).toBe(1);
    });
  });

  describe('multiple data source', () => {
    it('query on another data source', async () => {
      const anotherSource = app.dataSourceManager.dataSources.get('another');
      const PostCollection = anotherSource.collectionManager.getCollection('posts');
      const { repository: AnotherPostRepo } = PostCollection;
      const post = await AnotherPostRepo.create({ values: { title: 't1' } });
      const p1s = await AnotherPostRepo.find();
      expect(p1s.length).toBe(1);

      const n1 = await workflow.createNode({
        type: 'sql',
        config: {
          dataSource: 'another',
          sql: `select * from ${PostCollection.quotedTableName()}`,
        },
      });

      await PostRepo.create({ values: { title: 't1' } });

      await sleep(500);

      const [execution] = await workflow.getExecutions();
      expect(execution.status).toBe(EXECUTION_STATUS.RESOLVED);
      const [job] = await execution.getJobs();
      expect(job.result.length).toBe(1);
      // @ts-ignore
      expect(job.result[0].id).toBe(post.id);
    });
  });

  describe('dialects', () => {
    mysql('mysql', () => {
      it('stored procedure with result', async () => {
        await db.sequelize.query(`DROP PROCEDURE IF EXISTS hello`);
        await db.sequelize.query(`CREATE PROCEDURE hello(IN id INT) BEGIN select id + 1 as a; END;`);
        const n1 = await workflow.createNode({
          type: 'sql',
          config: {
            sql: 'call hello(1)',
          },
        });

        await PostRepo.create({ values: { title: 't1' } });

        await sleep(500);

        const [execution] = await workflow.getExecutions();
        const [sqlJob] = await execution.getJobs({ order: [['id', 'ASC']] });
        expect(sqlJob.status).toBe(JOB_STATUS.RESOLVED);
        expect(sqlJob.result).toEqual({ a: 2 });
      });

      it('stored procedure without result', async () => {
        await db.sequelize.query(`DROP PROCEDURE IF EXISTS hello`);
        await db.sequelize.query(`CREATE PROCEDURE hello(IN id INT) BEGIN declare i int default 0; END;`);
        const n1 = await workflow.createNode({
          type: 'sql',
          config: {
            sql: 'call hello(1)',
          },
        });

        await PostRepo.create({ values: { title: 't1' } });

        await sleep(500);

        const [execution] = await workflow.getExecutions();
        const [sqlJob] = await execution.getJobs({ order: [['id', 'ASC']] });
        expect(sqlJob.status).toBe(JOB_STATUS.RESOLVED);
        expect(sqlJob.result).toBe(null);
      });
    });
  });

  describe('test', () => {
    it('empty sql', async () => {
      const { status, result } = await instruction.test({});
      expect(status).toBe(JOB_STATUS.RESOLVED);
      expect(result).toBe(null);
    });

    it('invalid sql', async () => {
      const { status, result } = await instruction.test({ sql: '1' });
      expect(status).toBe(JOB_STATUS.ERROR);
    });

    it('valid sql', async () => {
      const { status, result } = await instruction.test({ sql: 'select 1 as a' });
      expect(status).toBe(JOB_STATUS.RESOLVED);
      expect(result).toEqual([{ a: 1 }]);
    });
  });
});
