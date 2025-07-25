/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { vi } from 'vitest';
import dayjs from 'dayjs';
import { mapRangePicker } from '../util';

describe('mapRangePicker', () => {
  it('should work with showTime=false, gmt=true, utc=true', () => {
    const props = {
      showTime: false,
      gmt: true,
      utc: true,
      onChange: vi.fn(),
    };
    const { onChange } = mapRangePicker()(props);
    const value = [dayjs.utc('2023-01-01T00:00:00.000Z'), dayjs.utc('2023-01-02T00:00:00.000Z')];
    onChange(value);
    expect(props.onChange).toHaveBeenCalledWith(['2023-01-01T00:00:00.000Z', '2023-01-02T23:59:59.999Z']);
  });

  it('should work with showTime=true, gmt=true, utc=true', () => {
    const props = {
      showTime: true,
      gmt: true,
      utc: true,
      onChange: vi.fn(),
    };
    const { onChange } = mapRangePicker()(props);
    const value = [dayjs.utc('2023-01-01T00:00:00.000Z'), dayjs.utc('2023-01-02T00:00:00.000Z')];
    onChange(value);
    expect(props.onChange).toHaveBeenCalledWith(['2023-01-01T00:00:00.000Z', '2023-01-02T00:00:00.000Z']);
  });

  it('should work with showTime=false, gmt=true, utc=false', () => {
    const props = {
      showTime: false,
      gmt: true,
      utc: false,
      onChange: vi.fn(),
    };
    const { onChange } = mapRangePicker()(props);
    const value = [dayjs.utc('2023-01-01T00:00:00.000Z'), dayjs.utc('2023-01-02T00:00:00.000Z')];
    onChange(value);
    expect(props.onChange).toHaveBeenCalledWith(['2023-01-01', '2023-01-02']);
  });
});
