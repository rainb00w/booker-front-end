import React, { lazy } from 'react';

import LogIn from './pages/login/login';

const Library = lazy(() => import('./pages/library/library'));
const Statistics = lazy(() => import('./pages/statistics/statistics'));
const Training = lazy(() => import('./pages/training/training'));

function App() {
  return (
    <>
      <LogIn />
      <Library />
      <Statistics />
      <Training />
    </>
  );
}

export default App;
