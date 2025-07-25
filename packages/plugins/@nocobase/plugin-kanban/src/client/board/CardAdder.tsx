/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useState } from 'react';
import CardForm from './CardForm';

function CardAdder({ column, onConfirm }) {
  function confirmCard(card) {
    onConfirm(column, card);
    setAddingCard(false);
  }

  const [addingCard, setAddingCard] = useState(false);

  return (
    <>
      {addingCard ? (
        <CardForm onConfirm={confirmCard} onCancel={() => setAddingCard(false)} />
      ) : (
        <button className="react-kanban-card-adder-button" onClick={() => setAddingCard(!addingCard)}>
          +
        </button>
      )}
    </>
  );
}
export default CardAdder;
