import React, { useState } from 'react'
import '../login/Login.scss'
import LoginImg from '../../assets/images/login_img.png'

function Login() {
    const [showCode, setShowCode] = useState(false)
    return (
        <section className='login' style={{ height: window.innerHeight - 100 }}>
            <div className='d-flex justify-content-center align-items-center login-page'>
                <div className='col-xl-5'>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <img src={LoginImg} style={{ objectFit: 'contain', width: '100%', height: window.innerHeight / 2.5 }} />
                    </div>
                </div>
                <div className='col-xl-7 login-form '>
                    <p className='loginText text-center m-0 '>Login</p>

                    <div className="form-outline mt-4">
                        {showCode &&
                            <>
                                <label className="form-label">Phone Number</label>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <input type="text" id="form3Example3" className="form-control form-control-lg me-3"
                                        placeholder="+91" style={{ width: '15%' }} />
                                    <input type="text" id="form3Example3" className="form-control form-control-lg "
                                        placeholder="99999 99999" />
                                </div>
                                <a href=''>Use a different Number</a>
                            </>
                        }
                        {!showCode &&
                            <>
                                <label className="form-label">Phone Number</label>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <input type="text" id="form3Example3" className="form-control form-control-lg me-3"
                                        placeholder="+91" style={{ width: '15%' }} />
                                    <input type="text" id="form3Example3" className="form-control form-control-lg "
                                        placeholder="00000 00000" />
                                </div>
                            </>
                        }

                        <div className='d-flex justify-content-center align-items-center'>
                            <button onClick={() => setShowCode(true)} className='btnPrimary mt-5'>Get OTP</button>
                        </div>
                        <div className='d-flex  align-items-center just mt-3'>
                            <div className='horizontalLine w-100'></div>
                            <div className='mx-2' style={{ fontWeight: 700, fontSize: 20, color: '#C6C6C6' }}>OR</div>
                            <div className='horizontalLine w-100'></div>
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <button className='btnSecondary mt-3'>Signup Using Phone Number</button>
                        </div>
                        <p className='privacyText text-center'>By signing up, you accept our <a href=''> Terms and Conditions</a></p>
                        <p className='privacyText text-center mt-0'>See our <a href=''> Privacy Policy</a></p>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Login