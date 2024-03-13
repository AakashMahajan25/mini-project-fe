import React from 'react';
import StarPlans from '../../assets/images/star-plans.png';
import CheckIcon from '../../assets/images/CheckGreenIcon.png';

function PlansCard({ features, title, pricingText, creditsText, benefitsText, buttonText, forText, showStarIcon, applyMargin,cardBackground }) {
    return (
        <div className='plans-card-css'>
            <div className='card' style={{ background: cardBackground }}>
                {showStarIcon && <img src={StarPlans} width={25} style={{ objectFit: 'contain', position: 'absolute', right: 12, top: 12 }} />}
                <div>
                    <div className='forText' style={{ marginTop: applyMargin ? 22 : 0, minHeight:22 }}>{forText}</div>
                    <div className='PlanTitle'>{title}</div>
                    <div className='PlanPricingText'>{pricingText}</div>
                </div>
                <div>
                    <div className='CreditsText'>Credits</div>
                    <div className='CreditsLimitText'>{creditsText}</div>
                </div>
                <div>
                    <div className='CreditsText'>Feature Benefits</div>
                    <div className='CreditsLimitText' style={{ marginBottom: 12 }}>{benefitsText}</div>
                </div>
                {features.map((feature, index) => (
                    <div key={index} className='d-flex align-items-start mb-1'>
                        <img src={CheckIcon} width={10} className='me-1' style={{ objectFit: 'contain' }} />
                        <div className='checkPara'>{feature}</div>
                    </div>
                ))}
                <button style={{ position: 'absolute', bottom: 18, right: '5%', width: '90%' }} className='White-btn'>{buttonText}</button>
            </div>
        </div>
    )
}

export default PlansCard;
