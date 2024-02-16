import React, { useState } from 'react'
import './LeftProfileBox.scss';
import LogOut from '../../assets/images/logout-outline.png';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function LeftProfileBox({ handlePreferencesClick, handleProfileClick, isPreferencesActive, isshowCodeActive }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <div className='profile-left-box' >
                <div className='box' style={{ height: window.innerHeight - 130 }}>
                    <div className={`mb-2 ${isshowCodeActive ? 'side-box-light-blue-btn' : 'side-box-light-blue-btn-active'}`} onClick={handleProfileClick}>Profile</div>
                    <div className={`mb-2 ${isPreferencesActive ? 'side-box-light-blue-btn' : 'side-box-light-blue-btn-active'}`} onClick={handlePreferencesClick}>Preferences</div>
                    <div className='mb-2 side-box-light-blue-btn'>Help</div>
                    <div className='mb-2 side-box-light-blue-btn'>Terms and condition</div>
                    <div className='mb-5 side-box-light-blue-btn'>Privacy Policy</div>
                    <div style={{ color: '#4563E4' }} className='side-box-light-blue-btn mb-2 text-center' onClick={handleLogout}>Logout<img src={LogOut} style={{ width: 24, objectFit: 'contain', marginLeft: 5 }} /></div>
                </div>
            </div>
        </>
    )
}

export default LeftProfileBox
