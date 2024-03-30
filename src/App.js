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
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const isExcludedPage = ['/login', '/signUp', '/', '/topics', '/market'].includes(location.pathname);
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    ReactGA.initialize('G-48PQ3R17YK',{ debug: true });
  }, []);

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
