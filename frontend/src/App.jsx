import React from 'react';
import Loader from './components/layout/Loader';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Router>
        <AppRoutes />
      </Router>
    </React.Suspense>
  );
}

export default App;
