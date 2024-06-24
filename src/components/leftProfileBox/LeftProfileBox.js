import React, { useState } from 'react'
import './LeftProfileBox.scss';
import LogOut from '../../assets/images/logout-outline.png';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import ReactGA from 'react-ga4';

function LeftProfileBox({ handlePreferencesClick, handleProfileClick, isPreferencesActive, isPaymentHistoryActive, isshowCodeActive, isHelpActive, handleHelpClick, handlePaymentHistoryClick }) {
    const navigate = useNavigate();


    return (
        <>
            <div className='profile-left-box' >
                <div className='box' style={{ height: window.innerWidth < 500 ? '' : window.innerHeight - 68 }}>
                    <div className={`mb-2 ${isshowCodeActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handleProfileClick}>Profile</div>
                    <div className={`mb-2 ${isPaymentHistoryActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handlePaymentHistoryClick}>Payment History</div>
                    <div className={`mb-2 ${isPreferencesActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handlePreferencesClick}>Preferences</div>
                    <div className={`mb-2 ${isHelpActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handleHelpClick}>Help and FAQ</div>
                    <div className='mb-2 side-box-light-blue-btn' onClick={() => {
                        ReactGA.event({
                            category: 'Profiling',
                            action: 'user_termsncondition',
                            label: 'User Terms & Condition'
                        });
                    }}>Terms and condition</div>
                    <div className='mb-5 side-box-light-blue-btn' onClick={() => {
                        ReactGA.event({
                            category: 'Profiling',
                            action: 'user_privacypolicy',
                            label: 'User Privacy Policy'
                        });
                    }}>Privacy Policy</div>
                </div>
            </div>
        </>
    )
}

export default LeftProfileBox
