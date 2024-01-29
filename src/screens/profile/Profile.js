import React from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftProfileBox from '../../components/leftProfileBox/LeftProfileBox';
import './Profile.scss';
import WhiteArrow from '../../assets/images/bluecard-arrow.png';
import BlueArrow from '../../assets/images/blue-right-arrow.png';
import UserImg from '../../assets/images/user-img.png';
import InputUser from '../../assets/images/input-user.png';
import MobileIcon from '../../assets/images/mobile-icon.png';
import MailIcon from '../../assets/images/mail-icon.png';
import BlueCardFrruitLogo from '../../assets/images/blue-card-frruitlogo.png';

function Profile() {
    return (
        <>
            <TopBar />
            <StockPriceScroll />
            <div className='row justify-content-between m-0 profile-css'>
                <div className='col-lg-3'>
                    <LeftProfileBox />
                </div>
                <div className='col-lg-9'>
                    <div className='right-part'>
                        <div className='welcome-text'>Welcome</div>
                        <div style={{ marginBottom: 20 }} className='user-text'>Shubham Patel!</div>
                        <div className='row m-0'>
                            <div className='col-lg-6' style={{ marginBottom: 20 }}>
                                <div className='me-2'>
                                    <div className='blue-box'>
                                        <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 10 }}>
                                            <div className='text-1'>Available Credits</div>
                                            <div className='d-flex align-items-center'>
                                                <div className='text-2'>History</div>
                                                <img src={WhiteArrow} style={{ width: 18, objectFit: 'contain' }} />
                                            </div>
                                        </div>
                                        <div className='light-blue-box' style={{ width: 'fit-content', marginBottom: 28 }}>
                                            <div className='d-flex justify-content-start align-items-center'>
                                                <div className='text-3'>621.91</div>
                                                <div className='text-4 mt-1'>/750.00</div>
                                            </div>
                                        </div>
                                        <div className='text-2'>1 Credit = 1000 Tokens</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6' style={{ marginBottom: 20 }}>
                                <div className='ms-2'>
                                    <div className='blue-box'>
                                        <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 10 }}>
                                            <div className='text-1'>Current Plan</div>
                                        </div>
                                        <div className='light-blue-box' style={{ marginBottom: 10 }}>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='text-3'>Premium</div>
                                                <div className='text-4'>$14 /month</div>
                                            </div>
                                        </div>
                                        <button className='white-btn'>Change Plan<img src={BlueArrow} style={{ objectFit: 'contain', width: 6, marginLeft: 10 }} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row m-0'>
                            <div className='col-lg-6'>
                                <div className='profile-title' style={{ marginBottom: 32 }}>Profile</div>
                                <div className='d-flex jsutify-content-between align-items-center' style={{ marginBottom: 20 }}>
                                    <img src={UserImg} style={{ width: 82, objectFit: 'contain', marginRight: 15 }} />
                                    <div className="position-relative" style={{ width: '100%' }}>
                                        <label className='form-control-label'>Name</label>
                                        <input type="text" className="form-control form-control-input" placeholder='Enter Name'></input>
                                        <div className="position-absolute" style={{ left: 15, top: '50%' }}>
                                            <img src={InputUser} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                        </div>
                                    </div>
                                </div>
                                <div className="position-relative" style={{ width: '100%', marginBottom: 20 }}>
                                    <label className='form-control-label'>Phone Number</label>
                                    <div className='row m-0'>
                                        <div className='col-lg-2'>
                                            <div className='me-2'>
                                                <input type="text" className="form-control form-control-input" placeholder=''></input>
                                            </div>
                                        </div>
                                        <div className='col-lg-10'>
                                            <input type="text" className="form-control form-control-input" placeholder='Enter Name'></input>
                                            <div className="position-absolute" style={{ left: 110, top: '50%' }}>
                                                <img src={MobileIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="position-relative" style={{ width: '100%', marginBottom: 20 }}>
                                    <label className='form-control-label'>Email Address</label>
                                    <input type="text" className="form-control form-control-input" placeholder='Enter Mail'></input>
                                    <div className="position-absolute" style={{ left: 15, top: '50%' }}>
                                        <img src={MailIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end align-items-center'>
                                    <button className='blue-btn'>Save and Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
