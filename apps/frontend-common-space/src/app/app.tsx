import 'reflect-metadata';
import { Link, Route, Routes } from 'react-router-dom';
import { PayementAsignee, DiningRoomTables} from '@spos/ui/common';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/payementAsignee" element={<PayementAsignee />} />
        <Route path="/diningRoomTables" element={<DiningRoomTables />} />


        
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
