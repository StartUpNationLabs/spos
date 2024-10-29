import 'reflect-metadata';
import { Link, Route, Routes } from 'react-router-dom';
import { PayementAsignee, DiningRoomTables, MealSelectionForPayment} from '@spos/ui/common';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/payementAsignee" element={<PayementAsignee />} />
        <Route path="/diningRoomTables" element={<DiningRoomTables />} />
        <Route path="/mealSelectionForPayment" element={<MealSelectionForPayment />} />



        
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
