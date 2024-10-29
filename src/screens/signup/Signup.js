import React, { useEffect, useState } from 'react'
import '../login/Login.scss'
import '../signup/Signup.scss'
import LoginImg from '../../assets/images/login_img.png'
import LoginImg2 from '../../assets/images/login-side-img.png'
import LoginImg3 from '../../assets/images/login_img3.png'
import FrruitLogo from '../../assets/images/frruit-logo.png'
import PhoneOtpImage from '../../assets/images/SignUpotp.png';
import EmailOtpImage from '../../assets/images/EmailOtpImg.png';
import MobileIcon from '../../assets/images/mobile-icon.png';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router';
import MailIcon from '../../assets/images/mail-icon.png';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux';
import { resendOtp, signupOtp, signupUser, verifyOtp } from './slice';
import { toast } from 'react-toastify';
import ReactGA from 'react-ga4';
import CloseImg from '../../assets/images/close_icon.png';
import Modal from 'react-bootstrap/Modal';
import TermsAndCondition from '../../components/profile/termsAndCondition/TermsAndCondition'
import PrivacyPolicy from '../../components/profile/privacyPolicy/PrivacyPolicy'
import InstagramAppLogo from '../../assets/images/instagram.png'
import WhatsAppLogo from '../../assets/images/whatsapp.png'
import linkedinLogo from '../../assets/images/linkedin.png'
import loginBg from '../../assets/images/loginBgImg.jpg';
import FrruitLogo2 from '../../assets/images/frruitlogoLogin.png'

