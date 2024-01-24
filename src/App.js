import logo from './logo.svg';
import './App.scss';
import Dashboard from './screens/dashboard/Dashboard';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loginRoutes } from './utils/routes';

function App() {
  return (
    <>
      <Routes>
        {loginRoutes.map((route, key) => (
          <Route key={key} {...route} />
        ))}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
