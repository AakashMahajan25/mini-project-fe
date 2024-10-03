import React from 'react'
import CloseImg from '../../assets/images/close_icon.png';
import CreditExhausted from '../../assets/images/creditExhausted.png';
import Modal from 'react-bootstrap/Modal';
import './CreditOverModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { initiateOrder, placeOrder } from '../../screens/profile/usersSlice';
import { toast } from 'react-toastify';

function CreditOverModal({ show, handleClose, onButtonClick }) {
    const { userCredits } = useSelector(state => state.userSlice);
    const dispatch = useDispatch()
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const upgradePlan = async (payload) => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        dispatch(initiateOrder({ plan_id: userCredits.planId })).unwrap().then(async (data) => {
            const options = {
                description: 'Credits towards credit purchase',
                currency: 'INR',
                key: 'rzp_test_Ym5H3K5NhaCF0y',
                amount: data?.order_amount * 100,
                name: "Frruit",
                order_id: data?.razorpay_order_id,
                handler: async function (response) {
                    let placeOrderPayload = {
                        "order_id": data?.order_id,
                        "plan_id": userCredits.planId,
                        "payment_status": "paid",
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    }
                    dispatch(placeOrder(placeOrderPayload)).unwrap().then(async (data) => {
                        toast.success(data.message || 'Order Successfully Placed');
                        window.location.reload();
                    }).catch((error) => {
                        toast.error(error.message || "Error in completing payment")
                    });
                },
                theme: { color: '#F37254' },
                modal: {
                    ondismiss: function () {
                        toast.error('Payment was cancelled.');
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }).catch((error) => {
            toast.error(error.message || "Error in initiating order")
        });
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='md'
                className='CreditOverModalStyles'
                centered
                backdrop={userCredits?.expired ? "static" : true}
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
                        <div className='creditExhaustedSmallText'>{userCredits?.expired ? "Your plan has expired" : "You've used 80% of your available credits."}</div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <button onClick={() => upgradePlan()} type="submit" className='light-blue-btn2 me-3'>Renew Plan</button>
                            <button onClick={() => onButtonClick()} type="submit" className='blue-btn'>View Other Plans</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreditOverModal