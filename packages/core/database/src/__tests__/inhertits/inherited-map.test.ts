/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import InheritanceMap from '../../inherited-map';

describe('InheritedMap', () => {
  it('should setInherits', () => {
    const map = new InheritanceMap();
    map.setInheritance('b', 'a');

    const nodeA = map.getNode('a');
    const nodeB = map.getNode('b');

    expect(nodeA.children.has(nodeB)).toBe(true);
    expect(nodeB.parents.has(nodeA)).toBe(true);

    expect(map.isParentNode('a')).toBe(true);
  });

  it('should get deep children', () => {
    const map = new InheritanceMap();
    map.setInheritance('b', 'a');
    map.setInheritance('c', 'b');
    map.setInheritance('c1', 'b');
    map.setInheritance('d', 'c');

    const children = map.getChildren('a');
    expect(children.size).toBe(4);
  });
});
