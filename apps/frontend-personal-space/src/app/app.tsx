import 'reflect-metadata';
import { Route, Routes } from 'react-router-dom';
import {
  DiningIndividualRoomTables,
} from '@spos/ui/common';
import PersonalOrdering from './pages/Personal-ordering';
import { PersonalBilling } from './pages/Personal-billing';

export function App() {
  return (
    <div>
      <Routes>
        <Route path={"/:groupId/:tableNumber/:ownerId"} element={<PersonalOrdering/>} />
        <Route path="/personalBilling/:groupId/:tableNumber/:ownerId" element={<PersonalBilling />} />

        <Route
          path="/diningIndividualTables"
          element={<DiningIndividualRoomTables />}
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
