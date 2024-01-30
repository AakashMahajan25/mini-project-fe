import React from 'react'
import './FrruitGPTLeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import ChatIcon from '../../assets/images/new-chat-icon.png';

function FrruitGPTLeftBox() {
    const TodaysTexts = [
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
    ];
    const oneMonthTexts = [
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
        "Recent trends for TCS",
    ];
    return (
        <>
            <div className='Frruit-GPT-left-box'>
                <div className='box' style={{ height: window.innerHeight - 130 }}>
                    <div className="position-relative" style={{ marginBottom: 20 }}>
                        <input type="text" className="form-control form-control-search" placeholder='Search Here' />
                        <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                            <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                    </div>
                    <div className="position-relative blue-box" style={{ marginBottom: 20, cursor: 'pointer' }}>
                        <div className='new-chat-text'>New Chat</div>
                        <div className="position-absolute" style={{ right: 14, top: '19%' }}>
                            <img src={ChatIcon} style={{ width: 24, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                        </div>
                    </div>
                    <div className='history-text'>History</div>
                    <div className='time-text'>Today</div>
                    <div>
                        {TodaysTexts.map((text, index) => (
                            <div key={index} className='blue-box'>
                                <div className='new-chat-text'>{text}</div>
                            </div>
                        ))}
                    </div>
                    <div className='time-text'>1 Month</div>
                    <div>
                        {oneMonthTexts.map((text, index) => (
                            <div key={index} className='blue-box'>
                                <div className='new-chat-text'>{text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrruitGPTLeftBox