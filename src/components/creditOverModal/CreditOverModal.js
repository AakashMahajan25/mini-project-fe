import React from 'react'
import CloseImg from '../../assets/images/close_icon.png';
import CreditExhausted from '../../assets/images/creditExhausted.png';
import Modal from 'react-bootstrap/Modal';
import './CreditOverModal.scss';
import { useSelector } from 'react-redux';

function CreditOverModal({ show, handleClose, onButtonClick }) {
  const { userCredits } = useSelector(state => state.userSlice);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='md'
                className='CreditOverModalStyles'
                centered
                backdrop={ userCredits?.expired ? "static": true }
                keyboard={false}
            >
                <Modal.Header>
                    {
                        !userCredits?.expired &&
                        <div onClick={() => handleClose()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                        </div>
                    }
                </Modal.Header>
                <Modal.Body>
                    <div className='centerImg'>
                        <img src={CreditExhausted} className='CreditExhaustedImg' />
                        <div className='creditExhaustedText'>{userCredits?.expired ? 'Plan Expired' : '80% Credit Exhausted'}</div>
                        <div className='creditExhaustedSmallText'>{userCredits?.expired ?"Your plan has expired":"You've used 80% of your available credits."}</div>
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