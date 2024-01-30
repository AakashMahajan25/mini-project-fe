import React, { useState } from 'react'
import '../login/Login.scss'
import LoginImg from '../../assets/images/login_img.png'
import MobileIcon from '../../assets/images/mobile-icon.png';
import OtpInput from 'react-otp-input';

function Signup() {
    const [showCode, setShowCode] = useState(false)
    const [otp, setOtp] = useState('');

    return (
        <section className='login' style={{ height: window.innerHeight - 100 }}>
            <div className='d-flex justify-content-center align-items-center login-page'>
                <div className='col-xl-5'>
                    <div className='d-flex justify-content-center align-items-center h-100 imagecontainer'>
                        <img src={LoginImg} style={{ objectFit: 'contain', width: '100%', height: window.innerHeight / 2.5 }} />
                    </div>
                </div>
                <div className={showCode ? 'col-xl-7 login-form1' : 'col-xl-7 login-form'}>
                    <p className='loginText text-center m-0 '>Signup</p>
                    <div className="form-outline mt-4">
                        {!showCode &&
                            <>
                                <label className='form-control-label'>Phone Number</label>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <input type="text" className="form-control form-control-input me-3" placeholder='+91' style={{ width: '15%', textIndent: 13 }}></input>
                                    <div className="position-relative" style={{ width: '100%' }}>
                                        <input type="text" className="form-control form-control-input" placeholder='00000 00000'></input>

                                        <div className="position-absolute" style={{ left: 20, top: '25%' }}>
                                            <img src={MobileIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {showCode &&
                            <>
                                <label className='form-control-label'>Phone Number</label>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <input type="text" className="form-control form-control-input me-3" placeholder='+91' style={{ width: '15%', textIndent: 13 }}></input>
                                    <div className="position-relative" style={{ width: '100%' }}>
                                        <input type="text" className="form-control form-control-input" placeholder='99999 99999'></input>

                                        <div className="position-absolute" style={{ left: 18, top: '25%' }}>
                                            <img src={MobileIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                </div>
                                <a href='' style={{ fontSize: 15 }}>Use a different Number</a>

                                <div className="form-outline verification">
                                    <label className="form-label my-2">Type your 6 digit security code</label>
                                    <div className='d-flex'>
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            renderInput={(props) => <input {...props} style={{
                                                width: 56.68,
                                                outline: 'none',
                                            }} className='verificationBox text-center me-2' />}
                                        />
                                    </div>
                                </div>
                                <p className='privacyText mt-0' style={{ fontSize: 15 }}>Didn't get the code? <a href=''>Resend</a></p>
                            </>
                        }
                        {showCode &&
                            <div className='d-flex justify-content-center align-items-center'>
                                <button onClick={() => setShowCode(true)} className='btnPrimary mt-5'>Signup</button>
                            </div>
                        }
                        {!showCode &&
                            <>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button onClick={() => setShowCode(true)} className='btnPrimary mt-5'>Get OTP</button>
                                </div>
                                <div className='d-flex  align-items-center mt-3'>
                                    <div className='horizontalLine w-100'></div>
                                    <div className='mx-2' style={{ fontWeight: 700, fontSize: 20, color: '#C6C6C6' }}>OR</div>
                                    <div className='horizontalLine w-100'></div>
                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button className='btnSecondary mt-3'>Login Using Phone Number</button>
                                </div>
                            </>
                        }
                        <p className='privacyText text-center'>By signing up, you accept our <a style={{ textDecoration: 'none' }} href=''> Terms and Conditions</a></p>
                        <p className='privacyText text-center mt-0'>See our <a style={{ textDecoration: 'none' }} href=''> Privacy Policy</a></p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Signup