import 'reflect-metadata';
import { Route, Routes } from 'react-router-dom';
import PersonalOrdering from './pages/Personal-ordering';
import { PersonalBilling } from './pages/Personal-billing';
import { Thanks } from '@spos/ui/common';

export function App() {
  return (
    <div>
      <Routes>
        <Route path={"/:groupId/:tableNumber/:ownerId"} element={<PersonalOrdering/>} />
        <Route path="/personalBilling/:tableNumber/:ownerId" element={<PersonalBilling />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
