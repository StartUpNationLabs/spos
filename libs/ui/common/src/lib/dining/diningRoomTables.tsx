import React, { useState } from 'react';
import './DiningRoomTables.css';
import BackButton from '../utils/backButton';
import DiningRoomSVG from './diningRoomSvg';

export function DiningRoomTables() {
  const [hasSelection, setHasSelection] = useState(false);

  return (
    <div className="dining-room-container">
      <div className="header-container">
        <div className="header-left">
          <BackButton onClick={() => console.log("back")}/>
        </div>
        <div className="header-center">
          <h2 className="dining-room-title">Select Tables</h2>
        </div>
        <div className="header-right">
          {hasSelection && (
            <button 
              className="continue-button"
              onClick={() => console.log("continue")}
            >
              Continue
            </button>
          )}
        </div>
      </div>
      <div className="dining-room-tables">
          <DiningRoomSVG onSelectionChange={setHasSelection} /> 
      </div>
      
    </div>
  );
  
};

export default DiningRoomTables;
