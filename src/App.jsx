import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Registration from './pages/registration/registration';
import Login from './pages/login/login';

const Library = lazy(() => import('./pages/library/library'));
const Statistics = lazy(() => import('./pages/statistics/statistics'));
const Training = lazy(() => import('./pages/training/training'));

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={<Library />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </>
  );
}

export default App;
