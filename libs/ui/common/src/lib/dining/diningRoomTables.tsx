import React, { useState } from 'react';
import './diningRoomTables.css';
import DiningRoomSVG from './diningRoomSvg';
import DiningHeader from './diningHeader';

export function DiningRoomTables() {
  const [hasSelection, setHasSelection] = useState(false);

  const handleBackClick = () => {
    console.log('Back button clicked');
  };

  const handleContinueClick = () => {
    console.log('Continue button clicked');
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
