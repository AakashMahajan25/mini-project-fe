import React, { useState } from 'react'
import './BottomSearchBar.scss'
import AttachIcon from '../../assets/images/fluent_attach-20-regular.png'
import LinkIcon from '../../assets/images/link_icon.png'
import SendIcon from '../../assets/images/send_icon.png'

function BottomSearchBar(props) {

    const [showFundamentals, setShowFundamentals] = useState(false);
    const [showNews, setShowNews] = useState(true);

    const {
        setQuestion = () => { },
        question = '',
        handleAskPress = () => { },
        flag = '',
        setFlag = () => { }
    } = props

    const handleChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAskPress();
        }
    };

    const newsClick = () => {
        setShowFundamentals(false);
        setShowNews(true);
    }
    const fundamentalClick = () => {
        setShowFundamentals(true);
        setShowNews(false);
    }

    return (
        <>
            <div className='BottomSearchBar'>
                {/* <div className='attachment'>
                <p className='attach-text'>Attach</p>
                <img src={AttachIcon} className='img-styles' />
            </div>
            <div className='linkUrl'>
                <p className='linkUrl-text'>Link URL</p>
                <img src={LinkIcon} className='img-styles' />
            </div> */}
                <div class="form-group">
                    <div className='customTab-frruit-gpt'>
                        <div className='d-flex align-items-center'>
                            <div className={flag === 'news' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'news' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                onClick={() => setFlag('news')}
                            > News </div>
                            <div className={flag === 'fund' ? `tab-name-css tab-box-css` : `tab-name-css`} style={{ backgroundColor: flag === 'fund' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                onClick={() => setFlag('fund')}
                            > Fundamentals </div>
                            <div className={flag === 'youtube' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'youtube' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                onClick={() => setFlag('youtube')}
                            > Youtube </div>
                            <div className={flag === 'reddit' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'reddit' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                onClick={() => setFlag('reddit')}
                            >Reddit </div>
                            {/* <div className={flag === 'news' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'news' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                onClick={() => setFlag('news')}
                            > News </div>
                            <div className={flag == 'fundamentals' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag == 'fundamentals' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                onClick={() => setFlag('fundamentals')}
                            > Fundamentals </div>
                            <div className={flag == 'similarDays' ? `tab-name-css tab-box-css` : `tab-name-css`} style={{ backgroundColor: flag == 'similarDays' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                onClick={() => setFlag('similarDays')}
                            >Similar Days </div> */}
                        </div>
                    </div>
                    <input
                        class="form-control"
                        value={question}
                        onChange={handleChange}
                        placeholder="Type your message here"
                        onKeyDown={handleKeyPress}
                    />
                </div>
                <div className='sendIcon' onClick={handleAskPress}>
                    <img src={SendIcon} className='sendIcon-styles' />
                </div>
            </div>
        </>
    )
}

export default BottomSearchBar