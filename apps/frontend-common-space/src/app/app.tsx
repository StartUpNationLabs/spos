import 'reflect-metadata';
import { Route, Routes } from 'react-router-dom';
import {
  DiningRoomTables,
  MealSelectionForPayment,
  PayementAsignee,
} from '@spos/ui/common';
import { Box } from '@mui/material';

export function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/payementAsignee"
          element={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <div
                style={{
                  backgroundColor: 'lightblue',
                  margin: '10px',
                  borderRadius: '10px',
                  padding: '10px',
                }}
              >
                <PayementAsignee />
              </div>
            </Box>
          }
        />
        <Route path="/diningRoomTables" element={<DiningRoomTables />} />
        <Route
          path={"/mealSelectionForPayment/:groupId/:tableNumber"}
          element={<MealSelectionForPayment />}
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
