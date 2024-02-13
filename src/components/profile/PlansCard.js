import React from 'react'
import StarPlans from '../../assets/images/star-plans.png'
import CheckIcon from '../../assets/images/CheckGreenIcon.png'

function PlansCard({ features }) {
    return (
        <>
            <div className='plans-card-css'>
                <div className='card'>
                    <img src={StarPlans} width={25} style={{ objectFit: 'contain', position: 'absolute', right: 12, top: 12 }} />
                    <div>
                        <div className='forText'>For</div>
                        <div className='PlanTitle'>Retail Investors</div>
                        <div className='PlanPricingText'>$14/month</div>
                    </div>
                    <div>
                        <div className='CreditsText'>Credits</div>
                        <div className='CreditsLimitText'>725 credits per month</div>
                    </div>
                    <div>
                        <div className='CreditsText'>Feature Benefits</div>
                        <div className='CreditsLimitText' style={{ marginBottom: 12 }}>Get access to real-time market data through generative AI on</div>
                    </div>
                    {features.map((feature, index) => (
                        <div key={index} className='d-flex align-items-start mb-1'>
                            <img src={CheckIcon} width={10} className='me-1' style={{ objectFit: 'contain' }} />
                            <div className='checkPara'>{feature}</div>
                        </div>
                    ))}
                    <div>
                        <button>Upgrade</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlansCard