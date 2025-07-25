/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export default {
  syncTrigger: class {
    constructor(public readonly workflow) {}
    on() {}
    off() {}
    sync = true;
    validateEvent() {
      return true;
    }
  },
  asyncTrigger: class {
    constructor(public readonly workflow) {}
    on() {}
    off() {}
    validateEvent() {
      return true;
    }
  },
};
