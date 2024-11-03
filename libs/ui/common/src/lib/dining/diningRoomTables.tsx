import React, { useState } from 'react';
import './diningRoomTables.css';
import DiningRoomSVG from './diningRoomSvg';
import DiningHeader from './diningHeader';
import { useNavigate, useParams } from 'react-router-dom';

export function DiningRoomTables() {
  const navigate = useNavigate();
  const { groupId, tableNumber } = useParams<{ 
    groupId: string; 
    tableNumber: string;
  }>();

  const [hasSelection, setHasSelection] = useState(false);

  const handleBackClick = () => {
    console.log('Back button clicked');
    navigate(`/mealSelectionForPayment/${groupId}/${tableNumber}`);

  };

  const handleContinueClick = () => {
    console.log('Continue button clicked');
    navigate(`/mealSelectionForPayment/${groupId}/${tableNumber}`);
  };

  return (
    <div className="dining-room-container">
      <DiningHeader
        title="Select Tables"
        hasSelection={hasSelection}
        onBackClick={handleBackClick}
        onContinueClick={handleContinueClick}
        buttonText={'Continue'}
      />
      <div className="dining-room-tables">
        <DiningRoomSVG onSelectionChange={setHasSelection} />
      </div>
    </div>
  );
}

export default DiningRoomTables;
