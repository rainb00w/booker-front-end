
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from './pages/login/loginPage';
import RegistrationPage from './pages/registration/registrationPage';
import Header from './pages/header/header';
import Training from './pages/training/training';
import Library from './pages/library/library';
import Statistics from './pages/statistics/statistics';
// const Header = lazy(() => import('./pages/header'));
// const Library = lazy(() => import('./pages/library/library'));
// const Statistics = lazy(() => import('./pages/statistics/statistics'));
// const Training = lazy(() => import('./pages/training/training'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback="Load...">
        {/* <Header /> */}
        {/* <Login /> */}
        {/* <Registration /> */}
        {/* <Library /> */}
        {/* <Statistics /> */}
        {/* <Training /> */}
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/training" element={<Training />} />
          <Route path="*" element={<p>There is nothing here: 404!</p>} />
        </Routes>
      </Suspense>
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



