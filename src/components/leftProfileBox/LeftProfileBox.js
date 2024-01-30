import React from 'react'
import './LeftProfileBox.scss';
import LogOut from '../../assets/images/logout-outline.png';

function LeftProfileBox() {
    return (
        <>
            <div className='profile-left-box'>
                <div className='box'>
                    <button className='side-box-light-blue-btn mb-2'>Profile</button>
                    <button className='side-box-light-blue-btn mb-2'>Help</button>
                    <button className='side-box-light-blue-btn mb-2'>Terms and condition</button>
                    <button className='side-box-light-blue-btn mb-5'>Privacy Policy</button>
                    <button style={{ color: '#4563E4' }} className='side-box-light-blue-btn mb-2 text-center'>Privacy Policy<img src={LogOut} style={{ width: 24, objectFit: 'contain', marginLeft: 5 }} /></button>
                </div>
            </div>
        </>
    )
}

export default LeftProfileBox
