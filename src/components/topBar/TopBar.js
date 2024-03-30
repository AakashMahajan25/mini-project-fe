import React, { useEffect } from 'react'
import './TopBar.scss';
import FrruitLogo from '../../assets/images/frruit-logo.png'
import ProfilePic from '../../assets/images/profile.png'
import { useLocation, useNavigate } from 'react-router-dom';
import StockPriceScroll from '../stockPriceScroll/StockPriceScroll';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../screens/profile/usersSlice';
import LogOut from '../../assets/images/logout-outline.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function TopBar() {
  const dispatch = useDispatch();
  const { userDetails } = useSelector(state => state.userSlice)
  const { cancelTokens } = useSelector(state => state.contentGPTSlice);


  console.log('userDetails', userDetails)
  const location = useLocation()
  let navigate = useNavigate();
  const routeChangeDashboard = () => {
    let path = `/dashboard`;
    navigate(path);
  }
  const routeChangeWatchlist = () => {
    let path = `/dashboard/watchlist`;
    navigate(path);
  }
  const routeChangeFrruitGPT = () => {
    if (cancelTokens)
      cancelTokens.cancel("cancelled")
    let path = `/frruit-gpt`;
    navigate(path);
  }
  const routeChangeDiscoverCorrelation = () => {
    let path = `/discover-correlation`;
    navigate(path);
  }
  const routeChangeProfile = () => {
    let path = `/profile`;
    navigate(path);
  }
  const routeChangeMarketContentGPT = () => {
    if (cancelTokens)
      cancelTokens.cancel("cancelled")
    let path = `/market-content-gpt`;
    navigate(path);
  }

  useEffect(() => {
    dispatch(getUserDetails())
  }, [])
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
      <div className='web-nav'>
        <div className='top-nav-bar' style={{ width: window.innerWidth }}>
          <div className='content-nav d-flex align-items-center justify-content-between' style={{ width: window.innerWidth }}>
            <a onClick={routeChangeDashboard}>
              <img className="logo" style={{ width: 155 }} src={FrruitLogo} alt="" />
            </a>
            <div className='d-flex align-items-center justify-content-between'>
              <div className={location.pathname === '/dashboard' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeDashboard}>Dashboard</div>
              <div className={location.pathname === '/frruit-gpt' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeFrruitGPT}>Frruit GPT</div>
              <div className={location.pathname === '/market-content-gpt' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeMarketContentGPT}>Market Content GPT</div>
              <div className={location.pathname === '/discover-correlation' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeDiscoverCorrelation}>Discover Correlation</div>
              <div onClick={routeChangeProfile} className='profile-icon me-5'>
                <div className='profile-name-text'>{userDetails?.first_name?.slice(0, 1)}</div>
              </div>
              <div className='logout-nav-bar' onClick={handleLogout}>
                <div className='logout-text'>Logout</div>
                <img src={LogOut} style={{ width: 24, objectFit: 'contain', marginLeft: 5 }} />
              </div>
            </div >
          </div >
          <StockPriceScroll />
        </div >
      </div >

      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary tabNavBar">
        <Container>
          <a onClick={routeChangeDashboard}>
            <img className="logo" style={{ width: 133 }} src={FrruitLogo} alt="" />
          </a>
          <div className='d-flex justify-content-center align-items-center'>
            <Nav.Link href="#"><div onClick={routeChangeProfile} className='profile-icon me-2'>
              <div className='profile-name-text'>{userDetails?.first_name?.slice(0, 1)}</div>
            </div>
            </Nav.Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mt-2">
              <Nav.Link href="#"> <div className={location.pathname === '/dashboard' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeDashboard}>Dashboard</div></Nav.Link>
              <Nav.Link href="#"><div className={location.pathname === '/frruit-gpt' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeFrruitGPT}>Frruit GPT</div></Nav.Link>
              <Nav.Link href="#"><div className={location.pathname === '/market-content-gpt' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeMarketContentGPT}>Market Content GPT</div></Nav.Link>
              <Nav.Link href="#"><div className={location.pathname === '/discover-correlation' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeDiscoverCorrelation}>Discover Correlation</div></Nav.Link>
              <Nav.Link href="#"><div className={location.pathname === '/dashboard/watchlist' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeWatchlist}>Watchlist</div></Nav.Link>
              <Nav.Link href="#"><div className='web-nav-text me-5' onClick={handleLogout}>Logout</div></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default TopBar