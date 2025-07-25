/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useMemo } from 'react';
import { getLunarDay } from '../utils';

const Header = ({ date, label, drilldownView, onDrillDown, showLunar = false, type, localizer }) => {
  const lunarElement = useMemo(() => {
    if (!showLunar) {
      return;
    }
    return <span className="rbc-date-lunar">{getLunarDay(date)}</span>;
  }, [date, showLunar]);

  const child = useMemo(() => {
    if (type === 'week') {
      return (
        <div>
          <span>{localizer.format(date, 'ddd')}</span>
          <div className="rbc-date-wrap">
            <span className="rbc-date-solar">{localizer.format(date, 'DD')}</span>
            {lunarElement}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <span className="rbc-date-solar">{label}</span>
          {lunarElement}
        </>
      );
    }
  }, [type]);

  const Wrapper = drilldownView ? 'a' : React.Fragment;

  return (
    <Wrapper onClick={onDrillDown} role="cell">
      {child}
    </Wrapper>
  );
};

export default Header;
