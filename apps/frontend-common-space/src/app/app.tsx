import 'reflect-metadata';
import { Link, Route, Routes } from 'react-router-dom';
import { PayementAsignee} from '@spos/ui/common';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PayementAsignee />} />

      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
