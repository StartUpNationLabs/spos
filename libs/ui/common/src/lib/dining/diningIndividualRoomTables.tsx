import React, { useState } from 'react';
import './diningRoomTables.css';
import DiningRoomSVG from './diningRoomSvg';
import DiningHeader from './diningHeader';

export function DiningIndividualRoomTables() {
  const [hasSelection, setHasSelection] = useState(false);

  const handleBackClick = () => {
    console.log('Back button clicked');
  };

  const handleContinueClick = () => {
    console.log('See global billing button clicked');
  };

  return (
    <div className="dining-room-container">
      <DiningHeader
        title="Select Tables"
        hasSelection={hasSelection}
        onBackClick={handleBackClick}
        onContinueClick={handleContinueClick}
        buttonText={'Global billing'}
      />
      <div className="dining-room-tables">
        <DiningRoomSVG onSelectionChange={setHasSelection} />
      </div>
    </div>
  );
}

export default DiningIndividualRoomTables;
