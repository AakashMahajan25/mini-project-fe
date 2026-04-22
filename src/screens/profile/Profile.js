import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftProfileBox from '../../components/leftProfileBox/LeftProfileBox';
import './Profile.scss';
import WhiteArrow from '../../assets/images/bluecard-arrow.png';
import BlueArrow from '../../assets/images/blue-right-arrow.png';
import UserImg from '../../assets/images/user-img.png';
import InputUser from '../../assets/images/input-user.png';
import MobileIcon from '../../assets/images/mobile-icon.png';
import MailIcon from '../../assets/images/mail-icon.png';
import BlueCardFrruitLogo from '../../assets/images/blue-card-frruitlogo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
// COMMENTED OUT FOR FUTURE PAYMENT GATEWAY INTEGRATION
// import { getAvaliableCredit, getFaqs, getUserDetails, getUserOrderHistory, getUserPlan, initiateOrder, placeOrder, updateProfile } from './usersSlice';
import { getAvaliableCredit, getFaqs, getUserDetails, getUserOrderHistory, getUserPlan, updateProfile } from './usersSlice';
import Plans from '../../components/profile/Plans';
import Preferences from '../../components/profile/Preferences';
import { getStockIndexes } from '../dashboard/slice';
import HelpFAQ from '../../components/profile/helpFAQ/HelpFAQ';
import { toast } from 'react-toastify';
import ReactGA from 'react-ga4';
import PaymentHistory from '../../components/profile/paymentHistory/PaymentHistory';
import TermsAndCondition from '../../components/profile/termsAndCondition/TermsAndCondition';
import PrivacyPolicy from '../../components/profile/privacyPolicy/PrivacyPolicy';
import Pricing from '../../components/profile/pricing/Pricing';
import CancellationAndRefundPolicy from '../../components/profile/cancellationAndRefundPolicy/CancellationAndRefundPolicy';
// COMMENTED OUT FOR FUTURE PAYMENT GATEWAY INTEGRATION
// import PaymentModal from '../../components/paymentModal/PaymentModal';
import Feedback from '../../components/profile/feedback/Feedback';
import AboutAirrchip from '../../components/profile/aboutAirrchip/AboutAirrchip';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const handleBackButtonClick = () => {
        setShowCode(prevShowCode => !prevShowCode);
    };
    const [showPreferences, setShowPreferences] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showPaymentHistory, setPaymentHistory] = useState(false);
    const [showHelpFAQ, setShowHelpFAQ] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [isShowCodeActiveColor, setShowCodeActiveColor] = useState(true);
    const [isHelpActive, setIsHelpActive] = useState(false);
    const [isPreferencesActiveColor, setPreferencesActiveColor] = useState(false);
    const [isPaymentHistoryActive, setPaymentHistoryActiveColor] = useState(false);
    const [isTermsConditionActive, setTermsConditionActiveColor] = useState(false);
    const [isPrivacyPolicyActive, setPrivacyPolicyActiveColor] = useState(false);
    const [isPricingActive, setPricingActiveColor] = useState(false);
    const [isViewPlansActive, setViewPlansActiveColor] = useState(false);
    const [isCancellationPolicyActive, setCancellationPolicyActiveColor] = useState(false);
    // COMMENTED OUT FOR FUTURE PAYMENT GATEWAY INTEGRATION
    // const [paymentModalType, setPaymentModalType] = useState("success")
    // const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
    // const [paymentData, setPaymentData] = useState(null)
    const [isFeedbackActive, setFeedbackActiveColor] = useState(false);
    const [isAboutAirrchipActive, setAboutAirrchipActiveColor] = useState(false);

    const handleProfileClick = () => {
        setShowProfile(true);
        setShowPreferences(false);
        setShowHelpFAQ(false);
        setIsHelpActive(false);
        setShowCodeActiveColor(true);
        setPreferencesActiveColor(false);
        setPaymentHistoryActiveColor(false);
        setPaymentHistory(false);
        setTermsConditionActiveColor(false);
        setPrivacyPolicyActiveColor(false);
        setPricingActiveColor(false);
        setViewPlansActiveColor(false)
        setCancellationPolicyActiveColor(false)
        setFeedbackActiveColor(false)
        setAboutAirrchipActiveColor(false)
    };

    const handlePaymentHistoryClick = () => {
        setShowProfile(false);
        setShowPreferences(false);
        setShowHelpFAQ(false);
        setIsHelpActive(false);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(false);
        setPaymentHistoryActiveColor(true);
        setPaymentHistory(true);
        setTermsConditionActiveColor(false);
        setPrivacyPolicyActiveColor(false);
        setPricingActiveColor(false);
        setViewPlansActiveColor(false)
        setCancellationPolicyActiveColor(false)
        setFeedbackActiveColor(false)
        setAboutAirrchipActiveColor(false)
    };

    const handlePreferencesClick = () => {
        setShowCode(false)
        setShowProfile(false);
        setShowPreferences(true);
        setIsHelpActive(false);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(true);
        setPaymentHistoryActiveColor(false);
        setPaymentHistory(false);
        setTermsConditionActiveColor(false);
        setPrivacyPolicyActiveColor(false);
        setPricingActiveColor(false)
        setViewPlansActiveColor(false)
        setCancellationPolicyActiveColor(false)
        setFeedbackActiveColor(false)
        setAboutAirrchipActiveColor(false)
    };
    const handleHelpClick = () => {
        ReactGA.event({
            category: 'Profiling',
            action: 'user_help',
            label: 'User Help'
        })
        dispatch(getFaqs());
        setShowHelpFAQ(true);
        setShowCode(false)
        setShowProfile(false);
        setShowPreferences(false);
        setIsHelpActive(true);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(false);
        setPaymentHistoryActiveColor(false);
        setPaymentHistory(false);
        setTermsConditionActiveColor(false);
        setPrivacyPolicyActiveColor(false);
        setPricingActiveColor(false)
        setViewPlansActiveColor(false)
        setCancellationPolicyActiveColor(false)
        setFeedbackActiveColor(false)
        setAboutAirrchipActiveColor(false)
    };
    const handleTermsConditionClick = () => {
        setShowProfile(false);
        setShowPreferences(false);
        setShowHelpFAQ(false);
        setIsHelpActive(false);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(false);
        setPaymentHistoryActiveColor(false);
        setPaymentHistory(false);
        setTermsConditionActiveColor(true);
        setPrivacyPolicyActiveColor(false);
        setPricingActiveColor(false)
        setViewPlansActiveColor(false)
        setCancellationPolicyActiveColor(false)
        setFeedbackActiveColor(false)
        setAboutAirrchipActiveColor(false)
    };
    const handlePrivacyPolicyClick = () => {
        setShowProfile(false);
        setShowPreferences(false);
        setShowHelpFAQ(false);
        setIsHelpActive(false);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(false);
        setPaymentHistoryActiveColor(false);
        setPaymentHistory(false);
        setTermsConditionActiveColor(false);
        setPrivacyPolicyActiveColor(true);
        setPricingActiveColor(false)
        setViewPlansActiveColor(false)
        setCancellationPolicyActiveColor(false)
        setFeedbackActiveColor(false)
        setAboutAirrchipActiveColor(false)
    };
    const handlePricingClick = () => {
        setShowProfile(false);
        setShowPreferences(false);
        setShowHelpFAQ(false);
        setIsHelpActive(false);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(false);
        setPaymentHistoryActiveColor(false);
        setPaymentHistory(false);
        setTermsConditionActiveColor(false);
        setPrivacyPolicyActiveColor(false);
        setPricingActiveColor(true)
        setViewPlansActiveColor(false)
        setCancellationPolicyActiveColor(false)
        setFeedbackActiveColor(false)
        setAboutAirrchipActiveColor(false)
    };

    const handleViewPlansClick = () => {
        setShowProfile(false);
        setShowPreferences(false);
        setShowHelpFAQ(false);
        setIsHelpActive(false);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(false);
        setPaymentHistoryActiveColor(false);
        setPaymentHistory(false);
        setTermsConditionActiveColor(false);
        setPrivacyPolicyActiveColor(false);
        setPricingActiveColor(false)
        setViewPlansActiveColor(true)
        setCancellationPolicyActiveColor(false)
        setFeedbackActiveColor(false)
        setAboutAirrchipActiveColor(false)
    };

    const handleCancellationPolicyClick = () => {
        setShowProfile(false);
        setShowPreferences(false);
        setShowHelpFAQ(false);
        setIsHelpActive(false);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(false);
        setPaymentHistoryActiveColor(false);
        setPaymentHistory(false);
        setTermsConditionActiveColor(false);
        setPrivacyPolicyActiveColor(false);
        setPricingActiveColor(false)
        setViewPlansActiveColor(false)
        setCancellationPolicyActiveColor(true)
        setFeedbackActiveColor(false)
        setAboutAirrchipActiveColor(false)
    };

    const handleFeedbackClick = () => {
        setShowProfile(false);
        setShowPreferences(false);
        setShowHelpFAQ(false);
        setIsHelpActive(false);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(false);
        setPaymentHistoryActiveColor(false);
        setPaymentHistory(false);
        setTermsConditionActiveColor(false);
        setPrivacyPolicyActiveColor(false);
        setPricingActiveColor(false)
        setViewPlansActiveColor(false)
        setCancellationPolicyActiveColor(false)
        setFeedbackActiveColor(true)
        setAboutAirrchipActiveColor(false)
    };

    const handleAboutAirrchipClick = () => {
        setShowProfile(false);
        setShowPreferences(false);
        setShowHelpFAQ(false);
        setIsHelpActive(false);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(false);
        setPaymentHistoryActiveColor(false);
        setPaymentHistory(false);
        setTermsConditionActiveColor(false);
        setPrivacyPolicyActiveColor(false);
        setPricingActiveColor(false)
        setViewPlansActiveColor(false)
        setCancellationPolicyActiveColor(false)
        setFeedbackActiveColor(false)
        setAboutAirrchipActiveColor(true)
    };


    const updateProfileSchema = yup.object().shape({
        first_name: yup.string().required("Please enter first name."),
        last_name: yup.string().required("Please enter last name."),
        email: yup.string().email('Please enter valid Email Id').required("Please enter Email Id."),
        phone_number: yup.string().required("Please enter Mobile number."),
        // address: yup.string().required("Address is required."),
    })

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(updateProfileSchema)
    })


    const { userCredits, isLoading, userDetails, userPlan, faqs, orderHistory } = useSelector(state => state.userSlice)
    // COMMENTED OUT FOR FUTURE PAYMENT GATEWAY INTEGRATION
    // const { userCredits, isLoading, userDetails, userPlan, faqs, orderHistory, paymentLoader } = useSelector(state => state.userSlice)

    useEffect(() => {
        // dispatch(getAvaliableCredit()).unwrap().then(() => {
        //     ReactGA.event({
        //         category: 'Profiling',
        //         action: 'user_avaliablecredit',
        //         label: 'User Avaliable Credit'
        //     });
        // }).catch(err => {

        // });
        dispatch(getUserDetails()).then(() => {
            ReactGA.event({
                category: 'Profiling',
                action: 'user_profile',
                label: 'User Profile'
            });
        }).catch(err => {

        });
        dispatch(getUserPlan());
        dispatch(getUserOrderHistory('?page=1'))
        // dispatch(getStockIndexes())
    }, [])

    useEffect(() => {
        if (userDetails) {
            setValue('first_name', userDetails?.first_name)
            setValue('last_name', userDetails?.last_name)
            // setValue('address', userDetails?.address)
            setValue('email', userDetails?.email)
            setValue('phone_number', userDetails?.phone_number)
        }
    }, [userDetails])

    useEffect(() => {
        if (state?.plans) {
            setShowCode(true)
        }
    }, [userDetails])

    const onSubmit = (data) => {
        dispatch(updateProfile(data))
            .unwrap()
            .then(async (res) => {
                dispatch(getUserDetails())
                toast.success("Profile Updated Successfully")
            })
            .catch((error) => {
                toast.error("Error in updating profile")
            })
    }

    // COMMENTED OUT FOR FUTURE PAYMENT GATEWAY INTEGRATION
    // function loadScript(src) {
    //     return new Promise((resolve) => {
    //         const script = document.createElement("script");
    //         script.src = src;
    //         script.onload = () => {
    //             resolve(true);
    //         };
    //         script.onerror = () => {
    //             resolve(false);
    //         };
    //         document.body.appendChild(script);
    //     });
    // }

    // COMMENTED OUT FOR FUTURE PAYMENT GATEWAY INTEGRATION
    // const upgradePlan = async (payload) => {
    //     const res = await loadScript(
    //         "https://checkout.razorpay.com/v1/checkout.js"
    //     );

    //     if (!res) {
    //         alert("Razorpay SDK failed to load. Are you online?");
    //         return;
    //     }

    //     dispatch(initiateOrder(payload)).unwrap().then(async (data) => {
    //         const options = {
    //             description: 'Credits towards credit purchase',
    //             currency: 'INR',
    //             key: 'rzp_test_Ym5H3K5NhaCF0y',
    //             amount: data?.order_amount * 100,
    //             name: "Frruit",
    //             order_id: data?.razorpay_order_id,
    //             handler: async function (response) {
    //                 let placeOrderPayload = {
    //                     "order_id": data?.order_id,
    //                     "plan_id": payload.plan_id,
    //                     "payment_status": "paid",
    //                     razorpay_payment_id: response.razorpay_payment_id,
    //                     razorpay_order_id: response.razorpay_order_id,
    //                     razorpay_signature: response.razorpay_signature,
    //                 }
    //                 dispatch(placeOrder(placeOrderPayload)).unwrap().then(async (data) => {
    //                     setPaymentModalType("success")
    //                     setPaymentData({...data, ...payload})
    //                     setShowPaymentConfirmation(true)
    //                 }).catch((error) => {
    //                     setPaymentModalType("failed")
    //                     setPaymentData({
    //                         razorpay_order_id: response.razorpay_order_id,
    //                         ...payload
    //                     })
    //                     setShowPaymentConfirmation(true)
    //                 });
    //             },
    //             theme: { color: '#F37254' },
    //             modal: {
    //                 ondismiss: function () {
    //                     toast.error('Payment was cancelled.');
    //                 }
    //             }
    //         };

    //         const paymentObject = new window.Razorpay(options);
    //         paymentObject.open();
    //     }).catch((error) => {
    //         toast.error(error.message || "Error in initiating order")
    //     });
    // };

    // COMMENTED OUT FOR FUTURE PAYMENT GATEWAY INTEGRATION
    // const upgradePlan = async (payload) => {
    //     // Placeholder for future payment gateway integration
    //     toast.info("Payment functionality temporarily disabled");
    // };

    // COMMENTED OUT FOR FUTURE PAYMENT GATEWAY INTEGRATION
    const upgradePlan = async (payload) => {
        // Placeholder for future payment gateway integration
        toast.info("Payment functionality temporarily disabled");
    };

    const rightPartHeight = window.innerWidth > 768 ? window.innerHeight - 68 : window.innerHeight - 122;

    const handlePaymentModel = (type) => {
        switch (type) {
            case "failed":
                // setShowPaymentConfirmation(false);
                // upgradePlan({ plan_id: paymentData?.plan_id, order_amount: paymentData?.order_amount })
                break;
            case "success":
                // setShowPaymentConfirmation(false);
                // setPaymentData(null)
                window.location.reload();
                break;
            default:
                // setShowPaymentConfirmation(false);
                // setPaymentData(null)
                break;
        }
    }

    return (
        <>
            <div className='row justify-content-between m-0 profile-css'>
                <div className='col-lg-3 col-md-3 col-sm-3 column-pad'>
                    <LeftProfileBox
                        handlePreferencesClick={handlePreferencesClick}
                        handleProfileClick={handleProfileClick}
                        handleHelpClick={handleHelpClick}
                        handlePaymentHistoryClick={handlePaymentHistoryClick}
                        isPaymentHistoryActive={isPaymentHistoryActive}
                        isPreferencesActive={isPreferencesActiveColor}
                        isshowCodeActive={isShowCodeActiveColor}
                        isHelpActive={isHelpActive}
                        handleTermsConditionClick={handleTermsConditionClick}
                        isTermsConditionActive={isTermsConditionActive}
                        isPrivacyPolicyActive={isPrivacyPolicyActive}
                        handlePrivacyPolicyClick={handlePrivacyPolicyClick}
                        handlePricingClick={handlePricingClick}
                        isPricingActive={isPricingActive}
                        handleViewPlansClick={handleViewPlansClick}
                        isViewPlansActive={isViewPlansActive}
                        isCancellationPolicyActive={isCancellationPolicyActive}
                        handleCancellationPolicyClick={handleCancellationPolicyClick}
                        isFeedbackActive={isFeedbackActive}
                        handleFeedbackClick={handleFeedbackClick}
                        isAboutAirrchipActive={isAboutAirrchipActive}
                        handleAboutAirrchipClick={handleAboutAirrchipClick}
                    />
                </div>
                <div className='col-lg-9 col-md-9 col-sm-9 column-pad'>
                    {!showCode && !showPreferences && !showHelpFAQ && !showPaymentHistory && !isTermsConditionActive && !isPrivacyPolicyActive && !isPricingActive && !isViewPlansActive && !isCancellationPolicyActive && !isFeedbackActive && !isAboutAirrchipActive &&
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <div className='welcome-text'>Welcome</div>
                            <div style={{ marginBottom: 20 }} className='user-text'>{userDetails?.first_name + " " + userDetails?.last_name}</div>
                            {/* <div className='row m-0'>
                                <div className='col-lg-6 column-pad' style={{ marginBottom: 20 }}>
                                    <div className='cardCustomMarginRight'>
                                        <div className='blue-box'>
                                            <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 10 }}>
                                                <div className='text-1'>Available Credits</div> */}
                                                {/* <div className='d-flex align-items-center'>
                                                    <div className='text-2'>History</div>
                                                    <img src={WhiteArrow} style={{ width: 18, objectFit: 'contain' }} />
                                                </div> */}
                                            {/* </div>
                                            <div className='light-blue-box' style={{ width: 'fit-content', marginBottom: 28 }}>
                                                <div className='d-flex justify-content-start align-items-center'>
                                                    <div className='text-3'>{userCredits ? parseFloat(userCredits?.totalCredits - userCredits?.usedCredits).toFixed(2) : '00'}</div>
                                                    <div className='text-4 mt-1'>/{userCredits ? parseFloat(userCredits?.totalCredits).toFixed(2) : '00'}</div>
                                                </div>
                                            </div>
                                            <div className='transactionHistoryRow'>
                                                <div className='text-2'>1 Credit = 1000 Tokens</div> */}
                                                {/* <div className='innerTransactionHistoryRow' onClick={handlePaymentHistoryClick}>
                                                    <div className='text-2'>Transaction History</div>
                                                    <img src={WhiteArrow} className='whiteArrowstyle' />
                                                </div> */}
                                            {/* </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-6 column-pad' style={{ marginBottom: 20 }}>
                                    <div className='cardCustomMarginLeft'>
                                        <div className='blue-box'>
                                            <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 10 }}>
                                                <div className='text-1'>Current Plan</div>
                                            </div>
                                            <div className='light-blue-box' style={{ marginBottom: 10 }}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    {
                                                        userPlan && <>
                                                            <div className='text-3' style={{ fontSize: 22 }}>{userPlan?.plan_name}</div>
                                                            <div className='text-4'>{userPlan?.subsciption_type === "free" ? `${userPlan.credits_offered} Credits` : `INR ${userPlan?.price} /month`}</div>
                                                        </>
                                                    }
                                                </div>
                                            </div> */}
                                            {/* <button onClick={setShowCode} className='white-btn'>View Plans<img src={BlueArrow} style={{ objectFit: 'contain', width: 6, marginLeft: 10 }} /></button> */}
                                        {/* </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className='row m-0'>
                                <div className='col-lg-6 column-pad'>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='profile-title' style={{ marginBottom: 32 }}>Profile</div>
                                        <div className='row align-items-center mt-2  ' style={{ marginBottom: 20 }}>
                                            {/* <img src={UserImg} style={{ width: 82, objectFit: 'contain', marginRight: 15 }} /> */}
                                            <div className='col-xl-2 col-lg-3 col-md-2'>
                                                <div className='user-profile-circle'>
                                                    <div className='user-profile-circle-text'>{userDetails?.first_name?.slice(0, 1)}</div>
                                                </div>
                                            </div>
                                            <div className='col-xl-10 col-lg-9 col-md-10'>
                                                <div className="position-relative" style={{ width: '100%' }}>
                                                    <label className='form-control-label'>First Name</label>
                                                    <Controller
                                                        control={control}
                                                        name="first_name"
                                                        render={({ field }) => (
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-input"
                                                                placeholder='Enter First Name'
                                                                style={{ color: 'black' }}
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors?.first_name && <p style={{ color: 'red' }}>{errors?.first_name?.message}</p>}
                                                    <div className="position-absolute" style={{ left: 15, top: '50%' }}>
                                                        <img src={InputUser} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <label className='form-control-label'>Last Name</label>
                                        <div className='row m-0'>
                                            <div className='col-lg-12 column-pad'>
                                                <div className="position-relative" style={{ width: '100%', marginBottom: 20 }}>
                                                    <Controller
                                                        control={control}
                                                        name="last_name"
                                                        render={({ field }) => (
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-input"
                                                                placeholder='Enter Last Name'
                                                                style={{ color: 'black' }}
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors?.last_name && <p style={{ color: 'red' }}>{errors?.last_name?.message}</p>}
                                                    <div className="position-absolute" style={{ left: 17, top: '22%' }}>
                                                        <img src={InputUser} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <label className='form-control-label'>Phone Number</label> */}
                                        <div className='row m-0'>
                                            {/* <div className='col-lg-2 column-pad'>
                                        <div className='me-2'>
                                            <input style={{textIndent:'12px'}} type="text" className="form-control form-control-input" placeholder='+91' defaultValue={"+91"} disabled></input>
                                        </div>
                                    </div> */}
                                            {/* <div className='col-lg-12 column-pad'>
                                                <div className="position-relative" style={{ width: '100%', marginBottom: 20 }}>
                                                    <Controller
                                                        control={control}
                                                        name="phone_number"
                                                        render={({ field }) => (
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-input"
                                                                placeholder='Enter Phone Number'
                                                                style={{ color: 'black' }}
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors?.phone_number && <p style={{ color: 'red' }}>{errors?.phone_number?.message}</p>}
                                                    <input type="text" className="form-control form-control-input" placeholder='Enter Phone Number'></input>
                                                    <div className="position-absolute" style={{ left: 17, top: '22%' }}>
                                                        <img src={MobileIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="position-relative" style={{ width: '100%', marginBottom: 20 }}>
                                            <label className='form-control-label'>Email Address</label>
                                            <Controller
                                                control={control}
                                                name="email"
                                                render={({ field }) => (
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-input"
                                                        placeholder='Enter Mail'
                                                        style={{ color: 'black' }}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors?.email && <p style={{ color: 'red' }}>{errors?.email?.message}</p>}
                                            {/* <input type="text" className="form-control form-control-input" placeholder='Enter Mail'></input> */}
                                            <div className="position-absolute" style={{ left: 15, top: '50%' }}>
                                                <img src={MailIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-end align-items-center'>
                                            <button type="submit" className='blue-btn'>Save and Continue</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                    {showCode &&
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <Plans showBackButton handleBackButtonClick={handleBackButtonClick} upgradePlan={upgradePlan} />
                        </div>
                    }
                    {showPreferences && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <Preferences />
                        </div>
                    )}
                    {showHelpFAQ && !showPreferences && faqs && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <HelpFAQ faqs={faqs} />
                        </div>
                    )}
                    {showPaymentHistory && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <PaymentHistory />
                        </div>
                    )}
                    {isTermsConditionActive && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <TermsAndCondition />
                        </div>
                    )}
                    {isPrivacyPolicyActive && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <PrivacyPolicy />
                        </div>
                    )}
                    {isPricingActive && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <Pricing />
                        </div>
                    )}
                    {isViewPlansActive && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                             <Plans handleBackButtonClick={handleBackButtonClick} upgradePlan={upgradePlan} />
                        </div>
                    )}
                    {isCancellationPolicyActive && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                             <CancellationAndRefundPolicy />
                        </div>
                    )}
                    {isFeedbackActive && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                             <Feedback />
                        </div>
                    )}
                    {isAboutAirrchipActive && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                             <AboutAirrchip />
                        </div>
                    )}
                </div>
            </div>
            {
                // paymentLoader && <Loader />
            }
            {/* COMMENTED OUT FOR FUTURE PAYMENT GATEWAY INTEGRATION */}
            {/* <PaymentModal
                show={showPaymentConfirmation}
                type={paymentModalType}
                transactid={paymentData?.razorpay_order_id}
                amount={'₹'+paymentData?.order_amount}
                credits={paymentData?.credits_offered}
                onPress={handlePaymentModel}
            /> */}
        </>
    )
}

export default Profile
