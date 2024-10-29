import 'reflect-metadata';
import { Link, Route, Routes } from 'react-router-dom';
import {  DiningIndividualRoomTables, GroupBilling, TableBilling} from '@spos/ui/common';

export function App() {
  return (
    <div>
      <Routes>
      <Route path="/groupBilling/" element={<GroupBilling />} />
        <Route path="/groupBilling/:groupId" element={<GroupBilling />} />
        <Route path="/tableBilling/" element={<TableBilling />} />
        <Route path="/tableBilling/:groupId" element={<TableBilling />} />

        <Route path="/diningIndividualTables" element={<DiningIndividualRoomTables />} />


        
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
