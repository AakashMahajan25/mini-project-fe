import React from 'react'
import CloseImg from '../../assets/images/close_icon.png';
import CreditExhausted from '../../assets/images/creditExhausted.png';
import Modal from 'react-bootstrap/Modal';
import './CreditOverModal.scss';

function CreditOverModal({ show, handleClose, onButtonClick }) {
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                className='CreditOverModalStyles'
                centered
            >
                <Modal.Header>
                    <div onClick={() => handleClose()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                        <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='centerImg'>
                        <img src={CreditExhausted} className='CreditExhaustedImg' />
                        <div className='creditExhaustedText'>80% Credit Exhausted</div>
                        <div className='creditExhaustedSmallText'>You've used 80% of your available credits.</div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <button onClick={() => onButtonClick()} type="submit" className='light-blue-btn2 me-3'>Renew Plan</button>
                            <button onClick={() => onButtonClick()} type="submit" className='blue-btn'>View Other Plans</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreditOverModal