import 'reflect-metadata';
import { Link, Route, Routes } from 'react-router-dom';
import {  DiningIndividualRoomTables} from '@spos/ui/common';

export function App() {
  return (
    <div>
      <Routes>

        <Route path="/diningIndividualTables" element={<DiningIndividualRoomTables />} />


        
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
