import { Link, Route, Routes } from 'react-router-dom';
import {
  LandingPage,
  Offers,
  GroupBilling,
  TableBilling,
  Commands,
  OrderingChoices,
  Orders,
  Summary,
  OrdersTable,
  
} from "@spos/ui/common";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/offers" element={<Offers />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
        <Route path="/preparations/" element={<OrdersTable />} />

        <Route path="/groupBilling/" element={<GroupBilling />} />
        <Route path="/groupBilling/:groupId" element={<GroupBilling />} />
        <Route path="/tableBilling/" element={<TableBilling />} />
        <Route path="/tableBilling/:groupId" element={<TableBilling />} />
        <Route path="/commands/" element={<Commands />} />
        <Route path="/commands/:groupId/" element={<Commands />}>
          <Route path='' element={<OrderingChoices />} />
          <Route path='orders' element={<Orders />} />
          <Route path='summary' element={<Summary />} />
        </Route>
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
