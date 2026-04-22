import React, { useEffect, useState } from 'react'
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
import ReactGA from 'react-ga4';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CloseImg from '../../assets/images/close_icon.png';
import LogOutIcon from '../../assets/images/logOutSmallIcon.png';
import MobileMenu from '../../assets/images/hamburgerMenu.png';
import { createSocket } from '../../utils/socket';

function TopBar() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userDetails } = useSelector(state => state.userSlice)
  const { cancelTokens } = useSelector(state => state.contentGPTSlice);

  const location = useLocation()
  let navigate = useNavigate();
  const routeChangeDashboard = () => {
    setShow(false)
    let path = `/dashboard`;
    navigate(path);
  }
  const routeChangeWatchlist = () => {
    setShow(false)
    let path = `/dashboard/watchlist`;
    navigate(path);
  }
  const routeChangeFrruitGPT = () => {
    if (cancelTokens)
      cancelTokens.cancel("cancelled")
    const socket = createSocket();
    socket.disconnect();
    setShow(false)
    let path = `/frruit-gpt`;
    navigate(path);
  }
  const routeChangeDiscoverCorrelation = () => {
    setShow(false)
    let path = `/discover-correlation`;
    navigate(path);
  }
  const routeChangeProfile = () => {
    setShow(false)
    let path = `/profile`;
    navigate(path);
  }
  const routeChangeMarketContentGPT = () => {
    if (cancelTokens)
      cancelTokens.cancel("cancelled")
    setShow(false)
    let path = `/market-content-gpt`;
    navigate(path);
  }

  useEffect(() => {
    dispatch(getUserDetails())
  }, [])
  const handleLogout = () => {
    ReactGA.event({
      category: 'Profiling',
      action: 'user_logout',
      label: 'User Logout'
    });
    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
      <div className='topNavbarMainClass'>
        <div className='web-nav'>
          <div className='top-nav-bar' style={{ width: window.innerWidth }}>
            <div className='content-nav d-flex align-items-center justify-content-between' style={{ width: window.innerWidth }}>
              <a onClick={routeChangeDashboard}>
                <img className="logo" style={{ width: 120 }} src={FrruitLogo} alt="" />
              </a>
              <div className='d-flex align-items-center justify-content-between'>
                <div className={location.pathname === '/dashboard' ? 'web-nav-text-active' : 'web-nav-text'} onClick={routeChangeDashboard}>Home</div>
                <div className={location.pathname === '/frruit-gpt' ? 'web-nav-text-active' : 'web-nav-text'} onClick={routeChangeFrruitGPT}>Frruit Search</div>
                {/* <div className={location.pathname === '/market-content-gpt' ? 'web-nav-text-active' : 'web-nav-text'} onClick={routeChangeMarketContentGPT}>Content Search</div> */}
                <div className={location.pathname === '/discover-correlation' ? 'web-nav-text-active' : 'web-nav-text'} onClick={routeChangeDiscoverCorrelation}>Discover Correlation</div>
                <div onClick={routeChangeProfile} className='profile-icon'>
                  <div className='profile-name-text'>{userDetails?.first_name?.slice(0, 1)}</div>
                </div>
                <div className='logout-nav-bar' onClick={handleLogout}>
                  <div className='logout-text'>Logout</div>
                  <img src={LogOut} style={{ width: 24, objectFit: 'contain', marginLeft: 5 }} />
                </div>
              </div >
            </div >
            {/* <StockPriceScroll /> */}
          </div >
        </div >

        <Navbar collapseOnSelect expand="lg" className="tabNavBar">
          <Container>
            <img onClick={handleShow} src={MobileMenu} width={24} height={24} style={{ objectFit: 'contain', cursor: 'pointer' }} />
            <a onClick={routeChangeDashboard}>
              <img className="logo" style={{ width: 122 }} src={FrruitLogo} alt="" />
            </a>
            <div className='d-flex justify-content-center align-items-center'>
              {/* <Nav.Link href="#"><div onClick={routeChangeProfile} className='profile-icon me-2'>
              <div className='profile-name-text'>{userDetails?.first_name?.slice(0, 1)}</div>
            </div>
            </Nav.Link> */}
              {/* <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} /> */}


            </div>
            {/* <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mt-2">
              <Nav.Link href="#"> <div className={location.pathname === '/dashboard' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeDashboard}>Dashboard</div></Nav.Link>
              <Nav.Link href="#"><div className={location.pathname === '/frruit-gpt' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeFrruitGPT}>Frruit GPT</div></Nav.Link>
              <Nav.Link href="#"><div className={location.pathname === '/market-content-gpt' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeMarketContentGPT}>Market Content GPT</div></Nav.Link>
              <Nav.Link href="#"><div className={location.pathname === '/discover-correlation' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeDiscoverCorrelation}>Discover Correlation</div></Nav.Link>
              <Nav.Link href="#"><div className={location.pathname === '/dashboard/watchlist' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeWatchlist}>Watchlist</div></Nav.Link>
              <Nav.Link href="#"><div className={location.pathname === '/dashboard/profile' ? 'web-nav-text-active me-5' : 'web-nav-text me-5'} onClick={routeChangeProfile}>Profile</div></Nav.Link>
              <Nav.Link href="#"><div className='web-nav-text me-5' onClick={handleLogout}>Logout</div></Nav.Link>
            </Nav>
          </Navbar.Collapse> */}
          </Container>
        </Navbar>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header>
            <img className="logo" style={{ width: 78 }} src={FrruitLogo} alt="" />
            <div onClick={() => handleClose()} className=' align-items-center' style={{ cursor: 'pointer' }}>
              <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
            </div>
          </Offcanvas.Header>
          <div style={{ borderBottom: '1px solid #EDEDED' }}></div>
          <div className='mainOffcanvasBodyForSignOut'>
            <div className='signOutRow'>
              <div onClick={routeChangeProfile} className='profile-icon me-2'>
                <div className='profile-name-text'>{userDetails?.first_name?.slice(0, 1)}</div>
              </div>
              <div className='innerSignOutRow'>
                <div>
                  <div className='UserNameDashboardNav'>{userDetails?.first_name} {userDetails?.last_name}</div>
                  <div className='UserEmailDashboardNav'>{userDetails?.email}</div>
                </div>
                <img src={LogOutIcon} onClick={handleLogout} style={{ width: '35px', height: '35px', objectFit: 'contain', cursor: 'pointer' }} />
              </div>
            </div>
          </div>
          <div style={{ borderBottom: '1px solid #EDEDED' }}></div>
          <Offcanvas.Body>
            <div className='menu-container-offcanvas'>
              <div className={location.pathname === '/dashboard' ? 'web-nav-text-mobile-offcanvas-active' : 'web-nav-text-mobile-offcanvas'} onClick={routeChangeDashboard}>Home</div>
              <div className={location.pathname === '/frruit-gpt' ? 'web-nav-text-mobile-offcanvas-active' : 'web-nav-text-mobile-offcanvas'} onClick={routeChangeFrruitGPT}>Frruit Search</div>
              {/* <div className={location.pathname === '/market-content-gpt' ? 'web-nav-text-mobile-offcanvas-active' : 'web-nav-text-mobile-offcanvas'} onClick={routeChangeMarketContentGPT}>Content Search</div> */}
              <div className={location.pathname === '/discover-correlation' ? 'web-nav-text-mobile-offcanvas-active' : 'web-nav-text-mobile-offcanvas'} onClick={routeChangeDiscoverCorrelation}>Discover Correlation</div>
              {/* <div className={location.pathname === '/dashboard/watchlist' ? 'web-nav-text-mobile-offcanvas-active' : 'web-nav-text-mobile-offcanvas'} onClick={routeChangeWatchlist}>Watchlist</div> */}
              <div className={location.pathname === '/dashboard/profile' ? 'web-nav-text-mobile-offcanvas-active' : 'web-nav-text-mobile-offcanvas'} onClick={routeChangeProfile}>Profile</div>
              {/* <div className='web-nav-text me-5' onClick={handleLogout}>Logout</div> */}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

export default TopBar