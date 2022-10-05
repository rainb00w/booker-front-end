import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Notify } from 'notiflix';

import LoginPage from './pages/login/loginPage';
import RegistrationPage from './pages/registration/registrationPage';
import ChangePasswordPage from 'pages/changePassword/changePasswordPage';
import Header from './pages/header/header';
import Training from './pages/training/training';
import Library from './pages/library/library';
import Statistics from './pages/statistics/statistics';

import PrivateRoute from './components/routes/privateRoute';
import PublicRoute from './components/routes/publicRoute';

// const Header = lazy(() => import('./pages/header'));
// const Library = lazy(() => import('./pages/library/library'));
// const Statistics = lazy(() => import('./pages/statistics/statistics'));
// const Training = lazy(() => import('./pages/training/training'));

function App() {
  return (
    <>
      <Header />
      <div className="main_container">
        <Suspense fallback="Load...">
          <Routes>
            {/* <Route path="/" element={<Library />} /> */}

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Library />
                </PrivateRoute>
              }
            />

            <Route
              path="/statistics"
              element={
                <PrivateRoute>
                  <Statistics />
                </PrivateRoute>
              }
            />

            <Route
              path="/training"
              element={
                <PrivateRoute>
                  <Training />
                </PrivateRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute restricted>
                  <LoginPage />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute restricted>
                  <RegistrationPage />
                </PublicRoute>
              }
            />

            <Route
              path="/changePassword"
              element={
                <PublicRoute restricted>
                  <ChangePasswordPage />
                </PublicRoute>
              }
            />

            {/* 
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} /> */}
            {/* <Route path="/statistics" element={<Statistics />} /> */}
            {/* <Route path="/training" element={<Training />} /> */}
            <Route path="*" element={<p>There is nothing here: 404!</p>} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;

// import React, { lazy, Suspense } from 'react';
// import { Route, Routes } from 'react-router-dom';

// import LoginPage from './pages/login/loginPage';
// import RegistrationPage from './pages/registration/registrationPage';

// const Header = lazy(() => import('./pages/header'));
// const Library = lazy(() => import('./pages/library/library'));
// const Statistics = lazy(() => import('./pages/statistics/statistics'));
// const Training = lazy(() => import('./pages/training/training'));

// function App() {
//   return (
//     <>
//       <Suspense fallback="Load...">
//         <Header />
//         <LoginPage />
//         <RegistrationPage />
//         <Library />
//         <Statistics />
//         <Training />
//         {/* <TestRegistration />
//         <TestLogin /> */}

//         <Routes>

//           {/* <Route exact path="/" element={<Login />} /> */}
//           {/* <Route path="/register" element={<Registration />} /> */}
//           {/* <Route path="/library" element={<Library />} /> */}
//           {/* <Route path="/statistics" element={<Statistics />} /> */}
//           {/* <Route path="/training" element={<Training />} /> */}
//           {/* <Route path="*" element={<p>There is nothing here: 404!</p>} /> */}
//         </Routes>
//       </Suspense>
//     </>
//   );
// }

// export default App;
