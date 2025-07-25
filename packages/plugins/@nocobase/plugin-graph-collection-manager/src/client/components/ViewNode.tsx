/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { NodeView } from '@antv/x6';

export class SimpleNodeView extends NodeView {
  protected renderMarkup() {
    return this.renderJSONMarkup({
      tagName: 'rect',
      selector: 'body',
    });
  }

  update() {
    const attrs = this.cell.getAttrs();
    const fill = attrs.hightLight ? '#1890ff' : 'gray';
    super.update({
      body: {
        refWidth: '50px',
        refHeight: '100px',
        fill: fill,
      },
    });
  }
}
