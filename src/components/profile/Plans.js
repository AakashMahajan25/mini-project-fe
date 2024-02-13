import React from 'react'
import './Plans.scss'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import PlansCard from './PlansCard';

function Plans(props) {
    const features = [
        'News headlines & Investors Stories',
        'Summarise news and get TLDRs',
        'Financial statements',
        'Analysts and Agency Ratings',
        'Corporate Actions',
        'Event driven market intelligence',
        'Analysts Podcasts',
        'Fundamental Data',
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
                            <PlansCard features={features} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Plans