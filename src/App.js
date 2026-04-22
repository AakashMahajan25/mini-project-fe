import './App.scss';
import Dashboard from './screens/dashboard/Dashboard';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { loginRoutes } from './utils/routes';
import TopBar from './components/topBar/TopBar';
import Login from './screens/login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InactivityTimer from './utils/InactivityTimer';
import ReactGA from 'react-ga4';
import { useEffect, useState } from 'react';
// import CreditOverModal from './components/creditOverModal/CreditOverModal';
import { useDispatch, useSelector } from 'react-redux';
// import { getAvaliableCredit } from './screens/profile/usersSlice';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isExcludedPage = ['/login', '/signup','/signUp', '/', '/topics', '/market','/walkthrough'].includes(location.pathname);
  const isAuthenticated = localStorage.getItem('token');
  const [showCreditModal, setShowCreditModal] = useState(false);
  const { userCredits } = useSelector(state => state.userSlice);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') ReactGA.initialize('G-PJPZEYMZY8');
  }, []);

  // useEffect(() => {
  //   if(!isExcludedPage)
  //   dispatch(getAvaliableCredit());
  // }, [location])

  // useEffect(() => {
  //   if(['/dashboard', '/frruit-gpt', '/market-content-gpt', '/discover-correlation'].includes(location.pathname) || (location.pathname === "/profile" && !location?.state?.plans)){
  //     if(userCredits?.expired || userCredits?.warning){
  //       setShowCreditModal(true)
  //     }
  //   }
  // }, [userCredits])

  const handleCloseCreditModal = () => setShowCreditModal(false);

  const handleCreditButton = () => {
    setShowCreditModal(false)
    navigate("/profile", {
        state: { plans: true },
    });
  }

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
      
      {/* {showCreditModal &&
        <CreditOverModal show={showCreditModal} handleClose={handleCloseCreditModal} onButtonClick={handleCreditButton} />
      } */}
      
      <ToastContainer />
      {
        isAuthenticated && <InactivityTimer />
      }
     
    </>
  );
}

export default App;
