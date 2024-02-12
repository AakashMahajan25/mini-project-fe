import React, { useState } from 'react'
import '../login/Login.scss'
import '../signup/Signup.scss'
import LoginImg from '../../assets/images/login_img.png'
import MobileIcon from '../../assets/images/mobile-icon.png';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router';
import MailIcon from '../../assets/images/mail-icon.png';

function Signup() {
    const [showCode, setShowCode] = useState(false)
    const [showCode1, setShowCode1] = useState(false)
    const [otp, setOtp] = useState('');
    let navigate = useNavigate();
    const routeChangeLogin = () => {
        let path = `/login`;
        navigate(path);
    }

    return (
        <section className='login signup-css' style={{ overflow: 'hidden' }}>
            <div style={{ overflow: 'hidden' }} className={`row justify-content-center align-items-center login-page ${window.innerWidth < 500 ? '' : ''}`} >
                <div className='col-xl-5' style={{ overflow: 'hidden' }}>
                    <div className='d-flex justify-content-center align-items-center imagecontainer'>
                        <img src={LoginImg} style={{ objectFit: 'contain', width: '100%', height: window.innerHeight / 2.5 }} />
                    </div>
                </div>
                <div className={showCode ? 'col-xl-7 login-form1' : 'col-xl-7 signup-form'} style={{ height: '100%' }}>
                    <p className='loginText text-center m-0 '>Signup</p>
                    <div className="form-outline mt-4">
                        {!showCode && !showCode1 &&
                            <>
                                <label className='form-control-label'>First Name</label>
                                <div className='w-100 mb-3'>
                                    <input type="text" className="form-control form-control-input" style={{ textIndent: 0 }} placeholder='Yaksh'></input>
                                </div>
                                <label className='form-control-label'>Last Name</label>
                                <div className='w-100 mb-3'>
                                    <input type="text" className="form-control form-control-input" style={{ textIndent: 0 }} placeholder='Rathod'></input>
                                </div>
                                <div className="position-relative" style={{ width: '100%', marginBottom: 20 }}>
                                    <label className='form-control-label'>E-mail</label>
                                    <input type="text" className="form-control form-control-input" placeholder='yaksh@airrchip.com'></input>
                                    <div className="position-absolute" style={{ left: 15, top: '53%' }}>
                                        <img src={MailIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                    </div>
                                </div>
                                <div className="position-relative" style={{ width: '100%', marginBottom: 20 }}>
                                    <label className='form-control-label'>Phone Number</label>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className="position-relative" style={{ width: '100%' }}>
                                            <input type="text" className="form-control form-control-input" placeholder='0000000000'></input>
                                            <div className="position-absolute" style={{ left: 15, top: '24%' }}>
                                                <img src={MobileIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="exampleInputEmail1">Select My Broker</label>
                                    <select id="statusDropdown" className="form-control form-select form-control-input" style={{ textIndent: 13, fontSize: 14 }} >
                                        <option selected disabled value="">Select</option>
                                        <option>I am new to Investement</option>
                                        <option>Zerodha </option>
                                        <option>Upstox</option>
                                        <option>Groww</option>
                                        <option>Angel one</option>
                                        <option>Kotak Securities</option>
                                        <option>HDFC Securities</option>
                                        <option>5 Paisa</option>
                                        <option>Motilal Oswal Financial Services</option>
                                    </select>
                                </div>
                            </>
                        }
                        {showCode && !showCode1 &&
                            <>
                                <div>
                                    <p className='p-0 mt-5' style={{ fontWeight: 600, color: '#171E42' }}>Mobile number Verification</p>
                                    <p className='p-0 m-0 privacyText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                </div>
                                <label className='form-control-label mt-3'>Phone Number</label>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <input type="text" className="form-control form-control-input me-3 phone-number" placeholder='+91'></input>
                                    <div className="position-relative" style={{ width: '100%' }}>
                                        <input type="text" className="form-control form-control-input" placeholder='99999 99999'></input>

                                        <div className="position-absolute" style={{ left: 18, top: '23%' }}>
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
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button onClick={() => setShowCode1(true)} className='btnPrimary mt-5'>Verify</button>
                                </div>
                            </>
                        }
                        {showCode && showCode1 &&
                            <>
                                <div>
                                    <p className='p-0 mt-5' style={{ fontWeight: 600, color: '#171E42' }}>Email Verification</p>
                                    <p className='p-0 m-0 mb-3 privacyText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                </div>
                                <div className="position-relative" style={{ width: '100%' }}>
                                    <label className='form-control-label mb-1'>E-mail</label>
                                    <input type="text" className="form-control form-control-input" placeholder='yaksh@airrchip.com'></input>
                                    <div className="position-absolute" style={{ left: 15, top: '50%' }}>
                                        <img src={MailIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                    </div>
                                </div>
                                <a href='' style={{ fontSize: 15 }}>Use a different e-mail</a>

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
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button className='btnPrimary mt-5'>Verify and Signup</button>
                                </div>
                            </>
                        }

                        {!showCode && !showCode1 &&
                            <>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button onClick={() => setShowCode(true)} className='btnPrimary mt-4'>Proceed and Verify</button>
                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button onClick={routeChangeLogin} className='btnSecondary mt-3'>Login Using Phone Number</button>
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