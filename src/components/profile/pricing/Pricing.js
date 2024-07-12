import React from 'react'
import './Pricing.scss'
import PremiumData from '../../../assets/images/premium-data-img.png'
import AiPoweredImg from '../../../assets/images/ai-powered-img.png'

function Pricing() {
    return (
        <div className='pricing-page-css'>
            <div className='pricing-header-text'>Pricing</div>
            <div className='pricing-text'>Flexible Pricing. Charges based on your usage</div>
            <div className='container-box'>
                <div className='header-text'>Lorem Ipsum</div>
                <div className='desc-text'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, eros sit amet cursus gravida, velit nisi venenatis erat, sed pulvinar turpis ex id magna. Sed suscipit, nisi non tincidunt facilisis, metus orci lacinia lectus, a bibendum sapien velit eu justo
                </div>
                <div className='table-component mt-3'>
                    <div className='col-lg-7 col-sm-12 table-heading'>
                        <div className={window.innerWidth < 500 ? 'd-flex align-items-center justify-content-between' : 'row'}>
                            <div className='col-lg-5 col-sm-5 table-header'>Token Consumption</div>
                            <div className='col-lg-5 col-sm-5 table-header'>Credits Burn</div>
                            <div className='col-lg-2 col-sm-2 table-header'>Pricing</div>
                        </div>
                    </div>
                    <div className='table-row col-lg-7 col-sm-12'>
                        <div className={window.innerWidth < 500 ? 'd-flex align-items-center justify-content-between' : 'row'}>
                            <div className='col-lg-5 col-sm-5 table-row-text'>1000</div>
                            <div className='col-lg-5 col-sm-5 table-row-text'>1</div>
                            <div className='col-lg-2 col-sm-2 table-row-text'>$0.50</div>
                        </div>
                    </div>
                </div>
                <div className='header-text mt-4'>Credit-Based Pricing</div>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className='container-box'>
                            <div className='blue-text mb-3'>Basic</div>
                            <div className='grey-text'>Credits: <span className='dark-grey-text'>50</span></div>
                            <div className='grey-text'>Tokens: <span className='dark-grey-text'>50000</span></div>
                            <div className='grey-text'>Cost:  <span className='dark-grey-text'>0$/month</span></div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className='container-box'>
                            <div className='blue-text mb-3'>Retail Investor</div>
                            <div className='grey-text'>Credits: <span className='dark-grey-text'>725</span></div>
                            <div className='grey-text'>Tokens: <span className='dark-grey-text'>7250000</span></div>
                            <div className='grey-text'>Cost:  <span className='dark-grey-text'>14$/month</span></div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className='container-box'>
                            <div className='blue-text mb-3'>Finance Professional</div>
                            <div className='grey-text'>Credits: <span className='dark-grey-text'>2500</span></div>
                            <div className='grey-text'>Tokens: <span className='dark-grey-text'>2500k</span></div>
                            <div className='grey-text'>Cost:  <span className='dark-grey-text'>45$/month</span></div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className='container-box'>
                            <div className='blue-text mb-3'>API Access Plan</div>
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