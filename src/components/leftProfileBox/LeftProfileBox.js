import React from 'react'
import './LeftProfileBox.scss';
import LogOut from '../../assets/images/logout-outline.png';
import { useNavigate } from 'react-router-dom';

function LeftProfileBox() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <div className='profile-left-box' >
                <div className='box' style={{ height: window.innerHeight - 130 }}>
                    <button className='side-box-light-blue-btn mb-2'>Profile</button>
                    <button className='side-box-light-blue-btn mb-2'>Help</button>
                    <button className='side-box-light-blue-btn mb-2'>Terms and condition</button>
                    <button className='side-box-light-blue-btn mb-5'>Privacy Policy</button>
                    <button style={{ color: '#4563E4' }} className='side-box-light-blue-btn mb-2 text-center' onClick={handleLogout}>Logout<img src={LogOut} style={{ width: 24, objectFit: 'contain', marginLeft: 5 }} /></button>
                </div>
            </div>
        </>
    )
}

export default LeftProfileBox
