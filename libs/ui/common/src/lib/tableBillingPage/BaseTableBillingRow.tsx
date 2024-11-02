import React, { useState } from 'react';
import NumberInput from '../tables/nbPeopleSelector';
import { TableItem } from '@spos/services/common';
import { Button } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './TableBillingShell';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface BaseTableBillingRowProps {
  element: TableItem,
  count: number,
  max: number,
  onIncrement: (itemId: string) => void
  onDecrement: (itemId: string) => void
  showRemoveButton?: boolean;
  onRemove?: (itemId: string) => void
}

export function BaseTableBillingRow({element, count, max, onIncrement, onDecrement, showRemoveButton, onRemove}: BaseTableBillingRowProps) {
  const [currentCount, setCurrentCount] = useState(count);
  const handleChange = (newValue: number) => {
    setCurrentCount(newValue); // Update the local count state

    if (newValue > currentCount) {
      onIncrement?.(element.item.id);
    } else if (newValue < currentCount) {
      onDecrement?.(element.item.id);
    }
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="center" width="25%">
        <NumberInput
          min={0}
          max={max}
          value={currentCount}
          onChange={(e, value) => handleChange(value as number)} // Capture changes
        />
      </StyledTableCell>
      <StyledTableCell align="center" width="25%">
        {element.remaining}
      </StyledTableCell>
      <StyledTableCell align="center" width="25%">
        {element.item.name}
      </StyledTableCell>
      <StyledTableCell align="center" width="25%">
        {element.item.price * count}
      </StyledTableCell>
      {showRemoveButton && (
        <StyledTableCell align="center" width="20%">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onRemove?.(element.item.id)}
          >
            Remove
          </Button>
        </StyledTableCell>
      )}
    </StyledTableRow>
  );
}
