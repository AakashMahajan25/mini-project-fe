import React, { useEffect, useState } from 'react'
import './Plans.scss'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import PlansCard from './PlansCard';
import { getAllActivePlans } from '../../screens/profile/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

function Plans({handleBackButtonClick, showBackButton, upgradePlan}) {
    const dispatch = useDispatch();
    const Basic = [
        'News headlines & Investors Stories',
        'Summarise news and get TLDRs',
        'Analysts and Agency Ratings',
        'Corporate Actions',
        'Fundamental Data',
        'Earings calender',
    ];
    const RetailInvestors = [
        'News headlines & Investors Stories',
        'Summarise news and get TLDRs',
        'Financial statements',
        'Analysts and Agency Ratings',
        'Corporate Actions',
        'Fundamental Data',
        'Event driven market intelligence',
        'Analysts Podcasts',
    ];
    const FinanceProfessionals = [
        'News headlines & Investors Stories',
        'Summarise news and get TLDRs',
        'Financial statements',
        'Analysts and Agency Ratings',
        'Corporate Actions',
        'Fundamental Data',
        'Event driven market intelligence',
        'Analysts Podcasts',
        'Document & Youtube video processing',
    ];
    const APIAccessPlan = [
        'News headlines & Investors Stories',
        'Summarise news and get TLDRs',
        'Financial statements',
        'Analysts and Agency Ratings',
        'Corporate Actions',
        'Fundamental Data',
        'Event driven market intelligence',
        'Analysts Podcasts',
        'Document & Youtube video processing',
    ];

    const { activePlanList } = useSelector(state => state.userSlice);
    const [currencySymbol, setCurrencySymbol] = useState('');
    useEffect(() => {
        // Use a free IP geolocation API (replace with your own API if needed)
        const apiUrl = 'https://ipapi.co/json/';

        // Fetch the user's geolocation information
        const getGeolocation = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Extract the country code from the geolocation data
                const userCountry = data.country;

                // Determine the currency symbol based on the country
                switch (userCountry) {
                    case 'IN':
                        setCurrencySymbol('₹'); // INR symbol for India
                        break;
                    // Add more cases for other countries if needed
                    default:
                        setCurrencySymbol('$'); // Default to USD for other countries
                        break;
                }
            } catch (error) {
                console.error('Error getting geolocation:', error);
            }
        };
        getGeolocation();
    }, []);

    useEffect(() => {
        dispatch(getAllActivePlans());
    }, [])

    return (
        <>
            <div className='plans-css'>
                {showBackButton &&
                    <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                        <button onClick={handleBackButtonClick} className='light-blue-btn me-2'><img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />Back</button>
                    </div>
                }
                <div className='Upgrade-text'>Buy Plans !</div>
                {/* <div className='pera'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</div> */}
                <div>
                    <div className='row'>
                        {/* <div className='col-lg-3'>
                            <PlansCard
                                cardBackground="linear-gradient(194.74deg, rgba(95, 125, 255, 0.7) 0%, rgba(63, 90, 209, 0.7) 94.44%)"
                                showStarIcon={false}
                                forText=''
                                applyMargin={true}
                                title="Basic"
                                pricingText="$0/month"
                                creditsText="Max 50 credits"
                                benefitsText="Get access to real-time market data through generative AI on"
                                features={Basic}
                                buttonText="Current Plan"
                            />
                        </div>
                        <div className='col-lg-3'>
                            <PlansCard
                                cardBackground="linear-gradient(194.74deg, rgba(95, 125, 255, 0.8) 0%, rgba(63, 90, 209, 0.8) 94.44%)"
                                showStarIcon={true}
                                forText='For'
                                title="Retail Investors"
                                pricingText="$14/month"
                                creditsText="725 credits per month"
                                benefitsText="Get access to real-time market data through generative AI on"
                                features={RetailInvestors}
                                buttonText="Upgrade"
                            />
                        </div>
                        <div className='col-lg-3'>
                            <PlansCard
                                cardBackground="linear-gradient(194.74deg, rgba(95, 125, 255, 0.9) 0%, rgba(63, 90, 209, 0.9) 94.44%)"
                                showStarIcon={true}
                                forText='For'
                                title="Finance Professionals"
                                pricingText="$45/month"
                                creditsText="2500 credits per month"
                                benefitsText="Get access to real-time market data through generative AI on"
                                features={FinanceProfessionals}
                                buttonText="Upgrade"
                            />
                        </div> */}
                        {activePlanList &&
                            activePlanList.map((plan, i) => (
                                <div className='col-lg-3 col-md-6' key={'planlist' + i}>
                                    <PlansCard
                                        cardBackground="linear-gradient(194.74deg, rgba(95, 125, 255, 0.9) 0%, rgba(63, 90, 209, 0.9) 94.44%)"
                                        showStarIcon={(plan?.price === 0) ? false : true}
                                        forText={(plan?.price === 0) ? '' : 'For'}
                                        title={plan?.plan_name}
                                        pricingText={`₹ ${plan?.price} INR/month`}
                                        upgradePlan={()=> upgradePlan({plan_id : plan.plan_id, order_amount : plan.price})}
                                        // pricingText={(currencySymbol === '₹' && plan?.price > 0) ? `₹${plan?.price}/month` : (currencySymbol === '$' && plan?.price > 0) ? `$${plan?.price}/month` : ''}
                                        creditsText={`${plan?.credits_offered} ${(plan?.validity === 30 || plan?.validity === 31 || plan?.price === 0) ? 'credits per month' : 'credits per ' + plan?.validity + ' days'}`}
                                        benefitsText="Get access to real-time market data through generative AI on"
                                        features={(plan?.highlights).split(" | ")}
                                        buttonText="Buy Now" //"Upgrade"
                                    />
                                </div>
                            ))}
                        <div className='col-lg-3 col-md-6'>
                            <PlansCard
                                cardBackground="linear-gradient(194.74deg, #5F7DFF 0%, #3F5AD1 94.44%)"
                                showStarIcon={true}
                                forText='For'
                                title="Enterprise Plan"
                                pricingText="Custom pricing"
                                creditsText="On Request"
                                benefitsText="Get access to real-time market data through generative AI on"
                                features={APIAccessPlan}
                                buttonText="Contact us"
                                type="custom"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Plans