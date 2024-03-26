import React, { useEffect, useState } from 'react'
import LeftBox from '../../components/leftBox/LeftBox'
import './styles.scss'
import BackArrow from '../../assets/images/back-btn-arrow.png';
import WhiteArrow from '../../assets/images/white-btn-arrow.png';
import { useLocation, useNavigate } from 'react-router-dom';

function NewsIframe() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [showSummary, setShowSummary] = useState(false)
    const [showLeftBox, setShowLeftBox] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            setShowLeftBox(window.innerWidth >= 769);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

console.log('state', state)
    const goBack = () => {
        navigate(-1)
    }
    return (
        <div className='dashboardHome row justify-content-between m-0'>
              {showLeftBox && (
            <div className='col-lg-3 column-pad'>
                <LeftBox />
            </div>
              )}
            <div className='col-lg-9 column-pad'>
                <div className='news_iframe'>
                    <div className='d-flex align-items-center back-click' onClick={goBack}>
                        <img src={BackArrow} style={{ width: 8, objectFit: 'contain', marginRight: 10 }} />
                        Go Back
                    </div>
                    <div className='d-flex align-items-center ju get-summary-click' onClick={() => setShowSummary(!showSummary)}>
                        Get News Summary
                        <img src={WhiteArrow} style={{ width: 8, objectFit: 'contain', marginLeft: 10, marginTop: 2 }} />
                    </div>
                </div>
                {showSummary &&
                    <div className='summary-data'>
                       <p className='title'>Summary:</p>
                       <p className='description'>Get News SummaryGet News SummaryGet News SummaryGet News SummaryGet News SummaryGet News SummaryGet News SummaryGet News SummaryGet News SummaryGet News SummaryGet News SummaryGet News Summary</p>
                    </div>
                }
                {state?.src &&
                    <iframe style={{ width: '100%', height: window.innerHeight - 175 }} src={state?.src} />
                }
            </div>
        </div>
    )
}

export default NewsIframe