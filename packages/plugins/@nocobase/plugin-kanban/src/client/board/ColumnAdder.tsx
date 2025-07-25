/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useState } from 'react';
import ColumnForm from './ColumnForm';

function ColumnAdder({ onConfirm }) {
  const [isAddingColumn, setAddingColumn] = useState(false);

  function confirmColumn(title) {
    onConfirm(title);
    setAddingColumn(false);
  }

  return isAddingColumn ? (
    <ColumnForm onConfirm={confirmColumn} onCancel={() => setAddingColumn(false)} />
  ) : (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '230px' }}
      className="react-kanban-column-adder-button"
      onClick={() => setAddingColumn(true)}
      role="button"
    >
      ➕
    </div>
  );
}

export default ColumnAdder;
