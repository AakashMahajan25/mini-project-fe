import React, { useState, useRef } from 'react'
import '../login/Login.scss'
import LoginImg from '../../assets/images/login_img.png'
import LoginImg2 from '../../assets/images/login-side-img.png'
import FrruitLogo from '../../assets/images/frruit-logo.png'
import MobileIcon from '../../assets/images/mobile-icon.png';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loginOtp, verifyLoginOtp } from './slice';
import { toast } from 'react-toastify';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const numberRef = useRef(null)
    const [showCode, setShowCode] = useState(false)
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const { isLoading } = useSelector(state => state?.loginSlice)

    const routeChangeSignUp = () => {
        let path = `/signUp`;
        navigate(path);
    }

    const handleDifferentNumberClick = () => {
        setShowCode(false); 
        if (numberRef?.current) {
            numberRef?.current.focus()
        }
    };

    const handleGetOtp = () => {
        if(!phoneNumber){
            toast.error("Please enter Phone number")
            if (numberRef?.current) {
                numberRef?.current.focus()
            }
            return;
        }
        const data = {
            type: 'mobile',
            mobile: "+91"+phoneNumber
        }
        dispatch(loginOtp(data))
            .unwrap()
            .then((res) => {
                setShowCode(true)
                toast.success(res?.message)
                
            })
            .catch((error) => {
                console.log('error', error)
                toast.error(error?.message)
            })
    }

    const handleLogin = () => {
        const regex = /^[0-9]{0,6}$/; // Regular expression to match 6 digits
        if (!regex.test(otp) || otp?.length < 6) {
            toast.error("Please enter valid otp")
            return;
        }
        const requestData = {
            otp,
            type: 'mobile',
            mobile: "+91"+phoneNumber
        }
        dispatch(verifyLoginOtp(requestData))
            .unwrap()
            .then(async (res) => {
                localStorage.setItem('token', res.data.token)
                let path = `/market`;
                navigate(path);               
                toast.success("Logged In Successfully")
            })
            .catch((error) => {
                console.log('error', error)
                toast.error(error?.message)
            })
    }

    return (
        <section className='login' style={{ height: window.innerHeight - 100 }}>
            <div className='d-flex justify-content-center align-items-center login-page'>
                <div className='col-xl-5'>
                    <div className='d-flex justify-content-center align-items-center h-100 imagecontainer'>
                        <img src={LoginImg2} style={{ objectFit: 'contain', width: '100%', height: window.innerHeight / 2 }} />
                    </div>
                </div>
                <div className={showCode ? 'col-xl-7 login-form1' : 'col-xl-7 login-form'}>
                    <div style={{position:'relative'}}>
                    <p className='loginText text-center m-0 '>Login</p>
                    <div>
                        <img src={FrruitLogo} width={108} style={{position:'absolute',top:-5}} />
                    </div>
                    </div>
                    <div className="form-outline mt-4">
                        {!showCode &&
                            <>
                                <label className='form-control-label'>Phone Number</label>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-input me-3" 
                                        placeholder='+91' 
                                        style={{ width: '15%', textIndent: 13, color: 'black' }}
                                        defaultValue="+91"
                                        disabled
                                    />
                                    <div className="position-relative" style={{ width: '100%' }}>
                                        <input
                                            type="text"
                                            className="form-control form-control-input"
                                            placeholder='00000 00000'
                                            value={phoneNumber}
                                            style={{ color: 'black' }}
                                            onChange={(event)=> setPhoneNumber(event.target.value)}
                                            ref={numberRef}
                                            onKeyDown={(event) => event?.key === 'Enter' && handleGetOtp()}
                                        />
                                        <div className="position-absolute" style={{ left: 20, top: '28%' }}>
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
                                    <input type="text" className="form-control form-control-input me-3" placeholder='+91' style={{ width: '15%', textIndent: 13 }} defaultValue={"+91"} disabled></input>
                                    <div className="position-relative" style={{ width: '100%' }}>
                                        <input type="text" className="form-control form-control-input" placeholder='99999 99999' value={phoneNumber} disabled></input>

                                        <div className="position-absolute" style={{ left: 18, top: '25%' }}>
                                            <img src={MobileIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                </div>
                                <a style={{ fontSize: 15, textDecoration: 'underline', color: 'blue' }} onClick={handleDifferentNumberClick}>Use a different Number</a>
                                <div className="form-outline verification">
                                    <label className="form-label">Type your 6 digit security code</label>
                                    <div className='d-flex'>
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            renderInput={(props) => <input {...props} style={{
                                                width: 56.68,
                                                outline: 'none',
                                            }}
                                                className='verificationBox text-center me-2' 
                                                pattern="[0-9]*"
                                                inputMode="numeric"
                                                onKeyDown={event=> event?.key === 'Enter' && handleLogin()}
                                            />}
                                        />
                                    </div>
                                </div>
                                <p className='privacyText mt-0' style={{ fontSize: 15 }}>Didn't get the code? <a style={{textDecoration: 'underline', color: 'blue'}}>Resend</a></p>
                            </>
                        }
                        {showCode &&
                            <div className='d-flex justify-content-center align-items-center'>
                                <button onClick={handleLogin} className='btnPrimary mt-5'>Login</button>
                            </div>
                        }
                        {!showCode &&
                            <>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button onClick={handleGetOtp} className='btnPrimary mt-5'>Get OTP</button>
                                </div>
                                <div className='d-flex align-items-center just mt-3'>
                                    <div className='horizontalLine w-100'></div>
                                    <div className='mx-2' style={{ fontWeight: 700, fontSize: 20, color: '#C6C6C6' }}>OR</div>
                                    <div className='horizontalLine w-100'></div>
                                </div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button onClick={routeChangeSignUp} className='btnSecondary mt-3'>Signup Using Phone Number</button>
                                </div>
                            </>
                        }
                        <p className='privacyText text-center'>By signing up, you accept our <a style={{ textDecoration: 'none' }} href=''> Terms and Conditions</a></p>
                        <p className='privacyText text-center mt-0'>See our <a style={{ textDecoration: 'none' }} href=''> Privacy Policy</a></p>
                    </div>
                </div>
            </div>
            {
                isLoading && <Loader />
            }
        </section>
    )
}

export default Login