import React, { useEffect, useState } from 'react'
import './BottomSearchBar.scss'
import AttachIcon from '../../assets/images/fluent_attach-20-regular.png'
import LinkIcon from '../../assets/images/link_icon.png'
import SendIcon from '../../assets/images/send_icon.png'
import ArrowIcon from '../../assets/images/arrow-img.png'
import RightArrow from '../../assets/images/right_arrow.png'
import { searchSuggestedPrompt } from '../../screens/frruitGPT/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RightFocusArrow from '../../assets/images/arrow-img.png'
import StraightArrowIcon from '../../assets/images/straight-arrow.png'
import { Modal } from 'react-bootstrap';

function BottomSearchBar(props) {

    const [showFundamentals, setShowFundamentals] = useState(false);
    const [showNews, setShowNews] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showWebSearch, setShowWebSearch] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { suggestedQuestionsList, isLoading } = useSelector(state => state.fruitGPTSlice);

    const {
        setQuestion = () => { },
        question = '',
        handleAskPress = () => { },
        flag = '',
        setFlag = () => { }
    } = props

    
    useEffect(() => {
        const searchQuestion = setTimeout(() => {
            if (question.length>0 && flag === 'news') {
                dispatch(searchSuggestedPrompt(question))
            }
        }, 0);
        return () => clearTimeout(searchQuestion)
    }, [question])

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

    const handleCheckboxChange = () => {
        setShowSuggestions(!showSuggestions);
    };

    const handleWebSearchChange = () => {
        setShowWebSearch(!showWebSearch);
    };

    const handleClose = () => setShowWebSearch(false);

    const routeChangeFrruitGPT = (question) => {
        navigate("/frruit-gpt", {
            state: { question, fundamental: 'news' },
        });
    };

    const placeholderText = flag === 'news' ? 'Search news, summarize, and get TLDRs.' : flag === 'fund' ? 'Compare company data, financials, and actions.' : flag === 'youtube' ? 'Discover insights from YouTube videos.' : 'Search discussions and opinions on Reddit.'
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
                            <div className='d-flex align-items-center me-3'>
                                <div className='tab-name-css px-3'>Choose Focus</div>
                                <img src={StraightArrowIcon} style={{width: 20, objectFit: 'contain'}} />
                            </div>
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
                    <div style={{ position: 'relative' }}>
                        {(flag === 'news') &&
                            <div className="form-check form-switch checkbox-position">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={handleWebSearchChange}
                                /> <span className={showWebSearch ? 'web-search-active' : 'web-search-default'}>Web Search</span>
                            </div>
                        }
                        <input
                            className={(flag === 'news' && question.length > 0 && suggestedQuestionsList.length > 0) ? "form-control-suggestion" : flag === 'news' ? "form-control-newsTab" : 'form-control'}
                            value={question}
                            onChange={handleChange}
                            placeholder={placeholderText}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                </div>
                <div className='sendIcon' onClick={handleAskPress}>
                    <img src={SendIcon} className='sendIcon-styles' />
                </div>
                {/* <div className='show-suggestions'>
                    <div className='d-flex align-items-center suggestions-text'>
                        <input
                            type='checkbox'
                            className='show-suggestions-checkbox'
                            checked={showSuggestions}
                            onChange={handleCheckboxChange}
                        /> Show Suggestions
                    </div>
                </div>
                {showSuggestions && */}
                {(flag === 'news' && question.length > 0 && suggestedQuestionsList.length > 0) &&
                    <div className='suggestions-box'>
                        {
                            suggestedQuestionsList.slice(0, 4).map((question, index) =>
                                <div className='text-box' onClick={() => routeChangeFrruitGPT(question?.question)}>
                                    <div className='suggestions-text'>{question?.question}</div>
                                    <img src={ArrowIcon} style={{ width: 20, objectFit: 'contain', marginLeft: 16 }} />
                                </div>
                            )
                        }
                    </div>
                }
                {/* } */}
            </div>
            {/* <Modal show={showWebSearch} onHide={handleClose} size='sm' centered scrollable>
                <Modal.Header>
                    <Modal.Title>Web Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p></p>
                </Modal.Body>
            </Modal> */}
        </>
    )
}

export default BottomSearchBar