/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  AssociationFieldMode,
  AssociationFieldModeProvider,
  useAssociationFieldModeContext,
} from '../AssociationFieldModeProvider';

vi.mock('../AssociationSelect', () => ({
  AssociationSelect: () => <div>Association Select</div>,
  AssociationFieldAddNewer: vi.fn(() => <div> AssociationFieldAddNewer</div>),
}));

vi.mock('../InternalPicker', () => ({
  InternalPicker: () => <div>Internal Picker</div>,
}));

describe('AssociationFieldModeProvider', () => {
  it('should correctly provide the default modeToComponent mapping', () => {
    const TestComponent = () => {
      const { modeToComponent } = useAssociationFieldModeContext();
      return <div>{Object.keys(modeToComponent).join(',')} </div>;
    };

    render(
      <AssociationFieldModeProvider modeToComponent={{}}>
        <TestComponent />
      </AssociationFieldModeProvider>,
    );

    expect(screen.getByText('Picker,Nester,PopoverNester,Select,SubTable,FileManager,CascadeSelect')).toBeTruthy();
  });

  it('should allow overriding the default modeToComponent mapping', () => {
    const CustomComponent = () => <div>Custom Component</div>;
    const TestComponent = () => {
      const { getComponent } = useAssociationFieldModeContext();
      const Component = getComponent(AssociationFieldMode.Picker);
      return <Component />;
    };

    render(
      <AssociationFieldModeProvider modeToComponent={{ [AssociationFieldMode.Picker]: CustomComponent }}>
        <TestComponent />
      </AssociationFieldModeProvider>,
    );

    expect(screen.getByText('Custom Component')).toBeTruthy();
  });

  it('getComponent should return the default component if no custom component is found', () => {
    const TestComponent = () => {
      const { getComponent } = useAssociationFieldModeContext();
      const Component = getComponent(AssociationFieldMode.Select);
      return <Component />;
    };

    render(
      <AssociationFieldModeProvider modeToComponent={{}}>
        <TestComponent />
      </AssociationFieldModeProvider>,
    );

    expect(screen.getByText('Association Select')).toBeTruthy();
  });

  it('getDefaultComponent should always return the default component', () => {
    const CustomComponent = () => <div>Custom Component</div>;
    const TestComponent = () => {
      const { getDefaultComponent } = useAssociationFieldModeContext();
      const Component = getDefaultComponent(AssociationFieldMode.Picker);
      return <Component />;
    };

    render(
      <AssociationFieldModeProvider modeToComponent={{ [AssociationFieldMode.Picker]: CustomComponent }}>
        <TestComponent />
      </AssociationFieldModeProvider>,
    );

    expect(screen.getByText('Internal Picker')).toBeTruthy();
  });
});
