import React, { useEffect, useState, useRef } from 'react'
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
import ArrowDownIcon from '../../assets/images/accordiun-down-arrow.png'
import RightIcon from '../../assets/images/charm_tick.png'
import { Modal } from 'react-bootstrap';
import ActivateWebSearch from '../activateWebSearch/ActivateWebSearch'

function BottomSearchBar(props) {

    const [showFundamentals, setShowFundamentals] = useState(false);
    const [showNews, setShowNews] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showWebSearch, setShowWebSearch] = useState(false);
    const [selectedFund, setSelectedFund] = useState('Company Data');
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState(false); 
    const dropdownRef = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { suggestedQuestionsList, isLoading, frruitLoader } = useSelector(state => state.fruitGPTSlice);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const handleCloseSearchModal = () => {
        setShowSearchModal(false);
        setShowWebSearch(false);
        setFlag('news')
    }

    const {
        setQuestion = () => { },
        question = '',
        handleAskPress = () => { },
        flag = '',
        buttonStart = true,
        setFlag = () => { },
        isNewChat = false
    } = props

    useEffect(() => {
        const searchQuestion = setTimeout(() => {
            if (question.length > 0 && flag === 'news') {
                dispatch(searchSuggestedPrompt(question))
            }
        }, 0);
        return () => clearTimeout(searchQuestion)
    }, [question])

    useEffect(() => {
        if (showWebSearch) {
            setFlag('news_bing')
        } else {
            setFlag('news')
        }
    }, [showWebSearch])

    useEffect(() => {
      if(isNewChat)
        setShowWebSearch(false);

    }, [isNewChat])

    useEffect(() => {
        if (flag === 'news_bing' && !showWebSearch) {
            setShowWebSearch(true);
        } else if (flag === 'screener') {
            setSelectedFund('Stock Screener')
        }
    }, [flag])

    // const handleChange = (e) => {
    //     setQuestion(e.target.value)
    // }

    const handleChange = (e) => {
        setQuestion(e.target.value);
        setError(false);  // Clear error when user starts typing
    }

    // const handleKeyPress = (e) => {
    //     if (buttonStart && e.key === 'Enter') {
    //         handleAskPress();
    //     }
    // };
    const handleKeyPress = (e) => {
        if (buttonStart && e.key === 'Enter') {
            if (question.length === 0) {
                setError(true);  // Set error if input is empty
            } else {
                handleAskPress();
            }
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
        const webSearch = localStorage.getItem('webSearch')
        setShowWebSearch(!showWebSearch);
        if (!webSearch) {
            setShowSearchModal(!showSearchModal);
        }
    };
    const handleClose = () => setShowWebSearch(false);

    const routeChangeFrruitGPT = (question) => {
        navigate("/frruit-gpt", {
            state: { question, fundamental: 'news' },
        });
    };

    const handleFundClick = () => {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    };

    const handleWebSearchProceed = () => {
        setShowSearchModal(!showSearchModal);
        localStorage.setItem('webSearch', true)
    }
    const handleOptionClick = (value) => {
        setSelectedFund(value);
        setShowDropdown(false);
        if(value === 'Stock Screener'){
            setFlag('screener')
        }else{
            setFlag('fund')
        }
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const placeholderText = (flag === 'news' || flag === 'news_bing') ? 'Search news, summarize, and get TLDRs' : flag === 'fund' ? 'Compare company fundamentals data, financials, stock screener and corporate actions' : flag === 'youtube' ? 'Discover insights from YouTube videos' : 'Search discussions and opinions on Reddit'
    return (
        <>
            {showSearchModal &&
                <ActivateWebSearch show2={showSearchModal} handleClose2={handleCloseSearchModal} handleClose1={handleWebSearchProceed} />
            }
            <div className='BottomSearchBar'>
                {/* <div className='attachment'>
                <p className='attach-text'>Attach</p>
                <img src={AttachIcon} className='img-styles' />
            </div>
            <div className='linkUrl'>
                <p className='linkUrl-text'>Link URL</p>
                <img src={LinkIcon} className='img-styles' />
            </div> */}

                <div className='customTab-frruit-gpt'>
                    <div className='d-flex align-items-center mobile-scroll-Css'>
                        <div className='d-flex align-items-center me-3'>
                            <div className='tab-name-css px-3'>Choose Search Focus</div>
                            <img src={StraightArrowIcon} style={{ width: 20, objectFit: 'contain' }} />
                        </div>
                        <div className={(flag === 'news' || flag === 'news_bing') ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: (flag === 'news' || flag === 'news_bing') ? '#F1F4FD' : '', color: (frruitLoader && !(flag === 'news' || flag === 'news_bing')) ? '#B4B3B9' : '#4563E4', cursor: 'pointer' }}
                            onClick={frruitLoader ? undefined : () => showWebSearch ? setFlag('news_bing') : setFlag('news')}
                        > News </div>
                        <div className={(flag === 'fund' || flag === 'screener') ? `tab-name-css tab-box-css` : `tab-name-css`} style={{ backgroundColor: (flag === 'fund' || flag === 'screener') ? '#F1F4FD' : '', color: (frruitLoader && !(flag === 'fund' || flag === 'screener'))  ? '#B4B3B9' : '#4563E4', cursor: 'pointer' }}
                            onClick={frruitLoader ? undefined : () => selectedFund === 'Company Data' ? setFlag('fund') : setFlag('screener')}
                        > Fundamentals </div>
                        <div className={flag === 'youtube' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'youtube' ? '#F1F4FD' : '', color: frruitLoader && flag != 'youtube' ? '#B4B3B9' : '#4563E4', cursor: 'pointer' }}
                            onClick={frruitLoader ? undefined : () => setFlag('youtube')}
                        > Youtube </div>
                        <div className={flag === 'reddit' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'reddit' ? '#F1F4FD' : '', color: frruitLoader && flag != 'reddit' ? '#B4B3B9' : '#4563E4', cursor: 'pointer' }}
                            onClick={frruitLoader ? undefined : () => setFlag('reddit')}
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
                <div className='d-flex justify-content-between'>
                    <div class="form-group">
                        <div style={{ position: 'relative' }}>
                            {(flag === 'news' || flag === 'news_bing') &&
                                <div className="form-check form-switch checkbox-position hide-in-mobile">
                                    <input
                                        style={{ cursor: 'pointer' }}
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={handleWebSearchChange}
                                        checked={showWebSearch}
                                    /> <span className={showWebSearch ? 'web-search-active' : 'web-search-default'}>Web Search</span>
                                </div>
                            }
                            {(flag === 'fund' || flag === 'screener') &&
                                <div className="fundDropDownPosition hide-in-mobile" onClick={handleFundClick}>
                                    <div className='searchInputDropdowntext'>{selectedFund}<img src={ArrowDownIcon} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 5 }} className={showDropdown ? 'rotate-icon rotated' : 'rotate-icon'} /></div>
                                </div>
                            }
                            <input
                                className={`${(flag === 'news' || flag === 'news_bing') && question.length > 0 && suggestedQuestionsList.length > 0 ? 'form-control-suggestion' : (flag === 'news' || flag === 'news_bing') ? 'form-control-newsTab' : (flag === 'fund' || flag === 'screener') ? (showDropdown ? 'form-control-funds-only' : 'form-control-fund') : 'form-control'}`}
                                value={question}
                                disabled={!buttonStart}
                                onChange={handleChange}
                                placeholder={placeholderText}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    </div>
                    {/* <div className='sendIcon ms-3' onClick={handleAskPress} style={{ cursor: buttonStart && 'pointer', opacity: buttonStart ? 1 : 0.5, }}>
                        <img src={SendIcon} className='sendIcon-styles' />
                    </div> */}
                    <div className='sendIcon ms-3' onClick={() => {
                        if (question.length === 0) {
                            setError(true);  // Set error if input is empty
                        } else {
                            handleAskPress();
                        }
                    }} style={{ cursor: buttonStart && 'pointer', opacity: buttonStart ? 1 : 0.5, }}>
                        <img src={SendIcon} className='sendIcon-styles' />
                    </div>

                </div>
                {error && <div className='error-message'>Please enter a search query.</div>}  {/* Add this line */}
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
                            suggestedQuestionsList?.slice(0, 4).map((question, index) =>
                                <div className='text-box' onClick={() => routeChangeFrruitGPT(question?.question)}>
                                    <div className='suggestions-text'>{question?.question}</div>
                                    <img src={ArrowIcon} style={{ width: 20, objectFit: 'contain', marginLeft: 16 }} />
                                </div>
                            )
                        }
                    </div>
                }
                {showDropdown && (
                    <div className='dropdownMenuForFunds' ref={dropdownRef}>
                        <div className='text-box'>
                            <div className='searchInputDropdowntext mb-2' onClick={() => handleOptionClick('Company Data')}>
                                Company Data
                                {selectedFund === 'Company Data' && <img src={RightIcon} style={{ width: 20, height: 20, objectFit: 'contain', marginLeft: 5 }} />}
                            </div>
                            <div className='searchInputDropdowntext' onClick={() => handleOptionClick('Stock Screener')}>
                                Stock Screener
                                {selectedFund === 'Stock Screener' && <img src={RightIcon} style={{ width: 20, height: 20, objectFit: 'contain', marginLeft: 5 }} />}
                            </div>
                        </div>
                    </div>
                )}
                {(flag === 'news' || flag === 'news_bing') &&
                    <div className="form-check form-switch checkbox-position hide-in-desktop">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={handleWebSearchChange}
                            checked={showWebSearch}
                        /> <span className={showWebSearch ? 'web-search-active' : 'web-search-default'}>Web Search</span>
                    </div>
                }
                {(flag === 'fund' || flag === 'screener') &&
                    <div className="fundDropDownPosition hide-in-desktop" onClick={handleFundClick}>
                        <div className='searchInputDropdowntext'>{selectedFund}<img src={ArrowDownIcon} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 5 }} className={showDropdown ? 'rotate-icon rotated' : 'rotate-icon'} /></div>
                    </div>
                }
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