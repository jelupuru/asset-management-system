/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { faker } from '@faker-js/faker';
import {
  CollectionTriggerNode,
  UpdateRecordNode,
  apiCreateWorkflow,
  apiDeleteWorkflow,
  apiGetList,
  apiGetWorkflow,
  apiGetWorkflowNodeExecutions,
  apiUpdateWorkflowTrigger,
  appendJsonCollectionName,
  generalWithNoRelationalFields,
} from '@nocobase/plugin-workflow-test/e2e';
import { expect, test } from '@nocobase/test/e2e';
import { dayjs } from '@nocobase/utils';

test('Collection event add data trigger, filter dropdown radio fields not null, common table dropdown radio fields data, set dropdown radio fields constant data', async ({
  page,
  mockCollections,
  mockRecords,
}) => {
  //数据表后缀标识
  const triggerNodeAppendText = 'a' + Math.random().toString(36).substring(2, 12);
  const updateNodeAppendText = 'b' + Math.random().toString(36).substring(2, 12);
  //创建触发器节点数据表
  const triggerNodeCollectionDisplayName = `自动>组织[普通表]${triggerNodeAppendText}`;
  const triggerNodeCollectionName = `tt_amt_org${triggerNodeAppendText}`;
  const triggerNodeFieldName = 'range_multipleselect';
  const triggerNodeFieldDisplayName = '经营范围(下拉多选)';
  await mockCollections(
    appendJsonCollectionName(JSON.parse(JSON.stringify(generalWithNoRelationalFields)), triggerNodeAppendText)
      .collections,
  );

  // 创建更新节点数据表
  const updateNodeCollectionDisplayName = `自动>组织[普通表]${updateNodeAppendText}`;
  const updateNodeCollectionName = `tt_amt_org${updateNodeAppendText}`;
  const updateNodeFieldName = 'range_multipleselect';
  const updateNodeFieldDisplayName = '经营范围(下拉多选)';
  await mockCollections(
    appendJsonCollectionName(JSON.parse(JSON.stringify(generalWithNoRelationalFields)), updateNodeAppendText)
      .collections,
  );
  const updateNodeCollectionRecordOne = ['F3134', 'I3006'];
  const updateNodeCollectionRecordTwo = ['F3134', 'I3007'];
  const updateNodeCollectionRecordThree = ['I3006', 'I3007'];
  const updateNodeCollectionRecords = await mockRecords(updateNodeCollectionName, [
    { range_multipleselect: updateNodeCollectionRecordOne },
    { range_multipleselect: updateNodeCollectionRecordTwo },
    { range_multipleselect: updateNodeCollectionRecordThree },
  ]);

  //添加工作流
  const workFlowName = faker.string.alphanumeric(5) + triggerNodeAppendText;
  const workflowData = {
    current: true,
    options: { deleteExecutionOnStatus: [] },
    title: workFlowName,
    type: 'collection',
    enabled: true,
  };
  const workflow = await apiCreateWorkflow(workflowData);
  const workflowObj = JSON.parse(JSON.stringify(workflow));
  const workflowId = workflowObj.id;
  //配置工作流触发器
  const triggerNodeData = {
    config: { appends: [], collection: triggerNodeCollectionName, changed: [], condition: { $and: [] }, mode: 1 },
  };
  const triggerNode = await apiUpdateWorkflowTrigger(workflowId, triggerNodeData);
  const triggerNodeObj = JSON.parse(JSON.stringify(triggerNode));

  //配置更新数据节点
  await page.goto(`admin/workflow/workflows/${workflowId}`);
  await page.waitForLoadState('load');
  const collectionTriggerNode = new CollectionTriggerNode(page, workFlowName, triggerNodeCollectionName);
  await collectionTriggerNode.addNodeButton.click();
  await page.getByRole('button', { name: 'update', exact: true }).click();
  const updateRecordNodeName = 'Update record' + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
  await page.getByLabel('Update record-Update record', { exact: true }).getByRole('textbox').fill(updateRecordNodeName);
  const updateRecordNode = new UpdateRecordNode(page, updateRecordNodeName);
  const updateRecordNodeId = await updateRecordNode.node.locator('.workflow-node-id').innerText();
  await updateRecordNode.nodeConfigure.click();
  await updateRecordNode.collectionDropDown.click();
  await page.getByRole('menuitemcheckbox', { name: 'Main right' }).click();
  await page.getByRole('menuitemcheckbox', { name: updateNodeCollectionDisplayName }).click();
  // 设置过滤条件
  await page.getByText('Add condition', { exact: true }).click();
  await page
    .getByLabel('block-item-Filter-workflows-Only update records matching conditions')
    .getByRole('button', { name: 'Select field' })
    .click();
  await page.getByRole('menuitemcheckbox', { name: updateNodeFieldDisplayName.toString() }).click();
  await page.getByTestId('select-filter-operator').click();
  await page.getByRole('option', { name: 'is not empty' }).click();

  // 设置字段
  await updateRecordNode.addFieldsButton.hover();
  await page.getByRole('menuitem', { name: updateNodeFieldDisplayName }).click();
  await page.getByTestId('select-multiple').click();
  await page.getByRole('option', { name: '数据处理服务', exact: true }).click();
  await page.getByRole('option', { name: '计算机系统服务', exact: true }).click();
  await updateRecordNode.submitButton.click();

  const updateRecordNodefieldData = ['I3032', 'I3034'];
  // 查看更新前数据
  let updateNodeCollectionData = await apiGetList(updateNodeCollectionName);
  let updateNodeCollectionDataObj = JSON.parse(JSON.stringify(updateNodeCollectionData));
  let updateNodeCollectionDataArr = updateNodeCollectionDataObj.data;
  let recordOnebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordOne.toString(),
  );
  expect(recordOnebeforeUpdateExpect).toBeTruthy();
  let recordTwobeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordTwo.toString(),
  );
  expect(recordTwobeforeUpdateExpect).toBeTruthy();
  let recordThreebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordThree.toString(),
  );
  expect(recordThreebeforeUpdateExpect).toBeTruthy();
  let afterUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateRecordNodefieldData.toString(),
  );
  expect(afterUpdateExpect).toBeFalsy();

  // 2、测试步骤：添加数据触发工作流
  const triggerNodeCollectionRecordOne = ['I3032', 'I3034'];
  const triggerNodeCollectionRecords = await mockRecords(triggerNodeCollectionName, [
    { range_multipleselect: triggerNodeCollectionRecordOne },
  ]);
  await page.waitForTimeout(1000);

  // 3、预期结果：工作流成功触发,数据更新成功
  updateNodeCollectionData = await apiGetList(updateNodeCollectionName);
  updateNodeCollectionDataObj = JSON.parse(JSON.stringify(updateNodeCollectionData));
  updateNodeCollectionDataArr = updateNodeCollectionDataObj.data;
  recordOnebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordOne.toString(),
  );
  expect(recordOnebeforeUpdateExpect).toBeFalsy();
  recordTwobeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordTwo.toString(),
  );
  expect(recordTwobeforeUpdateExpect).toBeFalsy();
  recordThreebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordThree.toString(),
  );
  expect(recordThreebeforeUpdateExpect).toBeFalsy();
  afterUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateRecordNodefieldData.toString(),
  );
  expect(afterUpdateExpect).toBeTruthy();

  const getWorkflow = await apiGetWorkflow(workflowId);
  const getWorkflowObj = JSON.parse(JSON.stringify(getWorkflow));
  const getWorkflowExecuted = getWorkflowObj.executed;
  expect(getWorkflowExecuted).toBe(1);
  const getWorkflowNodeExecutions = await apiGetWorkflowNodeExecutions(workflowId);
  const getWorkflowNodeExecutionsObj = JSON.parse(JSON.stringify(getWorkflowNodeExecutions));
  getWorkflowNodeExecutionsObj.sort(function (a: { id: number }, b: { id: number }) {
    return b.id - a.id;
  });
  const jobs = getWorkflowNodeExecutionsObj[0].jobs;
  const updateRecordNodeJob = jobs.find((job) => job.nodeId.toString() === updateRecordNodeId);
  const updateRecordNodeJobResult = updateRecordNodeJob.result;
  expect(updateRecordNodeJobResult).toBe(3);
  // 4、后置处理：删除工作流
  await apiDeleteWorkflow(workflowId);
});

