import React, { lazy } from 'react';

import Registration from './pages/registration/registration';
import Login from './pages/login/login';


const Library = lazy(() => import('./pages/library/library'));
const Statistics = lazy(() => import('./pages/statistics/statistics'));
const Training = lazy(() => import('./pages/training/training'));

function App() {
  return (
    <>
      <Registration />
      <Login />
      <Library />
      <Statistics />
      <Training />
    </>
  );
}

export default App;
