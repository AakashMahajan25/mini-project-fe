import React from 'react'
import CreditImage from '../../assets/images/CreditImage.png';
import '../PopupModal/PopupModal.scss';
import CloseIcon from '../../assets/images/close_icon.png';

function PopupModal({ imagesource1,customColor, mainheading, subheading, showActivate, additionalText, proceedText, PlansText1,PlansText2 }) {
    return (
        <>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className='popup-modal'>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img src={CloseIcon} className='close-icon' />
                            </div>
                            <div className="modal-body">
                                <div className='container'>
                                    <div className='mx-auto'>
                                        <img src={imagesource1} className='creditimage d-block mx-auto' alt="Credit Exhausted" />
                                        <div className='d-flex flex-column justify-content-center align-items-center mt-2'>
                                            <p className='main-heading' style={{color:customColor}}>{mainheading}</p>
                                            <p className='sub-heading'>{subheading}</p>
                                            {showActivate &&
                                                <>
                                                    <p className='additional-text'>
                                                        {additionalText}
                                                    </p>
                                                    <p className='proceed-text'>{proceedText}</p>
                                                </>
                                            }
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center buttonbox'>
                                            <div className='button1' style={{ backgroundColor: '#ECEFFC' }}>
                                                <p className='button-text' style={{color:'#4563E4'}}>{PlansText1}</p>
                                            </div>
                                            <div className='button1 ms-2' style={{ backgroundColor: '#4563E4' }}>
                                                <p className='button-text'>{PlansText2}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default PopupModal