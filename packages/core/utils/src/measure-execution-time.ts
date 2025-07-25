/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export async function measureExecutionTime(operation, operationName) {
  const startTime = Date.now();
  await operation();
  const endTime = Date.now();
  const duration = (endTime - startTime).toFixed(0);
  console.log(`${operationName} completed in ${duration} milliseconds`);
}