test('Collection event add data trigger, filter dropdown radio fields not empty, common table dropdown radio fields data, set trigger node dropdown radio fields variable', async ({
  page,
  mockCollections,
  mockRecords,
}) => {
  //数据表后缀标识
  const triggerNodeAppendText = 'a' + Math.random().toString(36).substring(2, 12);
  const updateNodeAppendText = 'b' + Math.random().toString(36).substring(2, 12);
  //创建触发器节点数据表
  const triggerNodeCollectionDisplayName = `自动>组织[普通表]${triggerNodeAppendText}`;
  const triggerNodeCollectionName = `tt_amt_org${triggerNodeAppendText}`;
  const triggerNodeFieldName = 'range_multipleselect';
  const triggerNodeFieldDisplayName = '经营范围(下拉多选)';
  await mockCollections(
    appendJsonCollectionName(JSON.parse(JSON.stringify(generalWithNoRelationalFields)), triggerNodeAppendText)
      .collections,
  );

  // 创建更新节点数据表
  const updateNodeCollectionDisplayName = `自动>组织[普通表]${updateNodeAppendText}`;
  const updateNodeCollectionName = `tt_amt_org${updateNodeAppendText}`;
  const updateNodeFieldName = 'range_multipleselect';
  const updateNodeFieldDisplayName = '经营范围(下拉多选)';
  await mockCollections(
    appendJsonCollectionName(JSON.parse(JSON.stringify(generalWithNoRelationalFields)), updateNodeAppendText)
      .collections,
  );
  const updateNodeCollectionRecordOne = ['F3134', 'I3006'];
  const updateNodeCollectionRecordTwo = ['F3134', 'I3007'];
  const updateNodeCollectionRecordThree = ['I3006', 'I3007'];
  const updateNodeCollectionRecords = await mockRecords(updateNodeCollectionName, [
    { range_multipleselect: updateNodeCollectionRecordOne },
    { range_multipleselect: updateNodeCollectionRecordTwo },
    { range_multipleselect: updateNodeCollectionRecordThree },
  ]);

  //添加工作流
  const workFlowName = faker.string.alphanumeric(5) + triggerNodeAppendText;
  const workflowData = {
    current: true,
    options: { deleteExecutionOnStatus: [] },
    title: workFlowName,
    type: 'collection',
    enabled: true,
  };
  const workflow = await apiCreateWorkflow(workflowData);
  const workflowObj = JSON.parse(JSON.stringify(workflow));
  const workflowId = workflowObj.id;
  //配置工作流触发器
  const triggerNodeData = {
    config: { appends: [], collection: triggerNodeCollectionName, changed: [], condition: { $and: [] }, mode: 1 },
  };
  const triggerNode = await apiUpdateWorkflowTrigger(workflowId, triggerNodeData);
  const triggerNodeObj = JSON.parse(JSON.stringify(triggerNode));

  //配置更新数据节点
  await page.goto(`admin/workflow/workflows/${workflowId}`);
  await page.waitForLoadState('load');
  const collectionTriggerNode = new CollectionTriggerNode(page, workFlowName, triggerNodeCollectionName);
  await collectionTriggerNode.addNodeButton.click();
  await page.getByRole('button', { name: 'update', exact: true }).click();
  const updateRecordNodeName = 'Update record' + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
  await page.getByLabel('Update record-Update record', { exact: true }).getByRole('textbox').fill(updateRecordNodeName);
  const updateRecordNode = new UpdateRecordNode(page, updateRecordNodeName);
  const updateRecordNodeId = await updateRecordNode.node.locator('.workflow-node-id').innerText();
  await updateRecordNode.nodeConfigure.click();
  await updateRecordNode.collectionDropDown.click();
  await page.getByRole('menuitemcheckbox', { name: 'Main right' }).click();
  await page.getByRole('menuitemcheckbox', { name: updateNodeCollectionDisplayName }).click();
  // 设置过滤条件
  await page.getByText('Add condition', { exact: true }).click();
  await page
    .getByLabel('block-item-Filter-workflows-Only update records matching conditions')
    .getByRole('button', { name: 'Select field' })
    .click();
  await page.getByRole('menuitemcheckbox', { name: updateNodeFieldDisplayName.toString() }).click();
  await page.getByTestId('select-filter-operator').click();
  await page.getByRole('option', { name: 'is not empty' }).click();

  // 设置字段
  await updateRecordNode.addFieldsButton.hover();
  await page.getByRole('menuitem', { name: updateNodeFieldDisplayName }).click();
  await page.getByLabel('variable-button').click();
  await page.getByRole('menuitemcheckbox', { name: 'Trigger variables' }).click();
  await page.getByRole('menuitemcheckbox', { name: 'Trigger data' }).click();
  await page.getByRole('menuitemcheckbox', { name: triggerNodeFieldDisplayName }).click();
  await expect(
    page
      .getByLabel(
        `block-item-AssignedField-${updateNodeCollectionName}-${updateNodeCollectionName}.${updateNodeFieldName}-${updateNodeFieldDisplayName}`,
      )
      .getByLabel('variable-tag'),
  ).toHaveText(`Trigger variables / Trigger data / ${triggerNodeFieldDisplayName}`);
  await updateRecordNode.submitButton.click();

  const updateRecordNodefieldData = ['I3032', 'I3034'];
  // 查看更新前数据
  let updateNodeCollectionData = await apiGetList(updateNodeCollectionName);
  let updateNodeCollectionDataObj = JSON.parse(JSON.stringify(updateNodeCollectionData));
  let updateNodeCollectionDataArr = updateNodeCollectionDataObj.data;
  let recordOnebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordOne.toString(),
  );
  expect(recordOnebeforeUpdateExpect).toBeTruthy();
  let recordTwobeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordTwo.toString(),
  );
  expect(recordTwobeforeUpdateExpect).toBeTruthy();
  let recordThreebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordThree.toString(),
  );
  expect(recordThreebeforeUpdateExpect).toBeTruthy();
  let afterUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateRecordNodefieldData.toString(),
  );
  expect(afterUpdateExpect).toBeFalsy();

  // 2、测试步骤：添加数据触发工作流
  const triggerNodeCollectionRecordOne = ['I3032', 'I3034'];
  const triggerNodeCollectionRecords = await mockRecords(triggerNodeCollectionName, [
    { range_multipleselect: triggerNodeCollectionRecordOne },
  ]);
  await page.waitForTimeout(1000);

  // 3、预期结果：工作流成功触发,数据更新成功
  updateNodeCollectionData = await apiGetList(updateNodeCollectionName);
  updateNodeCollectionDataObj = JSON.parse(JSON.stringify(updateNodeCollectionData));
  updateNodeCollectionDataArr = updateNodeCollectionDataObj.data;
  recordOnebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordOne.toString(),
  );
  expect(recordOnebeforeUpdateExpect).toBeFalsy();
  recordTwobeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordTwo.toString(),
  );
  expect(recordTwobeforeUpdateExpect).toBeFalsy();
  recordThreebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateNodeCollectionRecordThree.toString(),
  );
  expect(recordThreebeforeUpdateExpect).toBeFalsy();
  afterUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => arr.range_multipleselect.toString() === updateRecordNodefieldData.toString(),
  );
  expect(afterUpdateExpect).toBeTruthy();

  const getWorkflow = await apiGetWorkflow(workflowId);
  const getWorkflowObj = JSON.parse(JSON.stringify(getWorkflow));
  const getWorkflowExecuted = getWorkflowObj.executed;
  expect(getWorkflowExecuted).toBe(1);
  const getWorkflowNodeExecutions = await apiGetWorkflowNodeExecutions(workflowId);
  const getWorkflowNodeExecutionsObj = JSON.parse(JSON.stringify(getWorkflowNodeExecutions));
  getWorkflowNodeExecutionsObj.sort(function (a: { id: number }, b: { id: number }) {
    return b.id - a.id;
  });
  const jobs = getWorkflowNodeExecutionsObj[0].jobs;
  const updateRecordNodeJob = jobs.find((job) => job.nodeId.toString() === updateRecordNodeId);
  const updateRecordNodeJobResult = updateRecordNodeJob.result;
  expect(updateRecordNodeJobResult).toBe(3);
  // 4、后置处理：删除工作流
  await apiDeleteWorkflow(workflowId);
});

