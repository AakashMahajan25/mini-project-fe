import React, { useEffect, useState } from 'react'
import './MarketContentGptLeftBox.scss';
import SearchIcon from '../../assets/images/search-icon.png';
import ChatIcon from '../../assets/images/new-chat-icon.png';
import Nav from 'react-bootstrap/Nav';

function MarketContentGptLeftBox() {
    const linkTexts = [
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
        "https://www.youtube.com/",
        "https://www.example.com/",
        "https://www.openai.com/",
    ];
    return (
        <>
            <div className='marketContentGptLeftBox-css'>
                <div className='box' style={{ height: window.innerHeight - 105 }}>
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
                    <div className='history-text'>Document/Link History</div>
                    <div>
                        {linkTexts.map((linkText, index) => (
                            <Nav.Link key={index} className='blue-box'>{linkText}</Nav.Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarketContentGptLeftBox
