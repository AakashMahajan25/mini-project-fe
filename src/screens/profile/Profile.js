import React, { useEffect } from 'react'
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
import { getAvaliableCredit, getUserDetails } from './usersSlice';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateProfileSchema = yup.object().shape({
        first_name: yup.string().required("Please enter first name."),
        last_name: yup.string().required("Please enter last name."),
        email: yup.string().email('Please enter valid Email Id').required("Please enter Email Id."),
        phone_number: yup.string().required("Please enter Mobile number."),
        address: yup.string().required("Address is required."),
    })

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(updateProfileSchema)
    })


    const { userCredits, isLoading, userDetails } = useSelector(state => state.userSlice)

    useEffect(() => {
        dispatch(getAvaliableCredit());
        dispatch(getUserDetails())
    }, [])

    console.log('userDetails', userDetails)
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
        console.log('data:::::::::::::::', data)
        // dispatch(updateProfile(data))
        // .unwrap()
        // .then(async(res) => {
        //     dispatch(setUserName(`${data?.first_name} ${data?.last_name}`))
        //     await storageSetUserName(`${data?.first_name} ${data?.last_name}`)
        //     Toast.show({
        //         type: 'success',
        //         text1: res?.data || 'Profile Updated Successfully'
        //     });
        // })
        // .catch((error) => {
        //     Toast.show({
        //         type: 'error',
        //         text1: 'Error in updating profile'
        //     });
        // })
    }

    return (
        <>
            <div className='row justify-content-between m-0 profile-css'>
                <div className='col-lg-3 column-pad'>
                    <LeftProfileBox />
                </div>
                <div className='col-lg-9 column-pad'>
                    <div className='right-part' style={{ height: window.innerHeight - 130, overflowY: 'scroll' }}>
                        <div className='welcome-text'>Welcome</div>
                        <div style={{ marginBottom: 20 }} className='user-text'>{userDetails?.first_name + " " + userDetails?.last_name}!</div>
                        <div className='row m-0'>
                            <div className='col-lg-6 column-pad' style={{ marginBottom: 20 }}>
                                <div className='me-2'>
                                    <div className='blue-box'>
                                        <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 10 }}>
                                            <div className='text-1'>Available Credits</div>
                                            <div className='d-flex align-items-center'>
                                                <div className='text-2'>History</div>
                                                <img src={WhiteArrow} style={{ width: 18, objectFit: 'contain' }} />
                                            </div>
                                        </div>
                                        <div className='light-blue-box' style={{ width: 'fit-content', marginBottom: 28 }}>
                                            <div className='d-flex justify-content-start align-items-center'>
                                                <div className='text-3'>{parseFloat(userCredits?.totalCredits - userCredits?.usedCredits).toFixed(2)}</div>
                                                <div className='text-4 mt-1'>/{parseFloat(userCredits?.totalCredits).toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className='text-2'>1 Credit = 1000 Tokens</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 column-pad' style={{ marginBottom: 20 }}>
                                <div className='ms-2'>
                                    <div className='blue-box'>
                                        <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 10 }}>
                                            <div className='text-1'>Current Plan</div>
                                        </div>
                                        <div className='light-blue-box' style={{ marginBottom: 10 }}>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='text-3'>Premium</div>
                                                <div className='text-4'>$14 /month</div>
                                            </div>
                                        </div>
                                        <button className='white-btn'>Change Plan<img src={BlueArrow} style={{ objectFit: 'contain', width: 6, marginLeft: 10 }} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row m-0'>
                            <div className='col-lg-6 column-pad'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='profile-title' style={{ marginBottom: 32 }}>Profile</div>
                                    <div className='d-flex jsutify-content-between align-items-center mt-2  ' style={{ marginBottom: 20 }}>
                                        <img src={UserImg} style={{ width: 82, objectFit: 'contain', marginRight: 15 }} />
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
                </div>
            </div>
            {
                isLoading && <Loader />
            }
        </>
    )
}

export default Profile
