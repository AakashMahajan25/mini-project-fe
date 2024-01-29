import logo from './logo.svg';
import './App.scss';
import Dashboard from './screens/dashboard/Dashboard';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loginRoutes } from './utils/routes';
import TopBar from './components/topBar/TopBar';

function App() {
  return (
    <>
      <TopBar />
      <div style={{ marginTop: 130 }}>
        <Routes>
          {loginRoutes.map((route, key) => (
            <Route key={key} {...route} />
          ))}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
