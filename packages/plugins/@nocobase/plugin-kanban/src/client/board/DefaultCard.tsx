/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';

function DefaultCard({ children: card, dragging, allowRemoveCard, onCardRemove }) {
  return (
    <div className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''}`}>
      <span>
        <div className="react-kanban-card__title">
          <span>{card.title}</span>
          {allowRemoveCard && (
            <span style={{ cursor: 'pointer' }} onClick={() => onCardRemove(card)}>
              ×
            </span>
          )}
        </div>
      </span>
      <div className="react-kanban-card__description">{card.description}</div>
    </div>
  );
}

export default DefaultCard;