test('Collection event add data trigger, filter date field not null, common table date field data, set date field constant data', async ({
  page,
  mockCollections,
  mockRecords,
}) => {
  //数据表后缀标识
  const triggerNodeAppendText = 'a' + Math.random().toString(36).substring(2, 12);
  const updateNodeAppendText = 'b' + Math.random().toString(36).substring(2, 12);
  //创建触发器节点数据表
  const triggerNodeCollectionDisplayName = `自动>组织[普通表]${triggerNodeAppendText}`;
  const triggerNodeCollectionName = `tt_amt_org${triggerNodeAppendText}`;
  const triggerNodeFieldName = 'establishdate';
  const triggerNodeFieldDisplayName = '成立日期(日期)';
  await mockCollections(
    appendJsonCollectionName(JSON.parse(JSON.stringify(generalWithNoRelationalFields)), triggerNodeAppendText)
      .collections,
  );

  // 创建更新节点数据表
  const updateNodeCollectionDisplayName = `自动>组织[普通表]${updateNodeAppendText}`;
  const updateNodeCollectionName = `tt_amt_org${updateNodeAppendText}`;
  const updateNodeFieldName = 'establishdate';
  const updateNodeFieldDisplayName = '成立日期(日期)';
  await mockCollections(
    appendJsonCollectionName(JSON.parse(JSON.stringify(generalWithNoRelationalFields)), updateNodeAppendText)
      .collections,
  );
  // 定义随机4位数小数的数值
  // const updateNodeCollectionRecordOne = faker.datatype.float({ min: 0, max: 10000, precision: 4 });
  const updateNodeCollectionRecordOne = dayjs().add(-3, 'day').format('YYYY-MM-DD');
  const updateNodeCollectionRecordTwo = dayjs().add(-2, 'day').format('YYYY-MM-DD');
  const updateNodeCollectionRecordThree = dayjs().add(-1, 'day').format('YYYY-MM-DD');
  const updateNodeCollectionRecords = await mockRecords(updateNodeCollectionName, [
    { establishdate: updateNodeCollectionRecordOne },
    { establishdate: updateNodeCollectionRecordTwo },
    { establishdate: updateNodeCollectionRecordThree },
  ]);

  //添加工作流
  const workFlowName = faker.string.alphanumeric(5) + triggerNodeAppendText;
  const workflowData = {
    current: true,
    options: { deleteExecutionOnStatus: [] },
    title: workFlowName,
    type: 'collection',
    enabled: true,
  };
  const workflow = await apiCreateWorkflow(workflowData);
  const workflowObj = JSON.parse(JSON.stringify(workflow));
  const workflowId = workflowObj.id;
  //配置工作流触发器
  const triggerNodeData = {
    config: { appends: [], collection: triggerNodeCollectionName, changed: [], condition: { $and: [] }, mode: 1 },
  };
  const triggerNode = await apiUpdateWorkflowTrigger(workflowId, triggerNodeData);
  const triggerNodeObj = JSON.parse(JSON.stringify(triggerNode));

  //配置更新数据节点
  await page.goto(`admin/workflow/workflows/${workflowId}`);
  await page.waitForLoadState('load');
  const collectionTriggerNode = new CollectionTriggerNode(page, workFlowName, triggerNodeCollectionName);
  await collectionTriggerNode.addNodeButton.click();
  await page.getByRole('button', { name: 'update', exact: true }).click();
  const updateRecordNodeName = 'Update record' + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
  await page.getByLabel('Update record-Update record', { exact: true }).getByRole('textbox').fill(updateRecordNodeName);
  const updateRecordNode = new UpdateRecordNode(page, updateRecordNodeName);
  const updateRecordNodeId = await updateRecordNode.node.locator('.workflow-node-id').innerText();
  await updateRecordNode.nodeConfigure.click();
  await updateRecordNode.collectionDropDown.click();
  await page.getByRole('menuitemcheckbox', { name: 'Main right' }).click();
  await page.getByRole('menuitemcheckbox', { name: updateNodeCollectionDisplayName }).click();
  // 设置过滤条件
  await page.getByText('Add condition', { exact: true }).click();
  await page
    .getByLabel('block-item-Filter-workflows-Only update records matching conditions')
    .getByRole('button', { name: 'Select field' })
    .click();
  await page.getByRole('menuitemcheckbox', { name: updateNodeFieldDisplayName.toString() }).click();
  await page.getByTestId('select-filter-operator').click();
  await page.getByRole('option', { name: 'is not empty' }).click();

  // 设置字段
  await updateRecordNode.addFieldsButton.hover();
  await page.getByRole('menuitem', { name: updateNodeFieldDisplayName }).click();
  const updateRecordNodefieldData = dayjs().format('YYYY-MM-DD');
  await page
    .getByLabel(
      `block-item-AssignedField-${updateNodeCollectionName}-${updateNodeCollectionName}.${updateNodeFieldName}-${updateNodeFieldDisplayName}`,
    )
    .getByPlaceholder('Select date')
    .click();
  await page
    .getByLabel(
      `block-item-AssignedField-${updateNodeCollectionName}-${updateNodeCollectionName}.${updateNodeFieldName}-${updateNodeFieldDisplayName}`,
    )
    .getByPlaceholder('Select date')
    .fill(updateRecordNodefieldData);
  await page.getByTitle(updateRecordNodefieldData.toString()).locator('div').click();
  await updateRecordNode.submitButton.click();

  // 查看更新前数据
  let updateNodeCollectionData = await apiGetList(updateNodeCollectionName);
  let updateNodeCollectionDataObj = JSON.parse(JSON.stringify(updateNodeCollectionData));
  let updateNodeCollectionDataArr = updateNodeCollectionDataObj.data;
  let recordOnebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordOne,
  );
  expect(recordOnebeforeUpdateExpect).toBeTruthy();
  let recordTwobeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordTwo,
  );
  expect(recordTwobeforeUpdateExpect).toBeTruthy();
  let recordThreebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordThree,
  );
  expect(recordThreebeforeUpdateExpect).toBeTruthy();
  let afterUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateRecordNodefieldData,
  );
  expect(afterUpdateExpect).toBeFalsy();

  // 2、测试步骤：添加数据触发工作流
  const triggerNodeCollectionRecordOne = dayjs().format('YYYY-MM-DD');
  const triggerNodeCollectionRecords = await mockRecords(triggerNodeCollectionName, [
    { establishdate: triggerNodeCollectionRecordOne },
  ]);
  await page.waitForTimeout(1000);
  // 3、预期结果：工作流成功触发,数据更新成功
  updateNodeCollectionData = await apiGetList(updateNodeCollectionName);
  updateNodeCollectionDataObj = JSON.parse(JSON.stringify(updateNodeCollectionData));
  updateNodeCollectionDataArr = updateNodeCollectionDataObj.data;
  recordOnebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordOne,
  );
  expect(recordOnebeforeUpdateExpect).toBeFalsy();
  recordTwobeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordTwo,
  );
  expect(recordTwobeforeUpdateExpect).toBeFalsy();
  recordThreebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordThree,
  );
  expect(recordThreebeforeUpdateExpect).toBeFalsy();
  afterUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateRecordNodefieldData,
  );
  expect(afterUpdateExpect).toBeTruthy();

  const getWorkflow = await apiGetWorkflow(workflowId);
  const getWorkflowObj = JSON.parse(JSON.stringify(getWorkflow));
  const getWorkflowExecuted = getWorkflowObj.executed;
  expect(getWorkflowExecuted).toBe(1);
  const getWorkflowNodeExecutions = await apiGetWorkflowNodeExecutions(workflowId);
  const getWorkflowNodeExecutionsObj = JSON.parse(JSON.stringify(getWorkflowNodeExecutions));
  getWorkflowNodeExecutionsObj.sort(function (a: { id: number }, b: { id: number }) {
    return b.id - a.id;
  });
  const jobs = getWorkflowNodeExecutionsObj[0].jobs;
  const updateRecordNodeJob = jobs.find((job) => job.nodeId.toString() === updateRecordNodeId);
  const updateRecordNodeJobResult = updateRecordNodeJob.result;
  expect(updateRecordNodeJobResult).toBe(3);
  // 4、后置处理：删除工作流
  await apiDeleteWorkflow(workflowId);
});

