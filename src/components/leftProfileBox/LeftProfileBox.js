import React, { useState } from 'react'
import './LeftProfileBox.scss';
import LogOut from '../../assets/images/logout-outline.png';
import Airrchip from '../../assets/images/airrchipLogo.png';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import ReactGA from 'react-ga4';

function LeftProfileBox({ handlePreferencesClick, handleProfileClick, isPreferencesActive, isPaymentHistoryActive, isshowCodeActive, isHelpActive, handleHelpClick, handlePaymentHistoryClick, isTermsConditionActive, handleTermsConditionClick, isPrivacyPolicyActive, handlePrivacyPolicyClick, isPricingActive, handlePricingClick, isViewPlansActive, handleViewPlansClick, isCancellationPolicyActive, handleCancellationPolicyClick, isFeedbackActive, handleFeedbackClick, handleAboutAirrchipClick, isAboutAirrchipActive }) {
    const navigate = useNavigate();


    return (
        <>
            <div className='profile-left-box' >
                <div className='box' style={{ height: window.innerWidth < 500 ? '' : window.innerHeight - 68 }}>
                    <div className={`mb-2 ${isshowCodeActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handleProfileClick}>Profile</div>
                    {/* <div className={`mb-2 ${isPaymentHistoryActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handlePaymentHistoryClick}>Payment History</div> */}
                    {/* <div className={`mb-2 ${isPreferencesActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handlePreferencesClick}>Preferences</div> */}
                    <div className={`mb-2 ${isViewPlansActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handleViewPlansClick}>Enterprise AI Plan</div>
                    {/* <div className={`mb-2 ${isPricingActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handlePricingClick}>Pricing</div> */}
                    <div className={`mb-2 ${isAboutAirrchipActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handleAboutAirrchipClick}>About Airrchip</div>
                    {/* <div className={`mb-2 ${isFeedbackActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handleFeedbackClick}>Feedback</div> */}
                    {/* <div className={`mb-2 ${isHelpActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handleHelpClick}>Help and FAQ</div> */}
                    {/* <div className={`mb-2 ${isCancellationPolicyActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={handleCancellationPolicyClick}>Cancellation and Refund Policy</div> */}
                    <div className={`mb-2 ${isTermsConditionActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={() => {
                        ReactGA.event({
                            category: 'Profiling',
                            action: 'user_termsncondition',
                            label: 'User Terms & Condition'
                        });
                        handleTermsConditionClick();
                    }}>Terms and Conditions</div>
                    <div className={`mb-2 ${isPrivacyPolicyActive ? 'side-box-light-blue-btn-active' : 'side-box-light-blue-btn'}`} onClick={() => {
                        ReactGA.event({
                            category: 'Profiling',
                            action: 'user_privacypolicy',
                            label: 'User Privacy Policy'
                        });
                        handlePrivacyPolicyClick();
                    }}>Privacy Policy</div>
                <img src={Airrchip} className='airrchipLogo mt-2' />
                </div>
            </div>
        </>
    )
}

export default LeftProfileBox