function Signup() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [showCode, setShowCode] = useState(false)
    const [showCode1, setShowCode1] = useState(false)
    const [otp, setOtp] = useState('');
    const [emailOtp, setEmailOtp] = useState('')
    const [showTermsConditions, setShowTermsConditions] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showError, setShowError] = useState(false);
    const { isLoading } = useSelector(state => state?.signupSlice)
    const [timer, setTimer] = useState(60)
    const [timerEnded, setTimerEnded] = useState(true)

    const formattedTime = String(timer).padStart(2, '0');

    const signupSchema = yup.object().shape({
        first_name: yup.string().required("Please enter first name."),
        last_name: yup.string().required("Please enter last name."),
        email: yup.string().email('Please enter valid Email Id').required("Please enter Email Id."),
        phone_number: yup.string().matches(/^\d{10}$/, 'Please enter proper phone number.').required("Please enter phone number."),
        country: yup.string().required("Please enter country."),
        broker: yup.string().required("Please select broker."),
    })

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(signupSchema)
    })

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

    const allValues = watch()

    const routeChangeLogin = () => {
        let path = `/login`;
        navigate(path);
    }

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

    const useDifferentClick = () => {
        setShowCode(false);
        setShowCode1(false);
        setOtp('');
        setEmailOtp('');
    }

    const toggleTermsAccepted = () => {
        setTermsAccepted(!termsAccepted);
        if (showError) setShowError(false);
    };

    const onSubmit = (data) => {
        if (!termsAccepted) {
            setShowError(true);
            return;
        }
        dispatch(signupOtp({ type: 'mobile', email: data.email, mobile: "+91" + data?.phone_number }))
            .unwrap()
            .then((res) => {
                setTimerEnded(false)
                setTimer(60)
                setShowCode(true)
                toast.success("OTP has sent successfully");
            })
            .catch((error) => {
                toast.error(error.message || "Unable to proceed");
            })
    }

    const verifyMobileOtp = () => {
        const regex = /^[0-9]{0,6}$/; // Regular expression to match 6 digits
        if (!regex.test(otp) || otp?.length < 6) {
            toast.error("Please enter valid otp");
            return;
        }

        const data = {
            otp,
            type: 'mobile',
            email: allValues?.email,
            mobile: "+91" + allValues?.phone_number,
        }
        dispatch(verifyOtp(data))
            .unwrap()
            .then(async (res) => {
                toast.success(res.message)
                // await dispatch(signupOtp({ type: 'email', email: allValues?.email, mobile: "+91" + allValues?.phone_number }))
                setTimerEnded(false)
                setTimer(60)
                setShowCode1(true)
            })
            .catch((error) => {
                toast.error(error.message || 'Failed to verify otp');
            })
    }

    const verifyEmailId = () => {
        const regex = /^[0-9]{0,6}$/; // Regular expression to match 6 digits
        if (!regex.test(emailOtp) || emailOtp?.length < 6) {
            toast.error("Please enter valid otp");
            return;
        }

        const data = {
            otp: emailOtp,
            type: 'email',
            email: allValues?.email,
            mobile: "+91" + allValues?.phone_number,
        }
        dispatch(verifyOtp(data))
            .unwrap()
            .then((res) => {
                dispatch(signupUser({ ...allValues, phone_number: "+91" + allValues?.phone_number }))
                    .unwrap()
                    .then(async (res) => {
                        localStorage.setItem('token', res.data.token)
                        let path = `/market`;
                        ReactGA.event({
                            category: 'User',
                            action: 'signup',
                            label: 'New User Signup'
                        });
                        navigate(path);
                        toast.success(res.message)
                    })
                    .catch((error) => {
                        toast.error(error.message)
                    })
            })
            .catch((error) => {
                toast.error(error.data)
            })
    }

    const handleResendOtp = (type) => {
        const data = {};

        if (type === "email") {
            data["type"] = 'email'
            data["email"] = allValues?.email
            data["mobile"] = "+91" + allValues?.phone_number
        } else {
            data["type"] = 'mobile'
            data["mobile"] = "+91" + allValues?.phone_number
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
            <section className='login signup-css'>
                <div className='imageBG' style={{ height: 'calc(100svh)' }}>
                    <img src={loginBg} className='imageHeight' style={{ height: 'calc(100svh)' }} alt="Header" />
                    <div className='innerImgTextBox'>
                        <div className='w-100'>
                            <>
                                <div className='justify-content-center align-items-center login-page'>
                                    <div className='col-xl-7'>
                                        <div class="d-flex align-items-start flex-column loginleftsideCol">
                                            <div class="mb-auto"><img className='frruitLogostyle' src={FrruitLogo2} style={{ objectFit: "contain" }} /></div>
                                            <div class="mb-auto w-100">
                                                <div className='loginStyle'>
                                                    <div className='loginMainTextStyle' >India's 1<sup className='suptext'>ST</sup>AI Powered</div>
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
                                            </div>
                                            <div className='hideformobile'>
                                                <div className='loginMainTextParaStyle' style={{ fontWeight: 600 }}>Disclaimer</div>
                                                <div className='small-desc-text'>
                                                    Frruit is an AI powered capital markets search engine powered by GPT 4o, GPT 4o mini, Gemini and BERT, powerful generative language models from OpenAI & Google. Frruit may occasionally produce inaccurate or inappropriate information. Please be aware that any content generated by Frruit should not be considered as investment advice, or a recommendation to buy or sell securities, and it should not be the sole basis for any investment decisions. Frruit output is provided 'as is,' and Airrchip makes no guarantees regarding its accuracy, completeness, quality, timeliness, or any other attributes. We strongly advise independently verifying the accuracy of Frruit output for your specific needs.
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
                                        <div className={showCode ? 'login-form' : 'signup-form'}>
                                            <div style={{ position: 'relative' }}>
                                                {
                                                    !showCode && !showCode1 &&
                                                    <p className='loginText text-center m-0 '>Signup</p>
                                                }
                                                <div>
                                                    {/* <img src={FrruitLogo} width={108} style={{ position: 'absolute', top: -5 }} /> */}
                                                </div>
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-outline mt-2">
                                                    {!showCode && !showCode1 &&
                                                        <>
                                                            <label className='form-control-label'>First Name</label>
                                                            <div className='w-100 mb-3'>
                                                                <Controller
                                                                    control={control}
                                                                    name="first_name"
                                                                    render={({ field }) => (
                                                                        <input
                                                                            type="text"
                                                                            className={errors?.first_name ? "form-control form-control-input error-feild" : "form-control form-control-input"}
                                                                            placeholder='Enter First Name'
                                                                            style={{ color: 'black', textIndent: 0 }}
                                                                            {...field}
                                                                        />
                                                                    )}
                                                                />
                                                                {
                                                                    errors?.first_name && <p className='errorText'>{errors?.first_name?.message}</p>
                                                                }
                                                            </div>
                                                            <label className='form-control-label'>Last Name</label>
                                                            <div className='w-100 mb-3'>
                                                                <Controller
                                                                    control={control}
                                                                    name="last_name"
                                                                    render={({ field }) => (
                                                                        <input
                                                                            type="text"
                                                                            className={errors?.last_name ? "form-control form-control-input error-feild" : "form-control form-control-input"}
                                                                            placeholder='Enter Last Name'
                                                                            style={{ color: 'black', textIndent: 0 }}
                                                                            {...field}
                                                                        />
                                                                    )}
                                                                />
                                                                {
                                                                    errors?.last_name && <p className='errorText'>{errors?.last_name?.message}</p>
                                                                }
                                                            </div>
                                                            <div className="position-relative" style={{ width: '100%', marginBottom: 20 }}>
                                                                <label className='form-control-label'>E-mail</label>
                                                                <Controller
                                                                    control={control}
                                                                    name="email"
                                                                    render={({ field }) => (
                                                                        <input
                                                                            type="text"
                                                                            className={errors?.email ? "form-control form-control-input error-feild" : "form-control form-control-input"}
                                                                            placeholder='Enter Email'
                                                                            style={{ color: 'black' }}
                                                                            {...field}
                                                                        />
                                                                    )}
                                                                />
                                                                {
                                                                    errors?.email && <p className='errorText'>{errors?.email?.message}</p>
                                                                }
                                                                <div className={errors?.email ? "email-error-img" : "email-img"}>
                                                                    <img src={MailIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                                                </div>
                                                                {/* <div className="position-absolute" style={{ left: 15, top: '53%' }}>
                                            <img src={MailIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                        </div> */}
                                                            </div>
                                                            <div className="position-relative" style={{ width: '100%', marginBottom: 20 }}>
                                                                <label className='form-control-label'>Phone Number</label>
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-input nineone-input me-3"
                                                                        placeholder='+91'
                                                                        // style={{ width: '12%', textIndent: 7, color: 'black' }}
                                                                        defaultValue="+91"
                                                                        disabled
                                                                    />
                                                                    <div className="position-relative" style={{ width: '85%' }}>
                                                                        <Controller
                                                                            control={control}
                                                                            name="phone_number"
                                                                            render={({ field }) => (
                                                                                <input
                                                                                    type="text"
                                                                                    className={errors?.phone_number ? "form-control form-control-input error-feild" : "form-control form-control-input"}
                                                                                    placeholder='Enter Phone Number'
                                                                                    style={{ color: 'black' }}
                                                                                    {...field}
                                                                                    maxLength='15'
                                                                                />
                                                                            )}
                                                                        />
                                                                        <div className="position-absolute" style={{ left: 15, top: '24%' }}>
                                                                            <img src={MobileIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    errors?.phone_number && <p className='errorText'>{errors?.phone_number?.message}</p>
                                                                }
                                                            </div>
                                                            <label className='form-control-label'>Country</label>
                                                            <div className='w-100 mb-3'>
                                                                <Controller
                                                                    control={control}
                                                                    name="country"
                                                                    render={({ field }) => (
                                                                        <input
                                                                            type="text"
                                                                            className={errors?.country ? "form-control form-control-input error-feild" : "form-control form-control-input"}
                                                                            placeholder='Enter Country'
                                                                            style={{ color: 'black', textIndent: 0 }}
                                                                            {...field}
                                                                        />
                                                                    )}
                                                                />
                                                                {
                                                                    errors?.country && <p className='errorText'>{errors?.country?.message}</p>
                                                                }
                                                            </div>
                                                            <div className="form-group mb-3">
                                                                <label className="form-control-label" htmlFor="exampleInputEmail1">Select My Broker</label>
                                                                <Controller
                                                                    name="broker"
                                                                    control={control}
                                                                    defaultValue=""
                                                                    rules={{ required: 'Please select your broker' }}
                                                                    render={({ field }) => (
                                                                        <select
                                                                            {...field}
                                                                            id="statusDropdown"
                                                                            className={errors?.broker ? "form-control form-control-input error-feild" : "form-control form-control-input form-select"}
                                                                            style={{ textIndent: 13, fontSize: 14 }}
                                                                        >
                                                                            <option value="" disabled>Select</option>
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
                                                                    )}
                                                                />
                                                                {
                                                                    errors?.broker && <p className='errorText'>{errors?.broker?.message}</p>
                                                                }
                                                            </div>
                                                            <div className='checkboxRow'>
                                                                <div className="wrap-check-43 me-2">
                                                                    <label htmlFor="terms_and_conditions">
                                                                        <input
                                                                            type="checkbox"
                                                                            id="terms_and_conditions"
                                                                            checked={termsAccepted}
                                                                            onChange={toggleTermsAccepted}
                                                                        />
                                                                        <span className="cbx">
                                                                            <svg width="12px" height="11px" viewBox="0 0 12 11">
                                                                                <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                                                                            </svg>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                                <div className='termsConditioncheckboxText'>
                                                                    I have read and agree to the <a className='termsConditionText' onClick={handleShowTermsConditions}>Terms and Conditions</a> and <a className='termsConditionText' onClick={handleShowPrivacyPolicy}> Privacy Policy</a>
                                                                </div>
                                                            </div>
                                                            {showError && (
                                                                <p className='errorText'>You must accept the terms and conditions to proceed.</p>
                                                            )}
                                                        </>
                                                    }
                                                    {showCode && !showCode1 &&
                                                        <>
                                                            <div>
                                                                <div className='d-flex flex-column align-items-center'>
                                                                    <img src={PhoneOtpImage} className='phoneotpimg' />
                                                                    <p className='p-0 otpheader'>Please check your Phone</p>
                                                                    <p className='p-0 m-0 otpsubheader text-center'>We have sent a message with the verification code on </p>
                                                                </div>


                                                                {/* <label className='form-control-label mt-3'>Phone Number</label>
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <input type="text" className="form-control form-control-input me-3 phone-number" placeholder='+91' defaultValue={"+91"} disabled></input>
                                                                    <div className="position-relative" style={{ width: '100%' }}>
                                                                        <input type="text" className="form-control form-control-input" placeholder='99999 99999' defaultValue={allValues?.phone_number} disabled></input>

                                                                        <div className="position-absolute" style={{ left: 18, top: '23%' }}>
                                                                            <img src={MobileIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                                <div className='d-flex justify-content-center align-items-center'>
                                                                    <p className='number-text'>+91 {allValues?.phone_number}</p>
                                                                    <a style={{ cursor: 'pointer', fontSize: 15, textDecoration: 'underline', color: 'blue' }} onClick={useDifferentClick}>Use a different Number</a>
                                                                </div>


                                                                <div className="form-outline verification">
                                                                    <div className='d-flex flex-column align-items-center'>
                                                                        <label className="typeheader my-2 justify-content-center">Type your 6 digit security code</label>
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
                                                                        {
                                                                            timerEnded ?
                                                                                <p className='privacyText resendtext mt-0' style={{ fontSize: 15 }}>Didn't get the code? <a style={{ cursor: "pointer", fontSize: 15, textDecoration: 'underline', color: 'blue' }} onClick={() => handleResendOtp("mobile")}>Resend</a></p> :
                                                                                <p className='privacyText resendtext mt-0' style={{ fontSize: 15 }}>Request new OTP in 00:{formattedTime}</p>
                                                                        }
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <button type='button' onClick={verifyMobileOtp} className='btnPrimary mt-4'>
                                                                    {isLoading ? (
                                                                        <div className="spinner-border text-light" role="status">
                                                                            <span className="sr-only"></span>
                                                                        </div>
                                                                    ) : (
                                                                        "Verify"
                                                                    )}
                                                                </button>
                                                            </div>

                                                        </>
                                                    }
                                                    {showCode && showCode1 &&
                                                        <>
                                                            <div className='d-flex flex-column align-items-center'>
                                                                <img src={EmailOtpImage} className='phoneotpimg' />
                                                                <p className='p-0 otpheader'>Please check your E-mail</p>
                                                                <p className='p-0 m-0 otpsubheader text-center'>We have sent a email with the verification code on </p>
                                                            </div>
                                                            {/* <div className="position-relative" style={{ width: '100%' }}>
                                                                <label className='form-control-label mb-1'>E-mail</label>
                                                                <input type="text" className="form-control form-control-input" placeholder='yaksh@airrchip.com' defaultValue={allValues?.email} disabled></input>
                                                                <div className="position-absolute" style={{ left: 15, top: '50%' }}>
                                                                    <img src={MailIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                                                </div>
                                                            </div> */}

                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <p className='number-text'>{allValues?.email}</p>
                                                                <a style={{ cursor: 'pointer', fontSize: 15, textDecoration: 'underline', color: 'blue' }} onClick={useDifferentClick}>Use a different e-mail</a>
                                                            </div>

                                                            <div className="form-outline verification">
                                                                <div className='d-flex flex-column align-items-center'>
                                                                    <label className="typeheader my-2 justify-content-center">Type your 6 digit security code</label>
                                                                    <div className='d-flex'>
                                                                        <OtpInput
                                                                            value={emailOtp}
                                                                            onChange={setEmailOtp}
                                                                            numInputs={6}
                                                                            renderInput={(props) => <input {...props} style={{
                                                                                width: 56.68,
                                                                                outline: 'none',
                                                                            }} className='verificationBox text-center me-2' />}
                                                                        />
                                                                    </div>
                                                                    {
                                                                        timerEnded ?
                                                                            <p className='privacyText resendtext mt-0' style={{ fontSize: 15 }}>Didn't get the code? <a style={{ cursor: 'pointer', fontSize: 15, textDecoration: 'underline', color: 'blue' }} onClick={() => handleResendOtp("email")}>Resend</a></p> :
                                                                            <p className='privacyText resendtext mt-0' style={{ fontSize: 15 }}>Request new OTP in 00:{formattedTime}</p>
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <button type='button' className='btnPrimary mt-4' onClick={verifyEmailId}>
                                                                    {isLoading ? (
                                                                        <div className="spinner-border text-light" role="status">
                                                                            <span className="sr-only"></span>
                                                                        </div>
                                                                    ) : (
                                                                        "Verify and Signup"
                                                                    )}
                                                                </button>
                                                            </div>

                                                        </>
                                                    }

                                                    {!showCode && !showCode1 &&
                                                        <>
                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <button type='submit' className='btnPrimary mt-4'>
                                                                    {isLoading ? (
                                                                        <div className="spinner-border text-light" role="status">
                                                                            <span className="sr-only"></span>
                                                                        </div>
                                                                    ) : (
                                                                        "Proceed and Verify"
                                                                    )}
                                                                </button>
                                                            </div>
                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <button onClick={routeChangeLogin} className='btnSecondary mt-3'>Login Using Phone Number</button>
                                                            </div>
                                                            <div className='followUsHideforWeb' style={{ color: '#6F6B7D', fontSize: 12, fontWeight: 400, marginTop: 20 }}>Data provided by C-MOTS Internet Technologies Pvt Ltd</div>
                                                        </>
                                                    }
                                                    {/* <p className='privacyText text-center'>By signing up, you accept our <a className='termsConditionText' onClick={handleShowTermsConditions}>Terms and Conditions</a></p>
                                    <p className='privacyText text-center mt-0'>See our <a className='termsConditionText' onClick={handleShowPrivacyPolicy}> Privacy Policy</a></p> */}
                                                </div>
                                            </form>
                                        </div>
                                        <div className='followUsHideforWeb'>
                                            <div className='followUsDflex mt-1'>
                                            <div className='FollowUsText followText me-3'>Follow us on</div>
                                                {/* <img src={WhatsAppLogo} className='socialLogos' /> */}
                                                <a href='https://www.instagram.com/frruitapp/?igsh=MW1iNmF0OWtrOXdvYw%3D%3D'>
                                                    <img src={InstagramAppLogo} className='socialLogos' />
                                                </a>
                                                <a href='https://ae.linkedin.com/company/frruit'>
                                                    <img src={linkedinLogo} className='socialLogos' />
                                                </a>
                                            </div>
                                            <div className='loginMainTextParaStyle' style={{ display: 'block', fontWeight: 600 }}>Disclaimer</div>
                                            <div className='small-desc-text'>
                                                Frruit is an AI powered capital markets search engine powered by GPT 4o, GPT 4o mini, Gemini and BERT, powerful generative language models from OpenAI & Google. Frruit may occasionally produce inaccurate or inappropriate information. Please be aware that any content generated by Frruit should not be considered as investment advice, or a recommendation to buy or sell securities, and it should not be the sole basis for any investment decisions. Frruit output is provided 'as is,' and Airrchip makes no guarantees regarding its accuracy, completeness, quality, timeliness, or any other attributes. We strongly advise independently verifying the accuracy of Frruit output for your specific needs.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </section>
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
export default Signup