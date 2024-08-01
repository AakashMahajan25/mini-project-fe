import React from 'react'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png'
import PaymentSuccesIcon from '../../assets/images/PaymentSuccessImg.png'
import PaymentFailedIcon from '../../assets/images/payment-fail-icon.png'
import '../payments/PaymentStatus.scss'
import { useNavigate } from 'react-router-dom'

function PaymentStatus() {

    const navigate = useNavigate();

    const handleBackButton = () => {
        navigate('/')
    }

    const handleSubmit = () => {
        navigate('/dashboard')
    }


  return (
    <div className='payment-page-css'>
            <button onClick={handleBackButton} className='light-blue-btn'>
                <img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />
                Back
            </button>
            <div className='d-flex flex-column align-items-center'>
                <img src={PaymentSuccesIcon} className='main-image' />
                <p className='payment-heading'>Payment Successful</p>
                <p className='payment-subheading'>Thank you for your payment. An automated payment receipt will be sent to your registered email</p>
                <button onClick={handleSubmit} type="submit" className='blue-btn'>Return to Dashboard</button>
            </div>
            {/* <div className='d-flex flex-column align-items-center'>
                <img src={PaymentFailedIcon} className='main-image' />
                <p className='payment-heading failed-text'>Payment Failed!</p>
                <p className='payment-subheading'>We're sorry, but your payment could not be processed.</p>
                <button onClick={handleSubmit} type="submit" className='blue-btn'>Retry Payment</button>
            </div> */}

        </div>
  )
}

export default PaymentStatus