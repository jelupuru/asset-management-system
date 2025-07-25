/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { expect, test } from '@nocobase/test/e2e';
import { uid } from '@nocobase/utils';
import { CollectionManagerPage, FieldInterface } from '../utils';

test.describe('configure fields', () => {
  test('basic', async ({ page, mockCollections }) => {
    test.slow();
    const collectionDisplayName = uid();
    // 避免以数字开头，会报错
    const collectionName = `t_${uid()}`;
    const collectionManagerPage = new CollectionManagerPage(page);
    const targetCollectionName = `t_${uid()}`;
    const targetKey = `f_${uid()}`;
    await mockCollections([
      {
        name: targetCollectionName,
        fields: [{ name: targetKey, unique: true, interface: 'input' }],
      },
      {
        name: collectionName,
        title: collectionDisplayName,
      },
    ]);
    await collectionManagerPage.goto();

    const fieldsSettings = await collectionManagerPage.configureFields(collectionName);
    // 应该有这些字段显示出来
    await expect(page.getByRole('cell', { name: 'id', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'createdAt', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'createdBy', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'updatedAt', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'updatedBy', exact: true })).toBeVisible();

    // 添加 table oid 字段
    const tableOIDDisplayName = uid();
    const tableOIDSettings = await fieldsSettings.addField('Table OID');
    await tableOIDSettings.change('Field display name', tableOIDDisplayName);
    await tableOIDSettings.submit();
    await expect(page.getByRole('cell', { name: tableOIDDisplayName, exact: true })).toBeVisible();

    // 添加 basic 类型的字段
    // 注意：有一些必填项之所以缺失，是因为其会被自动填充一个值
    await addField('Single line text');
    await addField('Long text');
    await addField('Phone');
    await addField('Email');
    await addField('URL');
    await addField('Integer');
    await addField('Number');
    await addField('Percent');
    await addField('Password');
    await addField('Color');
    await addField('Icon');

    // 添加 choices 字段
    await addField('Checkbox');
    await addField('Single select');
    await addField('Multiple select');
    await addField('Radio group');
    await addField('Checkbox group');
    await addField('China region');

    // 添加 media 字段
    await addField('Markdown');
    await addField('Rich Text');
    await addField('Attachment');

    // 添加 date & time 字段
    await addField('Datetime (with time zone)');
    await addField('Datetime (without time zone)');
    await addField('DateOnly');
    await addField('Unix Timestamp');
    await addField('Time');

    // 添加 relation 字段
    // One to one (belongs to)
    const belongsToDisplayName = uid();
    const belongsToSettings = await fieldsSettings.addField('One to one (belongs to)');
    await belongsToSettings.change('Field display name', belongsToDisplayName);
    await belongsToSettings.change('Target collection', targetCollectionName);
    await belongsToSettings.change('Target key', targetKey);
    await belongsToSettings.submit();
    await expect(page.getByRole('cell', { name: belongsToDisplayName, exact: true })).toBeVisible();
    // One to one (has one)
    const hasOneDisplayName = uid();
    const hasOneSettings = await fieldsSettings.addField('One to one (has one)');
    await hasOneSettings.change('Field display name', hasOneDisplayName);
    await hasOneSettings.change('Target collection', targetCollectionName);
    await hasOneSettings.submit();
    await expect(page.getByRole('cell', { name: hasOneDisplayName, exact: true })).toBeVisible();
    // One to many
    const oneToManyDisplayName = uid();
    const oneToManySettings = await fieldsSettings.addField('One to many');
    await oneToManySettings.change('Field display name', oneToManyDisplayName);
    await oneToManySettings.change('Target collection', targetCollectionName);
    await belongsToSettings.change('Target key', targetKey);
    await oneToManySettings.submit();
    await expect(page.getByRole('cell', { name: oneToManyDisplayName, exact: true })).toBeVisible();
    // Many to one
    const manyToOneDisplayName = uid();
    const manyToOneSettings = await fieldsSettings.addField('Many to one');
    await manyToOneSettings.change('Field display name', manyToOneDisplayName);
    await manyToOneSettings.change('Target collection', targetCollectionName);
    await belongsToSettings.change('Target key', targetKey);
    await manyToOneSettings.submit();
    await expect(page.getByRole('cell', { name: manyToOneDisplayName, exact: true })).toBeVisible();
    // Many to many
    const manyToManyDisplayName = uid();
    const manyToManyName = `f_${uid()}`;
    const manyToManySettings = await fieldsSettings.addField('Many to many');
    await manyToManySettings.change('Field display name', manyToManyDisplayName);
    await manyToManySettings.change('Field name', manyToManyName);
    await manyToManySettings.change('Target collection', targetCollectionName);
    await belongsToSettings.change('Target key', targetKey);
    await manyToManySettings.submit();
    await expect(page.getByRole('cell', { name: manyToManyDisplayName, exact: true })).toBeVisible();
    // 在这里测一下 many to many 字段的编辑和删除，其它字段先不测了
    const newManyToManyDisplayName = uid();
    const manyToManyEditing = await fieldsSettings.edit(manyToManyName, 'Many to many');
    await manyToManyEditing.change('Field display name', newManyToManyDisplayName);
    await manyToManyEditing.submit();
    await expect(page.getByRole('cell', { name: newManyToManyDisplayName, exact: true })).toBeVisible();
    await fieldsSettings.deleteItem(manyToManyName);
    await expect(page.getByRole('cell', { name: newManyToManyDisplayName, exact: true })).toBeHidden();

    // 添加 advanced 字段
    // Formula
    const formulaDisplayName = uid();
    const formulaSettings = await fieldsSettings.addField('Formula');
    await formulaSettings.change('Field display name', formulaDisplayName);
    await formulaSettings.change('Expression', '1+1');
    await formulaSettings.submit();
    await expect(page.getByRole('cell', { name: formulaDisplayName, exact: true })).toBeVisible();
    // Sequence
    const sequenceDisplayName = uid();
    const sequenceSettings = await fieldsSettings.addField('Sequence');
    await sequenceSettings.change('Field display name', sequenceDisplayName);
    await page.getByRole('button', { name: 'plus Add rule' }).click();
    await sequenceSettings.submit();
    await expect(page.getByRole('cell', { name: sequenceDisplayName, exact: true })).toBeVisible();
    // JSON
    await addField('JSON');
    // Collection
    await addField('Collection selector');

    async function addField(fieldType: FieldInterface) {
      const value = uid();
      const fieldSettings = await fieldsSettings.addField(fieldType);
      await fieldSettings.change('Field display name', value);
      await fieldSettings.submit();
      await expect(page.getByRole('cell', { name: value, exact: true })).toBeVisible();
    }
  });

  // https://nocobase.height.app/T-2868
  test('sequence rules: z-index of configure drawer', async ({ page, mockCollections }) => {
    const collectionManagerPage = new CollectionManagerPage(page);
    await collectionManagerPage.goto();
    const fieldsSettings = await collectionManagerPage.configureFields('users');
    await fieldsSettings.addField('Sequence');

    await page.getByRole('button', { name: 'plus Add rule' }).click();
    await page.getByRole('button', { name: 'Configure', exact: true }).click();
    await expect(page.getByLabel('block-item-InputNumber-Digits')).toBeVisible();

    // 即使 drawer 被遮挡，toBeVisible 也能通过，所以这里在通过点击按钮来关闭 drawer 进行测试
    await page.getByRole('button', { name: 'Submit', exact: true }).first().click();
    await expect(page.getByLabel('block-item-InputNumber-Digits')).not.toBeVisible();
  });
});
//创建非Id为主键/唯一索引
test.describe('create primary key  or unique index other than ID.', () => {
  test('integer field as primary key', async ({ page, mockCollection }) => {
    const name = uid();
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await mockCollection({
      name: name,
      autoGenId: false,
      fields: [],
    });
    await page.getByLabel('action-Filter.Action-Filter-').click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill(name);
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByLabel(`action-Action.Link-Configure fields-collections-${name}`).click();
    await page.getByRole('button', { name: 'plus Add field' }).click();
    await page.getByRole('menuitem', { name: 'Integer' }).click();
    await page.getByLabel('block-item-Input-fields-Field display name').getByRole('textbox').click();
    await page.getByLabel('block-item-Input-fields-Field display name').getByRole('textbox').fill(uid());
    await page.getByLabel('Primary').check();
    //断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('/fields:create')),
      page.getByLabel('action-Action-Submit-fields-').click(),
    ]);
    const postData = request.postDataJSON();
    //提交的数据符合预期
    expect(postData).toMatchObject({
      unique: false,
      interface: 'integer',
      primaryKey: true,
      type: 'bigInt',
    });
  });
  test('integer field set unique index', async ({ page, mockCollection }) => {
    const name = uid();
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await mockCollection({
      name: name,
      autoGenId: false,
      fields: [],
    });
    await page.getByLabel('action-Filter.Action-Filter-').click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill(name);
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByLabel(`action-Action.Link-Configure fields-collections-${name}`).click();
    await page.getByRole('button', { name: 'plus Add field' }).click();
    await page.getByRole('menuitem', { name: 'Integer' }).click();
    await page.getByLabel('block-item-Input-fields-Field display name').getByRole('textbox').click();
    await page.getByLabel('block-item-Input-fields-Field display name').getByRole('textbox').fill(uid());
    // Primary 和 Unique选中一个，其中一个自动取消勾选
    await page.getByLabel('Primary').check();
    await page.getByLabel('Unique').check();
    //断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('/fields:create')),
      page.getByLabel('action-Action-Submit-fields-').click(),
    ]);
    const postData = request.postDataJSON();
    //提交的数据符合预期
    expect(postData).toMatchObject({
      unique: true,
      interface: 'integer',
      primaryKey: false,
      type: 'bigInt',
    });
  });
  test('input(string) field set unique index', async ({ page, mockCollection }) => {
    const name = uid();
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await mockCollection({
      name: name,
      autoGenId: false,
      fields: [],
    });
    await page.getByLabel('action-Filter.Action-Filter-').click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill(name);
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByLabel(`action-Action.Link-Configure fields-collections-${name}`).click();
    await page.getByRole('button', { name: 'plus Add field' }).click();
    await page.getByRole('menuitem', { name: 'Single line text' }).click();
    await page.getByLabel('block-item-Input-fields-Field display name').getByRole('textbox').click();
    await page.getByLabel('block-item-Input-fields-Field display name').getByRole('textbox').fill(uid());
    // Primary 和 Unique选中一个，其中一个自动取消勾选
    await page.getByLabel('Primary').check();
    await page.getByLabel('Unique').check();
    //断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('/fields:create')),
      page.getByLabel('action-Action-Submit-fields-').click(),
    ]);
    const postData = request.postDataJSON();
    //提交的数据符合预期
    expect(postData).toMatchObject({
      unique: true,
      interface: 'input',
      primaryKey: false,
      type: 'string',
    });
  });
  test('input(string) field set as primary key', async ({ page, mockCollection }) => {
    const name = uid();
    await page.goto('/admin/settings/data-source-manager/list');
    await page.getByRole('button', { name: 'Configure' }).first().click();
    await mockCollection({
      name: name,
      autoGenId: false,
      fields: [],
    });
    await page.getByLabel('action-Filter.Action-Filter-').click();
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill(name);
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByLabel(`action-Action.Link-Configure fields-collections-${name}`).click();
    await page.getByRole('button', { name: 'plus Add field' }).click();
    await page.getByRole('menuitem', { name: 'Single line text' }).click();
    await page.getByLabel('block-item-Input-fields-Field display name').getByRole('textbox').click();
    await page.getByLabel('block-item-Input-fields-Field display name').getByRole('textbox').fill(uid());
    // Primary 和 Unique选中一个，其中一个自动取消勾选
    await page.getByLabel('Unique').check();
    await page.getByLabel('Primary').check();
    //断言提交的data是否符合预期
    const [request] = await Promise.all([
      page.waitForRequest((request) => request.url().includes('/fields:create')),
      page.getByLabel('action-Action-Submit-fields-').click(),
    ]);
    const postData = request.postDataJSON();
    //提交的数据符合预期
    expect(postData).toMatchObject({
      unique: false,
      interface: 'input',
      primaryKey: true,
      type: 'string',
    });
  });
});
