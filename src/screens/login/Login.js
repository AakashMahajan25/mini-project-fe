import React, { useState, useRef } from 'react'
import '../login/Login.scss'
import LoginImg from '../../assets/images/login_img.png'
import LoginImg2 from '../../assets/images/login-side-img.png'
import LoginImg3 from '../../assets/images/login_img3.png'
import FrruitLogo from '../../assets/images/frruitlogoLogin.png'
import InstagramAppLogo from '../../assets/images/instagram.png'
import WhatsAppLogo from '../../assets/images/whatsapp.png'
import linkedinLogo from '../../assets/images/linkedin.png'
import MobileIcon from '../../assets/images/mobile-icon.png';
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

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const numberRef = useRef(null)
    const [showCode, setShowCode] = useState(false)
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showTermsConditions, setShowTermsConditions] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

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

    const routeChangeSignUp = () => {
        let path = `/signUp`;
        navigate(path);
    }

    const handleDifferentNumberClick = () => {
        setShowCode(false);
        setOtp('')
        if (numberRef?.current) {
            numberRef?.current.focus()
        }
    };

    const handleGetOtp = () => {
        if (!phoneNumber) {
            toast.error("Please enter Phone number")
            if (numberRef?.current) {
                numberRef?.current.focus()
            }
            return;
        }
        const data = {
            type: 'mobile',
            mobile: "+91" + phoneNumber
        }
        dispatch(loginOtp(data))
            .unwrap()
            .then((res) => {
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
            toast.error("Please enter valid otp")
            return;
        }
        const requestData = {
            otp,
            type: 'mobile',
            mobile: "+91" + phoneNumber
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

    return (
        <>
            <div className='login'>
                <div className='imageBG' style={{ height: 'calc(100svh)' }}>
                    <img src={loginBg} className='imageHeight' style={{ height: 'calc(100svh)' }} alt="Header" />
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
                                            <div class="mb-auto w-100">
                                                <div className='loginMainTextStyle' style={{ marginTop: 16 }}>India's 1<sup className='suptext'>ST</sup>AI Powered</div>
                                                <div className='loginMainTextStyle'>capital markets search engine</div>
                                                <div className='loginMainTextParaStyle'>
                                                    Initiate dynamic conversations with Frruit to tap into both real-time and historical data on thousands of stocks , market-moving information , discover hidden correlations between financial market events and their impact on stock price movements !
                                                </div>
                                                <div className='loginMainTextParaStyle'>
                                                    No more navigating through mountains of data or struggling through complicated search reports.
                                                </div>
                                                <div className='loginMainTextParaStyle'>
                                                    Our intuitive natural language interface instantly serves up the jargon free crucial insights, empowering you to make better informed decisions !
                                                </div>
                                            </div>
                                            <div className='hideformobile'>
                                                <div className='loginMainTextParaStyle' style={{ fontWeight: 600 }}>Disclaimer</div>
                                                <div className='small-desc-text'>
                                                    Frruit is an AI powered capital markets search engine powered by powerful generative language models. Frruit may occasionally produce inaccurate or inappropriate information. Please be aware that any content generated by Frruit should not be considered as investment advice, or a recommendation to buy or sell securities, and it should not be the sole basis for any investment decisions. Frruit output is provided 'as is,' and Airrchip makes no guarantees regarding its accuracy, completeness, quality, timeliness, or any other attributes. We strongly advise independently verifying the accuracy of Frruit output for your specific needs.
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
                                            <div className='hideformobile' style={{ color: '#FFF', fontSize: 14, fontWeight: 500, marginTop: 4 }}>Data provided by C-MOTS Internet Technologies Pvt Ltd</div>
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
                                                    {!showCode &&
                                                        <>
                                                            <label className='form-control-label'>Phone Number</label>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-input me-3 nineone-input"
                                                                    placeholder='+91'
                                                                    defaultValue="+91"
                                                                    disabled
                                                                />
                                                                <div className="position-relative" style={{ width: '100%' }}>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-input"
                                                                        placeholder='0000000000'
                                                                        value={phoneNumber}
                                                                        style={{ color: 'black' }}
                                                                        onChange={(event) => {
                                                                            const numericValue = event.target.value.replace(/\D/g, '');
                                                                            setPhoneNumber(numericValue);
                                                                        }}
                                                                        ref={numberRef}
                                                                        autoFocus
                                                                        maxLength='15'
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
                                                                <input type="text" className="form-control form-control-input me-3 nineone-input" placeholder='+91' defaultValue={"+91"} disabled></input>
                                                                <div className="position-relative" style={{ width: '85%' }}>
                                                                    <input type="text" className="form-control form-control-input" placeholder='99999 99999' value={phoneNumber} disabled></input>

                                                                    <div className="position-absolute" style={{ left: 18, top: '25%' }}>
                                                                        <img src={MobileIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <a style={{ fontSize: 15, textDecoration: 'underline', color: 'blue', fontFamily: "Roboto" }} onClick={handleDifferentNumberClick}>Use a different Number</a>
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
                                                            <p className='privacyText mt-0' style={{ fontSize: 15 }}>Didn't get the code? <a style={{ textDecoration: 'underline', color: 'blue' }}>Resend</a></p>
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
                                                                <button onClick={routeChangeSignUp} className='btnSecondary mt-3'>Sign Up</button>
                                                            </div>
                                                        </>
                                                    }
                                                    <p className='privacyText text-center'>By signing up, you accept our <a style={{ textDecoration: 'none' }} className='bluetext' onClick={handleShowTermsConditions}> Terms and Conditions</a></p>
                                                    <p className='privacyText text-center mt-0'>See our <a style={{ textDecoration: 'none' }} className='bluetext' onClick={handleShowPrivacyPolicy}> Privacy Policy</a></p>
                                                    <div className='followUsHideforWeb' style={{ color: '#6F6B7D', fontSize: 12, fontWeight: 400, marginTop: 20 }}>Data provided by C-MOTS Internet Technologies Pvt Ltd</div>
                                                </div>
                                            </div>

                                            <div className='followUsHideforWeb'>
                                                <div className='followUsDflex'>
                                                <div className='FollowUsText me-3'>Follow us on</div>
                                                    {/* <img src={WhatsAppLogo} className='socialLogos' /> */}
                                                    <img src={InstagramAppLogo} className='socialLogos' />
                                                    <img src={linkedinLogo} className='socialLogos me-0' />
                                                </div>
                                                <div className='loginMainTextParaStyle' style={{ display: 'block',fontWeight: 600 }}>Disclaimer</div>
                                                <div className='small-desc-text'>
                                                    Frruit is an AI powered capital markets search engine powered by powerful generative language models. Frruit may occasionally produce inaccurate or inappropriate information. Please be aware that any content generated by Frruit should not be considered as investment advice, or a recommendation to buy or sell securities, and it should not be the sole basis for any investment decisions. Frruit output is provided 'as is,' and Airrchip makes no guarantees regarding its accuracy, completeness, quality, timeliness, or any other attributes. We strongly advise independently verifying the accuracy of Frruit output for your specific needs.
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