import React from 'react'
import './Pricing.scss'
import PremiumData from '../../../assets/images/premium-data-img.png'
import AiPoweredImg from '../../../assets/images/ai-powered-img.png'

function Pricing() {
    return (
        <div className='pricing-page-css'>
            <div className='pricing-header-text'>Pricing</div>
            {/* <div className='pricing-text'>Flexible Pricing. Charges based on your usage</div> */}
            <div className='container-box'>
                <div className='header-text'>Pay-as-you-go and Transparent</div>
                <div className='desc-text'>
                Access real-time market insights with simple, usage-based pricing—1 credit equals 1,000 tokens, consumed as you interact with our AI-powered search. Pay only for what you need, keeping costs transparent and manageable.
                </div>
                <div className='table-component mt-3'>
                    <div className='col-lg-7 col-sm-12 table-heading'>
                        <div className={window.innerWidth < 500 ? 'd-flex align-items-center justify-content-between' : 'row'}>
                            <div className='col-lg-6 col-sm-5 table-header'>Token Consumption</div>
                            <div className='col-lg-6 col-sm-5 table-header'>Credits Usage</div>
                            {/* <div className='col-lg-2 col-sm-2 table-header'>Pricing</div> */}
                        </div>
                    </div>
                    <div className='table-row col-lg-7 col-sm-12'>
                        <div className={window.innerWidth < 500 ? 'd-flex align-items-center justify-content-between' : 'row'}>
                            <div className='col-lg-6 col-sm-5 table-row-text'>1000</div>
                            <div className='col-lg-6 col-sm-5 table-row-text'>1</div>
                            {/* <div className='col-lg-2 col-sm-2 table-row-text'>$0.50</div> */}
                        </div>
                    </div>
                </div>
                <div className='header-text mt-4'>Credit-Based Pricing</div>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className='container-box'>
                            <div className='blue-text mb-3'>Retail Investors Lite</div>
                            <div className='grey-text'>Credits: <span className='dark-grey-text'>200</span></div>
                            <div className='grey-text'>Tokens: <span className='dark-grey-text'>200000</span></div>
                            <div className='grey-text'>Cost:  <span className='dark-grey-text'>₹ 365 INR/month <span className='small-grey-text'>(incl. of all taxes)</span></span></div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className='container-box'>
                            <div className='blue-text mb-3'>Retail Investors Pro</div>
                            <div className='grey-text'>Credits: <span className='dark-grey-text'>550</span></div>
                            <div className='grey-text'>Tokens: <span className='dark-grey-text'>550000</span></div>
                            <div className='grey-text'>Cost:  <span className='dark-grey-text'>₹ 950 INR/month <span className='small-grey-text'>(incl. of all taxes)</span></span></div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className='container-box'>
                            <div className='blue-text mb-3'>Finance Professional</div>
                            <div className='grey-text'>Credits: <span className='dark-grey-text'>2000</span></div>
                            <div className='grey-text'>Tokens: <span className='dark-grey-text'>2000k</span></div>
                            <div className='grey-text'>Cost:  <span className='dark-grey-text'>₹ 3200 INR/month <span className='small-grey-text'>(incl. of all taxes)</span></span></div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className='container-box'>
                            <div className='blue-text mb-3'>Enterprise Plan</div>
                            <div className='grey-text'>Credits: <span className='dark-grey-text'>On Request</span></div>
                            <div className='grey-text'>Tokens: <span className='dark-grey-text'>-</span></div>
                            <div className='grey-text'>Cost:  <span className='dark-grey-text'>Custom Pricing</span></div>
                        </div>
                    </div>
                </div>
                <div className='header-text mt-4'>Usage and Charges Include</div>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='container-box'>
                            <img src={PremiumData} className='pricing-img' />
                            <div className='blue-text mt-3'>Access to Premium Data & Web Searches</div>
                            <div className='desc-text mt-2'>Charges apply for accessing premium data sources.</div>  
                        </div>
                    </div>
                    <div className='col-lg-6'>
                    <div className='container-box'>
                            <img src={AiPoweredImg} className='pricing-img' />
                            <div className='blue-text mt-3'>AI powered Data crunching</div>
                            <div className='desc-text mt-2'>Costs associated with processing complex queries.</div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing