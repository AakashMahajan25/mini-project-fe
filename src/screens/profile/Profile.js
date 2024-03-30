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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { getAvaliableCredit, getFaqs, getUserDetails, getUserPlan, updateProfile } from './usersSlice';
import Plans from '../../components/profile/Plans';
import Preferences from '../../components/profile/Preferences';
import { getStockIndexes } from '../dashboard/slice';
import HelpFAQ from '../../components/profile/helpFAQ/HelpFAQ';
import { toast } from 'react-toastify';
import ReactGA from 'react-ga4';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleBackButtonClick = () => {
        setShowCode(prevShowCode => !prevShowCode);
    };
    const [showPreferences, setShowPreferences] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showHelpFAQ, setShowHelpFAQ] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [isShowCodeActiveColor, setShowCodeActiveColor] = useState(true);
    const [isHelpActive, setIsHelpActive] = useState(false);
    const [isPreferencesActiveColor, setPreferencesActiveColor] = useState(false);

    const handleProfileClick = () => {
        setShowProfile(true);
        setShowPreferences(false);
        setShowHelpFAQ(false);
        setIsHelpActive(false);
        setShowCodeActiveColor(true);
        setPreferencesActiveColor(false);
    };

    const handlePreferencesClick = () => {
        setShowCode(false)
        setShowProfile(false);
        setShowPreferences(true);
        setIsHelpActive(false);
        setShowCodeActiveColor(false);
        setPreferencesActiveColor(true);
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


    const { userCredits, isLoading, userDetails, userPlan, faqs } = useSelector(state => state.userSlice)

    useEffect(() => {
        dispatch(getAvaliableCredit()).unwrap().then(()=>{
            ReactGA.event({
                category: 'Profiling',
                action: 'user_avaliablecredit',
                label: 'User Avaliable Credit'
              });
        }).catch(err => {

        });
        dispatch(getUserDetails()).then(()=>{
            ReactGA.event({
                category: 'Profiling',
                action: 'user_profile',
                label: 'User Profile'
              });
        }).catch(err => {

        });
        dispatch(getUserPlan());
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

    const onSubmit = (data) => {
        dispatch(updateProfile(data))
            .unwrap()
            .then(async (res) => {
                toast.success("Profile Updated Successfully")
            })
            .catch((error) => {
                toast.error("Error in updating profile")
            })
    }

    const rightPartHeight = window.innerWidth > 768 ? window.innerHeight - 105 : window.innerHeight - 57;

    return (
        <>
            <div className='row justify-content-between m-0 profile-css'>
                <div className='col-lg-3 col-md-3 col-sm-3 column-pad'>
                    <LeftProfileBox
                        handlePreferencesClick={handlePreferencesClick}
                        handleProfileClick={handleProfileClick}
                        handleHelpClick={handleHelpClick}
                        isPreferencesActive={isPreferencesActiveColor}
                        isshowCodeActive={isShowCodeActiveColor}
                        isHelpActive={isHelpActive}
                    />
                </div>
                <div className='col-lg-9 col-md-9 col-sm-9 column-pad'>
                    {!showCode && !showPreferences && !showHelpFAQ &&
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <div className='welcome-text'>Welcome</div>
                            <div style={{ marginBottom: 20 }} className='user-text'>{userDetails?.first_name + " " + userDetails?.last_name}!</div>
                            <div className='row m-0'>
                                <div className='col-lg-6 column-pad' style={{ marginBottom: 20 }}>
                                    <div className='cardCustomMarginRight'>
                                        <div className='blue-box'>
                                            <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 10 }}>
                                                <div className='text-1'>Available Credits</div>
                                                {/* <div className='d-flex align-items-center'>
                                                    <div className='text-2'>History</div>
                                                    <img src={WhiteArrow} style={{ width: 18, objectFit: 'contain' }} />
                                                </div> */}
                                            </div>
                                            <div className='light-blue-box' style={{ width: 'fit-content', marginBottom: 28 }}>
                                                <div className='d-flex justify-content-start align-items-center'>
                                                    <div className='text-3'>{userCredits ? parseFloat(userCredits?.totalCredits - userCredits?.usedCredits).toFixed(2) : '00'}</div>
                                                    <div className='text-4 mt-1'>/{userCredits ? parseFloat(userCredits?.totalCredits).toFixed(2) : '00'}</div>
                                                </div>
                                            </div>
                                            <div className='text-2'>1 Credit = 1000 Tokens</div>
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
                                                            <div className='text-3' style={{ fontSize: 24 }}>{userPlan?.plan_name}</div>
                                                            <div className='text-4'>{userPlan?.subsciption_type === "free" ? `${userPlan.credits_offered} Credits` : `₹${userPlan?.price} /month`}</div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <button onClick={setShowCode} className='white-btn'>View Plans<img src={BlueArrow} style={{ objectFit: 'contain', width: 6, marginLeft: 10 }} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row m-0'>
                                <div className='col-lg-6 column-pad'>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='profile-title' style={{ marginBottom: 32 }}>Profile</div>
                                        <div className='row align-items-center mt-2  ' style={{ marginBottom: 20 }}>
                                            {/* <img src={UserImg} style={{ width: 82, objectFit: 'contain', marginRight: 15 }} /> */}
                                            <div className='col-lg-2 col-md-2'>
                                                <div className='user-profile-circle'>
                                                    <div className='user-profile-circle-text'>{userDetails?.first_name?.slice(0, 1)}</div>
                                                </div>
                                            </div>
                                            <div className='col-lg-10 col-md-10'>
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
                                        <label className='form-control-label'>Phone Number</label>
                                        <div className='row m-0'>
                                            {/* <div className='col-lg-2 column-pad'>
                                        <div className='me-2'>
                                            <input style={{textIndent:'12px'}} type="text" className="form-control form-control-input" placeholder='+91' defaultValue={"+91"} disabled></input>
                                        </div>
                                    </div> */}
                                            <div className='col-lg-12 column-pad'>
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
                                                    {/* <input type="text" className="form-control form-control-input" placeholder='Enter Phone Number'></input> */}
                                                    <div className="position-absolute" style={{ left: 17, top: '22%' }}>
                                                        <img src={MobileIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                                    </div>
                                                </div>
                                            </div>
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
                            <Plans handleBackButtonClick={handleBackButtonClick} />
                        </div>
                    }
                    {showPreferences && (
                        // Show the Preferences component
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <Preferences />
                        </div>
                    )}
                    {showHelpFAQ && !showPreferences && faqs && (
                        <div className='right-part' style={{ height: rightPartHeight, overflowY: 'scroll' }}>
                            <HelpFAQ faqs={faqs} />
                        </div>
                    )}
                </div>
            </div>
            {/* {
                isLoading && <Loader />
            } */}
        </>
    )
}

export default Profile
