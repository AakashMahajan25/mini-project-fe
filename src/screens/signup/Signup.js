import React, { useEffect, useState } from 'react'
import '../login/Login.scss'
import '../signup/Signup.scss'

import EmailOtpImage from '../../assets/images/EmailOtpImg.png';
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

import linkedinLogo from '../../assets/images/linkedin.png'
import loginBg from '../../assets/images/loginBgImg.jpg';
import FrruitLogo2 from '../../assets/images/frruitlogoLogin.png'
import Select from 'react-select';
import countryList from './countryList.json';


function Signup() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [showCode, setShowCode] = useState(false)
    const [otp, setOtp] = useState('');
    const [showTermsConditions, setShowTermsConditions] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showError, setShowError] = useState(false);
    const { isLoading } = useSelector(state => state?.signupSlice)
    const [timer, setTimer] = useState(60)
    const [timerEnded, setTimerEnded] = useState(true)
    const [differentClick, setDifferentClick] = useState(false)


    const formattedTime = String(timer).padStart(2, '0');

    // Updated validation schema - removed phone number and broker only
    const signupSchema = yup.object().shape({
        first_name: yup
            .string()
            .min(2, "First name must be at least 2 characters.")
            .matches(/^[A-Za-z\s]+$/, "First name should not contain numbers or special characters.")
            .required("Please enter first name."),
        last_name: yup.string()
            .min(2, "Last name must be at least 2 characters.")
            .matches(/^[A-Za-z\s]+$/, "Last name should not contain numbers or special characters.")
            .required("Please enter last name."),
        email: yup.string().email('Please enter valid Email Id').required("Please enter Email Id."),
        country: yup.string().required("Please enter country."),
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
        setDifferentClick(true)
        setOtp('');
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
        dispatch(signupOtp({ type: 'email', email: data?.email }))
            .unwrap()
            .then((res) => {
                setTimerEnded(false)
                setTimer(60)
                setShowCode(true)
                toast.success("OTP has sent successfully");
                setDifferentClick(false)
            })
            .catch((error) => {
                toast.error(error.message || "Unable to proceed");
            })
    }

    const verifyEmailOtp = () => {
        const regex = /^[0-9]{0,6}$/;
        if (!regex.test(otp) || otp?.length < 6) {
            toast.error("Please enter valid OTP");
            return;
        }

        const data = {
            otp,
            type: 'email',
            email: allValues?.email,
        }
        dispatch(verifyOtp(data))
            .unwrap()
            .then(async (res) => {
                toast.success(res.message)
                // After email verification, proceed to signup
                dispatch(signupUser({ ...allValues }))
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
                toast.error(error.message || 'Failed to verify otp');
            })
    }

    // Update handleResendOtp function for email-only flow
    const handleResendOtp = () => {
        const data = {
            type: 'email',
            email: allValues?.email
        };

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
                    <img src={loginBg} className='imageHeight' alt="Header" />
                    <div className='innerImgTextBox'>
                        <div className='w-100'>
                            <>
                                <div className='justify-content-center align-items-center login-page'>
                                    <div className='col-xl-7'>
                                        <div class="d-flex align-items-start flex-column loginleftsideCol">
                                            <div class="mb-auto"><img className='frruitLogostyle' src={FrruitLogo2} style={{ objectFit: "contain" }} /></div>
                                            <div className={window.innerWidth < 520 ? "w-100" : "mb-auto w-100"}>
                                                <div className='loginStyle'>
                                                    <div className='loginMainTextStyle'>AI Powered financial</div>
                                                    <div className='loginMainTextStyle'>markets search engine</div>
                                                    <div className='loginMainTextParaStyle' style={{ fontSize: 16 }}>
                                                        Get actionable financial market insights instantly through conversational search!
                                                    </div> 
                                                    {/* <div className='loginMainTextParaStyle'>
                                                        Initiate dynamic conversations with Frruit to tap into both real-time and historical data on thousands of stocks , market-moving information , discover hidden correlations between financial market events and their impact on stock price movements !
                                                    </div>
                                                    <div className='loginMainTextParaStyle'>
                                                        No more navigating through mountains of data or struggling through complicated search reports.
                                                    </div>
                                                    <div className='loginMainTextParaStyle'>
                                                        Our intuitive natural language interface instantly serves up the jargon free crucial insights, empowering you to make better informed decisions !
                                                    </div> */}
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
                                        <div className={showCode ? 'login-form' : 'signup-form'}>
                                            <div style={{ position: 'relative' }}>
                                                {
                                                    !showCode && 
                                                    <>
                                                    <p className='loginText text-center m-0 '>Signup</p>
                                                    <div className='loginText followUsHideforWeb mt-2' style={{fontSize: 18, fontWeight: 700}}>Search for free, discover fast !</div>
                                                    </>
                                                    
                                                }
                                                <div>
                                                    {/* <img src={FrruitLogo} width={108} style={{ position: 'absolute', top: -5 }} /> */}
                                                </div>
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-outline mt-2">
                                                    {!showCode &&
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
                                                            </div>
                                                            <label className='form-control-label'>Country</label>
                                                            <div className='w-100 mb-3'>
                                                            <Controller
                                                                control={control}
                                                                name="country"
                                                                render={({ field }) => (
                                                                    <Select
                                                                        {...field}
                                                                        options={countryList} 
                                                                        placeholder="Select Country"
                                                                        classNamePrefix="react-select"
                                                                        styles={{
                                                                            menu: (provided) => ({
                                                                                ...provided,
                                                                                border: 'none',
                                                                                maxHeight: 400,
                                                                                overflowY: 'auto',
                                                                            }),
                                                                            control: (provided) => ({
                                                                                ...provided,
                                                                                height: 48,
                                                                                borderRadius: 15,
                                                                                borderColor: errors?.country ? 'red' : '#BDC3DD',
                                                                            }),
                                                                            option: (provided, state) => ({
                                                                                ...provided,
                                                                                backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#f0f0f0' : 'white',
                                                                                color: state.isSelected ? 'white' : 'black',
                                                                            }),
                                                                        }}
                                                                        value={
                                                                            field.value
                                                                                ? countryList.find(option => option.value === field.value)
                                                                                : null
                                                                        }
                                                                        onChange={(selectedOption) => {
                                                                            field.onChange(selectedOption?.value);
                                                                        }}
                                                                    />
                                                                )}
                                                            />
                                                            {
                                                                errors?.country && <p className='errorText'>{errors?.country?.message}</p>
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
                                                    {showCode &&
                                                        <>
                                                            <div>
                                                                <div className='d-flex flex-column align-items-center'>
                                                                    <img src={EmailOtpImage} className='phoneotpimg' />
                                                                    <p className='p-0 otpheader'>Please check your Email</p>
                                                                    <p className='p-0 m-0 otpsubheader text-center'>We have sent a verification code to your email </p>
                                                                </div>

                                                                {
                                                                    !differentClick ?
                                                                        <>
                                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                                <p className='number-text'>{allValues?.email}</p>
                                                                                <a style={{ cursor: 'pointer', fontSize: 15, textDecoration: 'underline', color: 'blue' }} onClick={useDifferentClick}>Use a different email</a>
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
                                                                                            <p className='privacyText resendtext mt-0' style={{ fontSize: 15 }}>Didn't get the code? <a style={{ cursor: "pointer", fontSize: 15, textDecoration: 'underline', color: 'blue' }} onClick={handleResendOtp}>Resend</a></p> :
                                                                                            <p className='privacyText resendtext mt-0' style={{ fontSize: 15 }}>Request new OTP in 00:{formattedTime}</p>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <div className="position-relative mt-5" style={{ width: '100%', marginBottom: 20 }}>
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
                                                                                <div className={errors?.email ? "email-error-img" : "email-img"} style={errors?.email ? {top: '15%'} : {top:'22%'}}>
                                                                                    <img src={MailIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} />
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                }
                                                            </div>
                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <button type='button' onClick={() => differentClick ? onSubmit(allValues) : verifyEmailOtp()} className='btnPrimary mt-4'>
                                                                    {isLoading ? (
                                                                        <div className="spinner-border text-light" role="status">
                                                                            <span className="sr-only"></span>
                                                                        </div>
                                                                    ) : (
                                                                        differentClick ? "Send OTP" : "Verify and Signup"
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </>
                                                    }


                                                    {!showCode &&
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
                                                                <button onClick={routeChangeLogin} className='btnSecondary mt-3'>Login Using Email</button>
                                                            </div>
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
                                            <div className='small-desc-text px-3 mb-4' style={{textAlign: 'justify'}}>
                                                Frruit is an AI powered financial markets search engine built using powerful generative AI large language models. Frruit may occasionally produce inaccurate or inappropriate information. Please be aware that any content generated by Frruit should not be considered as investment advice, or a recommendation to buy or sell securities, and it should not be the sole basis for any investment decisions. Frruit output is provided 'as is,' and Airrchip makes no guarantees regarding its accuracy, completeness, quality, timeliness, or any other attributes. We strongly advise independently verifying the accuracy of Frruit output for your specific needs.
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