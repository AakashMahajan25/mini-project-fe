import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import CloseImg from '../../assets/images/close_icon.png';
import SuccessIcon from '../../assets/images/SuccessIcon.png';
import FailedIcon from '../../assets/images/FailedIcon.png';
import './PaymentModal.scss';

function PaymentModal({ type, transactid, amount, credits }) {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleClose1 = () => {
        console.log('Proceed button clicked=======');
        setShow(false);
    };

    const handleClose2 = () => {
        console.log('Close button clicked=========');
        setShow(false);
    };

    const renderModalContent = () => {
        switch (type) {
            case 'success':
                return (
                    <>
                        <img src={SuccessIcon} className='successiconImage' />
                        <div className='heading'>Payment Successful! </div>
                        <div className='subheading'>
                            Thank you for your purchase.
                        </div>
                        <div className='borderline'></div>
                        <div className='idtext text-center'>
                            Transaction ID : {transactid}
                        </div>
                        <div className='borderline' style={{marginTop:0}} ></div>
                        <div className='d-flex justify-between mb-4 mt-4'>
                            <div className='col-xl-6'>
                                <p className='box-heading'>Amount Paid:</p>
                                <p className='amount-text'>{amount}</p>
                            </div>
                            <div className='borderline'></div>
                            <div className='col-xl-6'>
                                <p className='box-heading'>Credits Received:</p>
                                <p className='credit-text'>{credits}</p>
                            </div>
                        </div>
                    </>
                );
            case 'failed':
                return (
                    <>
                        <img src={FailedIcon} className='successiconImage' />
                        <div className='heading' style={{ color: '#EA5455' }} >Payment Failed!</div>
                        <div className='subheading'>
                            Thank you for your purchase.
                        </div>
                        <div className='borderline'></div>
                        <div className='idtext text-center'>
                            Transaction ID : {transactid}
                        </div>
                        <div className='borderline' style={{marginTop:0,marginBottom:30}} ></div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <button onClick={handleShow} className='open-modal-btn'>Open Modal</button>

            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                className='PaymentModalStyles'
                centered
            >
                <Modal.Header className='header'>
                    <div onClick={() => handleClose2()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                        <img src={CloseImg} className='me-1 closeimage' width={32} style={{ objectFit: 'contain' }} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='centerImg'>
                        {renderModalContent()}
                        <div className='d-flex justify-content-center align-items-center'>
                            <button onClick={() => handleClose1()} type="submit" className='blue-btn px-5'>
                                {type === 'success' ? 'Got it!' : 'Try Again'}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PaymentModal