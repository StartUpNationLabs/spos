import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';
import { UiCommon } from '@spos/ui/common';
import { LandingPage } from '@spos/ui/common';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/common" element={<UiCommon />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
