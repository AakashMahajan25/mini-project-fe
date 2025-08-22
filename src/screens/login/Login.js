import React, { useState, useRef, useEffect } from 'react'
import '../login/Login.scss'
import LoginImg from '../../assets/images/login_img.png'
import LoginImg2 from '../../assets/images/login-side-img.png'
import LoginImg3 from '../../assets/images/login_img3.png'
import FrruitLogo from '../../assets/images/frruitlogoLogin.png'
import InstagramAppLogo from '../../assets/images/instagram.png'
import WhatsAppLogo from '../../assets/images/whatsapp.png'
import linkedinLogo from '../../assets/images/linkedin.png'
import MailIcon from '../../assets/images/mail-icon.png';
import loginBg from '../../assets/images/loginBgImg.jpg';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loginOtp, verifyLoginOtp } from './slice';
import { toast } from 'react-toastify';
import ReactGA from 'react-ga4';
import Modal from 'react-bootstrap/Modal';
import TermsAndCondition from '../../components/profile/termsAndCondition/TermsAndCondition';
import PrivacyPolicy from '../../components/profile/privacyPolicy/PrivacyPolicy';
import CloseImg from '../../assets/images/close_icon.png';
import { resendOtp } from '../signup/slice'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const numberRef = useRef(null)
    const [showCode, setShowCode] = useState(false)
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [showTermsConditions, setShowTermsConditions] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [timer, setTimer] = useState(60)
    const [timerEnded, setTimerEnded] = useState(true)

    const handleShowTermsConditions = (data) => {
        setShowTermsConditions(true);
    };
    const handleCloseTermsConditions = () => {
        setShowTermsConditions(false);
    };
    const handleShowPrivacyPolicy = (data) => {
        setShowPrivacyPolicy(true);
    };
    const handleClosePrivacyPolicy = () => {
        setShowPrivacyPolicy(false);
    };

    const { isLoading } = useSelector(state => state?.loginSlice)

    const formattedTime = String(timer).padStart(2, '0');

    useEffect(() => {
        if (timer === 0) {
            setTimerEnded(true);
            return;
        }

        const timerInterval = setInterval(() => {
            setTimer((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [timer]);

    const routeChangeSignUp = () => {
        let path = `/signUp`;
        navigate(path);
    }

    const handleDifferentEmailClick = () => {
        setShowCode(false);
        setOtp('')
        if (numberRef?.current) {
            numberRef?.current.focus()
        }
    };

    const handleGetOtp = () => {
        if (!email) {
            toast.error("Please enter Email address")
            if (numberRef?.current) {
                numberRef?.current.focus()
            }
            return;
        }
        const data = {
            email: email
        }
        dispatch(loginOtp(data))
            .unwrap()
            .then((res) => {
                setTimerEnded(false)
                setTimer(60)
                setShowCode(true)
                toast.success(res?.message)
            })
            .catch((error) => {
                toast.error(error?.message)
            })
    }

    const handleLogin = async () => {
        const regex = /^[0-9]{0,6}$/; // Regular expression to match 6 digits
        if (!regex.test(otp) || otp?.length < 6) {
            toast.error("Please enter valid OTP")
            return;
        }
        const requestData = {
            otp,
            email: email
        }
        await dispatch(verifyLoginOtp(requestData))
            .unwrap()
            .then(async (res) => {
                localStorage.setItem('marketType', 'IND')
                ReactGA.event({
                    category: 'User',
                    action: 'market_selection',
                    label: 'User Market Selected'
                });
                localStorage.setItem('token', res.data.token)
                let path = `/dashboard`;
                navigate(path);
                ReactGA.event({
                    category: 'User',
                    action: 'login',
                    label: 'User LoggedIn'
                });
                toast.success("Logged In Successfully")
            })
            .catch((error) => {
                toast.error(error?.message)
            })
    }

    const handleResendOtp = () => {
        const data = {
            type: 'email',
            email: email
        }

        dispatch(resendOtp(data))
            .unwrap()
            .then(async (res) => {
                toast.success(res.message)
                setTimerEnded(false)
                setTimer(60)
            })
            .catch((error) => {
                toast.error(error.message || 'Failed to resend otp');
            })
    }

    return (
        <>
            <div className='login'>
                <div className='imageBG'>
                    <img src={loginBg} className='imageHeight'  alt="Header" />
                    <div className='innerImgTextBox'>
                        <div className='w-100'>
                            <>
                                <div className='justify-content-center align-items-center login-page'>
                                    <div className='col-xl-7'>
                                        {/* <div className='d-flex justify-content-center align-items-center h-100 imagecontainer'>
                                            <img src={LoginImg3} style={{ objectFit: 'contain', width: '100%', height: window.innerHeight / 2 }} />
                                        </div> */}
                                        {/* <div className='login-left-part'>
                                            <div style={{ display: 'flex', alignItems: 'self-start', height: 'auto' }}>hiiiiiiiiiiiiiiiii</div>
                                            <div>hiiiiiiiiiiiiiiiii</div>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', height: 'auto' }}>hiiiiiiiiiiiiiiiii</div>
                                        </div> */}
                                        <div class="d-flex align-items-start flex-column loginleftsideCol">
                                            <div class="mb-auto"><img className='frruitLogostyle' src={FrruitLogo} style={{ objectFit: "contain" }} /></div>
                                            <div className={window.innerWidth < 520 ? "w-100" : "mb-auto w-100"}>
                                                <div className='loginMainTextStyle' style={{ marginTop: 16 }}>AI Powered financial</div>
                                                <div className='loginMainTextStyle'>markets search engine</div>
                                                <div className='loginMainTextParaStyle' style={{fontSize: 16}}>
                                                Get actionable financial market insights instantly through conversational search!
                                                </div>
                                            </div>
                                            <div className='loginMainTextParaStyle hideformobile mb-5' style={{fontSize: 36, fontWeight: 700}}>Search for free, discover fast !</div>
                                            <div className='hideformobile'>
                                                <div className='loginMainTextParaStyle' style={{ fontWeight: 600 }}>Disclaimer</div>
                                                <div className='small-desc-text'>
                                                    Frruit is an AI powered financial markets search engine built using powerful generative AI large language models. Frruit may occasionally produce inaccurate or inappropriate information. Please be aware that any content generated by Frruit should not be considered as investment advice, or a recommendation to buy or sell securities, and it should not be the sole basis for any investment decisions. Frruit output is provided 'as is,' and Airrchip makes no guarantees regarding its accuracy, completeness, quality, timeliness, or any other attributes. We strongly advise independently verifying the accuracy of Frruit output for your specific needs.
                                                </div>
                                                <div className='d-flex justify-content-start align-items-center mt-2'>
                                                    <div className='FollowUsText me-2'>Follow us on</div>
                                                    {/* <img src={WhatsAppLogo} className='socialLogos' /> */}
                                                    <a href='https://www.instagram.com/frruitapp/?igsh=MW1iNmF0OWtrOXdvYw%3D%3D'>
                                                        <img src={InstagramAppLogo} className='socialLogos' />
                                                    </a>
                                                    <a href='https://ae.linkedin.com/company/frruit'>
                                                        <img src={linkedinLogo} className='socialLogos' />
                                                    </a>
                                                </div>
                                            </div>
                                            {/* <div className='hideformobile' style={{ color: '#FFF', fontSize: 14, fontWeight: 500, marginTop: 4 }}>Data provided by C-MOTS Internet Technologies Pvt Ltd</div> */}
                                        </div>
                                    </div>
                                    <div className='col-xl-5'>
                                        <div className={showCode ? 'login-form1' : 'login-form'}>
                                            <div className='d-flex justify-content-center align-items-center h-100'>
                                                {/* <div>
                                                    <img src={FrruitLogo} width={108} style={{ position: 'absolute', top: -5 }} />
                                                    </div> */}
                                                <div className="form-outline">
                                                    <p className='loginText text-center'>Login</p>
                                                    <div className='loginText followUsHideforWeb' style={{fontSize: 18, fontWeight: 700}}>Search for free, discover fast !</div>
                                                    {!showCode &&
                                                        <>
                                                            <label className='form-control-label'>Email Address</label>
                                                            <div className="position-relative" style={{ width: '100%' }}>
                                                                <input
                                                                    type="email"
                                                                    className="form-control form-control-input"
                                                                    placeholder='Enter your email address'
                                                                    value={email}
                                                                    style={{ color: 'black' }}
                                                                    onChange={(event) => {
                                                                        setEmail(event.target.value);
                                                                    }}
                                                                    ref={numberRef}
                                                                    autoFocus
                                                                    onKeyDown={(event) => event?.key === 'Enter' && handleGetOtp()}
                                                                />
                                                                <div className="position-absolute" style={{ left: 20, top: '28%' }}>
                                                                    <img src={MailIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                    {showCode &&
                                                        <>
                                                            <label className='form-control-label'>Email Address</label>
                                                            <div className="position-relative" style={{ width: '100%' }}>
                                                                <input type="email" className="form-control form-control-input" placeholder='your@email.com' value={email} disabled></input>
                                                                <div className="position-absolute" style={{ left: 18, top: '25%' }}>
                                                                    <img src={MailIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                                                </div>
                                                            </div>
                                                            <a style={{ fontSize: 15, textDecoration: 'underline', color: 'blue', fontFamily: "Roboto" }} onClick={handleDifferentEmailClick}>Use a different Email</a>
                                                            <div className="form-outline verification">
                                                                <label className="form-label">Type your 6 digit security code</label>
                                                                <div className='d-flex'>
                                                                    <OtpInput
                                                                        value={otp}
                                                                        onChange={setOtp}
                                                                        numInputs={6}
                                                                        shouldAutoFocus
                                                                        renderInput={(props) => <input {...props} style={{

                                                                            outline: 'none',
                                                                        }}
                                                                            className='verificationBox text-center me-2'
                                                                            pattern="[0-9]*"
                                                                            inputMode="numeric"
                                                                            onKeyDown={event => event?.key === 'Enter' && handleLogin()}
                                                                        />}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {
                                                                timerEnded ?
                                                                    <p className='privacyText resendtext mt-0' style={{ fontSize: 15 }}>Didn't get the code? <a style={{ cursor: "pointer", fontSize: 15, textDecoration: 'underline', color: 'blue' }} onClick={handleResendOtp}>Resend</a></p> :
                                                                    <p className='privacyText resendtext mt-0' style={{ fontSize: 15 }}>Request new OTP in 00:{formattedTime}</p>
                                                            }
                                                            {/* <p className='privacyText mt-0' style={{ fontSize: 15 }}>Didn't get the code? <a style={{ textDecoration: 'underline', color: 'blue' }}>Resend</a></p> */}
                                                        </>
                                                    }
                                                    {showCode &&
                                                        // <div className='d-flex justify-content-center align-items-center'>
                                                        //     <button onClick={handleLogin} className='btnPrimary mt-5'>Login</button>
                                                        // </div>
                                                        <div className='d-flex justify-content-center align-items-center'>
                                                            <button onClick={handleLogin} className='btnPrimary mt-5'>
                                                                {isLoading ? (
                                                                    <div className="spinner-border text-light" role="status">
                                                                        <span className="sr-only"></span>
                                                                    </div>
                                                                ) : (
                                                                    "Login"
                                                                )}
                                                            </button>
                                                        </div>
                                                    }
                                                    {!showCode &&
                                                        <>
                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                {/* <button onClick={handleGetOtp} className='btnPrimary mt-5'>Get OTP</button> */}
                                                                <button onClick={handleGetOtp} className='btnPrimary mt-5'>
                                                                    {isLoading ? (
                                                                        <div className="spinner-border text-light" role="status">
                                                                            <span className="sr-only"></span>
                                                                        </div>
                                                                    ) : (
                                                                        "Get OTP"
                                                                    )}
                                                                </button>
                                                            </div>
                                                            <div className='d-flex align-items-center just mt-3 linebox'>
                                                                <div className='horizontalLine w-100'></div>
                                                                <div className='mx-2' style={{ fontWeight: 700, fontSize: 20, color: '#C6C6C6' }}>OR</div>
                                                                <div className='horizontalLine w-100'></div>
                                                            </div>
                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <button onClick={routeChangeSignUp} className='btnSecondary mt-3'>Sign Up with Email</button>
                                                            </div>
                                                        </>
                                                    }
                                                    <p className='privacyText text-center'>By signing up, you accept our <a style={{ textDecoration: 'none' }} className='bluetext' onClick={handleShowTermsConditions}> Terms and Conditions</a></p>
                                                    <p className='privacyText text-center mt-0'>See our <a style={{ textDecoration: 'none' }} className='bluetext' onClick={handleShowPrivacyPolicy}> Privacy Policy</a></p>
                                                    {/* <div className='followUsHideforWeb' style={{ color: '#6F6B7D', fontSize: 12, fontWeight: 400, marginTop: 20 }}>Data provided by C-MOTS Internet Technologies Pvt Ltd</div> */}
                                                </div>
                                            </div>

                                            <div className='followUsHideforWeb'>
                                                <div className='followUsDflex'>
                                                    <div className='FollowUsText me-3'>Follow us on</div>
                                                    {/* <img src={WhatsAppLogo} className='socialLogos' /> */}
                                                    <a href='https://www.instagram.com/frruitapp/?igsh=MW1iNmF0OWtrOXdvYw%3D%3D'>
                                                        <img src={InstagramAppLogo} className='socialLogos' />
                                                    </a>
                                                    <a href='https://ae.linkedin.com/company/frruit'>
                                                        <img src={linkedinLogo} className='socialLogos me-0' />
                                                    </a>
                                                </div>
                                                <div className='loginMainTextParaStyle' style={{ display: 'block', fontWeight: 600 }}>Disclaimer</div>
                                                <div className='small-desc-text' style={{margin: '0 -12px 24px', textAlign: 'justify'}}>
                                                    Frruit is an AI powered financial markets search engine built using powerful generative AI large language models. Frruit may occasionally produce inaccurate or inappropriate information. Please be aware that any content generated by Frruit should not be considered as investment advice, or a recommendation to buy or sell securities, and it should not be the sole basis for any investment decisions. Frruit output is provided 'as is,' and Airrchip makes no guarantees regarding its accuracy, completeness, quality, timeliness, or any other attributes. We strongly advise independently verifying the accuracy of Frruit output for your specific needs.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showTermsConditions}
                onHide={handleCloseTermsConditions}
                size='lg'
                className='viewModal2'
                scrollable
                centered
            >
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className='header-text'>Terms and Conditions</div>
                        <div onClick={() => handleCloseTermsConditions()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='viewModal2 '>
                        <div className='row' style={{ marginLeft: 0 }}>
                            <TermsAndCondition />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showPrivacyPolicy}
                onHide={handleClosePrivacyPolicy}
                size='lg'
                className='viewModal2'
                scrollable
                centered
            >
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className='header-text'>Privacy Policy</div>
                        <div onClick={() => handleClosePrivacyPolicy()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='viewModal2 '>
                        <div className='row' style={{ marginLeft: 0 }}>
                            <PrivacyPolicy />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default Login