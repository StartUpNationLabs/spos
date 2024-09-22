import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';
import { LandingPage, Offers, Orders, GroupBilling, Summary, NavBar, TableBilling, TableSquare } from '@spos/ui/common';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tableButton" element={<TableSquare tableNumber={1}/>} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/summary" element={<Summary />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/groupBilling" element={<GroupBilling />} />
        <Route path="/tableBilling" element={<TableBilling />} />

      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
