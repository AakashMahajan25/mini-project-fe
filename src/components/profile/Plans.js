import React from 'react'
import './Plans.scss'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import PlansCard from './PlansCard';

function Plans(props) {
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
    return (
        <>
            <div className='plans-css'>
                <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                    <button onClick={props.handleBackButtonClick} className='light-blue-btn me-2'><img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />Back</button>
                </div>
                <div className='Upgrade-text'>Upgrade !</div>
                <div className='pera'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                <div>
                    <div className='row'>
                        <div className='col-lg-3'>
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
                        </div>
                        <div className='col-lg-3'>
                            <PlansCard
                                cardBackground="linear-gradient(194.74deg, #5F7DFF 0%, #3F5AD1 94.44%)"
                                showStarIcon={true}
                                forText='For'
                                title="API Access Plan"
                                pricingText="Custom pricing"
                                creditsText="On Request"
                                benefitsText="Get access to real-time market data through generative AI on"
                                features={APIAccessPlan}
                                buttonText="Contact us"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Plans