import React from 'react';
import './DiningRoomTables.css';
import BackButton from '../utils/backButton';
import DiningRoomSVG from './diningRoomSvg';

export function DiningRoomTables() {
  return (
    <div className="dining-room-container">
      <div className="header-container">
        <BackButton onClick={() => console.log("back")}/>
        <h2 className="dining-room-title">Select Tables</h2>

      </div>
      
      <div className="dining-room-tables">
          <DiningRoomSVG />
      
      </div>
    </div>
  );
  
};

export default DiningRoomTables;
