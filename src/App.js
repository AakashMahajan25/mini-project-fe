import './App.scss';
import Dashboard from './screens/dashboard/Dashboard';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loginRoutes } from './utils/routes';
import TopBar from './components/topBar/TopBar';
import Login from './screens/login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const isExcludedPage = ['/login', '/signUp', '/', '/topics', '/market'].includes(location.pathname);
  const marginTopStyle = isExcludedPage ? { marginTop: 0 } : { marginTop: 105 };

  return (
    <>
      {isExcludedPage ? null : <TopBar />}
      <div style={marginTopStyle}>
        <Routes>
          {loginRoutes.map((route, key) => (
            <Route key={key} {...route} />
          ))}
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
