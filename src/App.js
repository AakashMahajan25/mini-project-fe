import './App.scss';
import Dashboard from './screens/dashboard/Dashboard';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loginRoutes } from './utils/routes';
import TopBar from './components/topBar/TopBar';
import Login from './screens/login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InactivityTimer from './utils/InactivityTimer';
import ReactGA from 'react-ga4';
import { useEffect, useState } from 'react';
import CreditOverModal from './components/creditOverModal/CreditOverModal';

function App() {
  const location = useLocation();
  const isExcludedPage = ['/login', '/signUp', '/', '/topics', '/market','/walkthrough'].includes(location.pathname);
  const isAuthenticated = localStorage.getItem('token');
  

  useEffect(() => {
    ReactGA.initialize('G-KFRHHDX0W3', { debug: true });
  }, []);

  // Temp Code For creditModal start

  // useEffect(() => {
  //   let timeout;
  //   if (isAuthenticated) {
  //     timeout = setTimeout(() => {
  //       setShowCreditModal(true);
  //     }, 5000);
  //   }

  //   return () => clearTimeout(timeout);
  // }, [isAuthenticated]);

  // Temp Code For creditModal end

  return (
    <>
      {!isExcludedPage && <TopBar />}
      <div className={isExcludedPage ? 'no-margin-top' : 'with-margin-top'}>
        <Routes>
          {loginRoutes.map((route, key) => (
            <Route key={key} {...route} />
          ))}
        </Routes>
      </div>
      <ToastContainer />
      {
        isAuthenticated && <InactivityTimer />
      }
    </>
  );
}

export default App;
