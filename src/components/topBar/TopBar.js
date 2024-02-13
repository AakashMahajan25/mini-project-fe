import React from 'react'
import './TopBar.scss';
import FrruitLogo from '../../assets/images/frruit-logo.png'
import ProfilePic from '../../assets/images/profile.png'
import { useLocation, useNavigate } from 'react-router-dom';
import StockPriceScroll from '../stockPriceScroll/StockPriceScroll';

function TopBar() {
  const location = useLocation()
  let navigate = useNavigate();
  const routeChangeDashboard = () => {
    let path = `/dashboard`;
    navigate(path);
  }
  const routeChangeFrruitGPT = () => {
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
    let path = `/market-content-gpt`;
    navigate(path);
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
              {/* <img className="logo" onClick={routeChangeProfile} style={{ width: 42 }} src={ProfilePic} alt="" /> */}
              <div onClick={routeChangeProfile} className='profile-icon'>
                <div className='profile-name-text'>S</div>
              </div>
            </div>
          </div>
          <StockPriceScroll />
        </div>
      </div>



      {/* <div
        className=" d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none position-absolute w-100 topbar"
        style={{ zIndex: 1000 }}
      >
        <nav className="navbar navbar-expand-lg navbar-dark align-items-center justify-content-between py-3">
          <a className="navbar-brand ms-3" href="#">
            <img className="logo" style={{ width: 100 }} src={FrruitLogo} alt="" />
          </a>
          <button
            className="navbar-toggler me-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </nav>
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div
            className="offcanvas-header"
            style={{ backgroundColor: "transparent !important" }}
          >
            <a className="offcanvas-title " id="offcanvasExampleLabel" href="/">
              <img className="logo" style={{ width: 100 }} src={FrruitLogo} alt="" />
            </a>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item my-2">
                <a className="nav-link" data-bs-dismiss="offcanvas" href="#Dashboard">
                  {" "}
                  Dashboard{" "}
                </a>
              </li>
              <li className="nav-item my-2">
                <a className="nav-link" data-bs-dismiss="offcanvas" href="#Frruit GPT">
                  {" "}
                  Frruit GPT{" "}
                </a>
              </li>
              <li className="nav-item my-2">
                <a className="nav-link" data-bs-dismiss="offcanvas" href="#Discover Correlation">
                  {" "}
                  Discover Correlation{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default TopBar