test('Collection event add data trigger, filter date field not empty, common table date field data, set trigger node date field variable', async ({
  page,
  mockCollections,
  mockRecords,
}) => {
  //数据表后缀标识
  const triggerNodeAppendText = 'a' + Math.random().toString(36).substring(2, 12);
  const updateNodeAppendText = 'b' + Math.random().toString(36).substring(2, 12);
  //创建触发器节点数据表
  const triggerNodeCollectionDisplayName = `自动>组织[普通表]${triggerNodeAppendText}`;
  const triggerNodeCollectionName = `tt_amt_org${triggerNodeAppendText}`;
  const triggerNodeFieldName = 'establishdate';
  const triggerNodeFieldDisplayName = '成立日期(日期)';
  await mockCollections(
    appendJsonCollectionName(JSON.parse(JSON.stringify(generalWithNoRelationalFields)), triggerNodeAppendText)
      .collections,
  );

  // 创建更新节点数据表
  const updateNodeCollectionDisplayName = `自动>组织[普通表]${updateNodeAppendText}`;
  const updateNodeCollectionName = `tt_amt_org${updateNodeAppendText}`;
  const updateNodeFieldName = 'establishdate';
  const updateNodeFieldDisplayName = '成立日期(日期)';
  await mockCollections(
    appendJsonCollectionName(JSON.parse(JSON.stringify(generalWithNoRelationalFields)), updateNodeAppendText)
      .collections,
  );
  const updateNodeCollectionRecordOne = dayjs().add(-3, 'day').format('YYYY-MM-DD');
  const updateNodeCollectionRecordTwo = dayjs().add(-2, 'day').format('YYYY-MM-DD');
  const updateNodeCollectionRecordThree = dayjs().add(-1, 'day').format('YYYY-MM-DD');
  const updateNodeCollectionRecords = await mockRecords(updateNodeCollectionName, [
    { establishdate: updateNodeCollectionRecordOne },
    { establishdate: updateNodeCollectionRecordTwo },
    { establishdate: updateNodeCollectionRecordThree },
  ]);

  //添加工作流
  const workFlowName = faker.string.alphanumeric(5) + triggerNodeAppendText;
  const workflowData = {
    current: true,
    options: { deleteExecutionOnStatus: [] },
    title: workFlowName,
    type: 'collection',
    enabled: true,
  };
  const workflow = await apiCreateWorkflow(workflowData);
  const workflowObj = JSON.parse(JSON.stringify(workflow));
  const workflowId = workflowObj.id;
  //配置工作流触发器
  const triggerNodeData = {
    config: { appends: [], collection: triggerNodeCollectionName, changed: [], condition: { $and: [] }, mode: 1 },
  };
  const triggerNode = await apiUpdateWorkflowTrigger(workflowId, triggerNodeData);
  const triggerNodeObj = JSON.parse(JSON.stringify(triggerNode));

  //配置更新数据节点
  await page.goto(`admin/workflow/workflows/${workflowId}`);
  await page.waitForLoadState('load');
  const collectionTriggerNode = new CollectionTriggerNode(page, workFlowName, triggerNodeCollectionName);
  await collectionTriggerNode.addNodeButton.click();
  await page.getByRole('button', { name: 'update', exact: true }).click();
  const updateRecordNodeName = 'Update record' + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
  await page.getByLabel('Update record-Update record', { exact: true }).getByRole('textbox').fill(updateRecordNodeName);
  const updateRecordNode = new UpdateRecordNode(page, updateRecordNodeName);
  const updateRecordNodeId = await updateRecordNode.node.locator('.workflow-node-id').innerText();
  await updateRecordNode.nodeConfigure.click();
  await updateRecordNode.collectionDropDown.click();
  await page.getByRole('menuitemcheckbox', { name: 'Main right' }).click();
  await page.getByRole('menuitemcheckbox', { name: updateNodeCollectionDisplayName }).click();
  // 设置过滤条件
  await page.getByText('Add condition', { exact: true }).click();
  await page
    .getByLabel('block-item-Filter-workflows-Only update records matching conditions')
    .getByRole('button', { name: 'Select field' })
    .click();
  await page.getByRole('menuitemcheckbox', { name: updateNodeFieldDisplayName.toString() }).click();
  await page.getByTestId('select-filter-operator').click();
  await page.getByRole('option', { name: 'is not empty' }).click();

  // 设置字段
  await updateRecordNode.addFieldsButton.hover();
  await page.getByRole('menuitem', { name: updateNodeFieldDisplayName }).click();
  await page.getByLabel('variable-button').click();
  await page.getByRole('menuitemcheckbox', { name: 'Trigger variables' }).click();
  await page.getByRole('menuitemcheckbox', { name: 'Trigger data' }).click();
  await page.getByRole('menuitemcheckbox', { name: triggerNodeFieldDisplayName }).click();
  await expect(
    page
      .getByLabel(
        `block-item-AssignedField-${updateNodeCollectionName}-${updateNodeCollectionName}.${updateNodeFieldName}-${updateNodeFieldDisplayName}`,
      )
      .getByLabel('variable-tag'),
  ).toHaveText(`Trigger variables / Trigger data / ${triggerNodeFieldDisplayName}`);
  await updateRecordNode.submitButton.click();

  const updateRecordNodefieldData = dayjs().format('YYYY-MM-DD');
  // 查看更新前数据
  let updateNodeCollectionData = await apiGetList(updateNodeCollectionName);
  let updateNodeCollectionDataObj = JSON.parse(JSON.stringify(updateNodeCollectionData));
  let updateNodeCollectionDataArr = updateNodeCollectionDataObj.data;
  let recordOnebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordOne,
  );
  expect(recordOnebeforeUpdateExpect).toBeTruthy();
  let recordTwobeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordTwo,
  );
  expect(recordTwobeforeUpdateExpect).toBeTruthy();
  let recordThreebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordThree,
  );
  expect(recordThreebeforeUpdateExpect).toBeTruthy();
  let afterUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateRecordNodefieldData,
  );
  expect(afterUpdateExpect).toBeFalsy();

  // 2、测试步骤：添加数据触发工作流
  const triggerNodeCollectionRecordOne = dayjs().format('YYYY-MM-DD');
  const triggerNodeCollectionRecords = await mockRecords(triggerNodeCollectionName, [
    { establishdate: triggerNodeCollectionRecordOne },
  ]);
  await page.waitForTimeout(1000);

  // 3、预期结果：工作流成功触发,数据更新成功
  updateNodeCollectionData = await apiGetList(updateNodeCollectionName);
  updateNodeCollectionDataObj = JSON.parse(JSON.stringify(updateNodeCollectionData));
  updateNodeCollectionDataArr = updateNodeCollectionDataObj.data;
  recordOnebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordOne,
  );
  expect(recordOnebeforeUpdateExpect).toBeFalsy();
  recordTwobeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordTwo,
  );
  expect(recordTwobeforeUpdateExpect).toBeFalsy();
  recordThreebeforeUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateNodeCollectionRecordThree,
  );
  expect(recordThreebeforeUpdateExpect).toBeFalsy();
  afterUpdateExpect = updateNodeCollectionDataArr.find(
    (arr) => dayjs(arr.establishdate).format('YYYY-MM-DD') === updateRecordNodefieldData,
  );
  expect(afterUpdateExpect).toBeTruthy();

  const getWorkflow = await apiGetWorkflow(workflowId);
  const getWorkflowObj = JSON.parse(JSON.stringify(getWorkflow));
  const getWorkflowExecuted = getWorkflowObj.executed;
  expect(getWorkflowExecuted).toBe(1);
  const getWorkflowNodeExecutions = await apiGetWorkflowNodeExecutions(workflowId);
  const getWorkflowNodeExecutionsObj = JSON.parse(JSON.stringify(getWorkflowNodeExecutions));
  getWorkflowNodeExecutionsObj.sort(function (a: { id: number }, b: { id: number }) {
    return b.id - a.id;
  });
  const jobs = getWorkflowNodeExecutionsObj[0].jobs;
  const updateRecordNodeJob = jobs.find((job) => job.nodeId.toString() === updateRecordNodeId);
  const updateRecordNodeJobResult = updateRecordNodeJob.result;
  expect(updateRecordNodeJobResult).toBe(3);
  // 4、后置处理：删除工作流
  await apiDeleteWorkflow(workflowId);
});
