import React, { useState, useEffect } from 'react'
import './PopularQuestions.scss'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import RightArrow from '../../assets/images/right-arrow.png';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';
import RightBlueArrow from '../../assets/images/blue-right-arrow.png';
import { Tooltip } from 'react-tooltip'
import quesIcon from '../../assets/images/i-icon.png';
import RightWhiteArrow from '../../assets/images/right-arrow.png';
import RightDrawer from '../../components/rightDrawer/RightDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingDashboardData } from './slice';

function PopularQuestions({ handleBackButtonClick, mostOnFrruitGpt, chatSuggestions, handleViewAllClick }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { marketSummaryData, marketSummaryLoading, marketSummaryError } = useSelector(state => state.dashboardSlice);
    const [showMostOnFrruitDrawer, setShowMostOnFrruitDrawer] = useState(false);
    const [showSuggestedPromptsDrawer, setShowSuggestedPromptsDrawer] = useState(false);
    
    const routePromptFrruitGPT = (question, flag) => {
        // Add validation to prevent empty or null questions
        if (!question || question.trim() === '') {
            console.warn('Empty or invalid question passed to routePromptFrruitGPT:', question);
            return;
        }
        
        ReactGA.event({
            category: 'Dashboard',
            action: 'mostonfrruit_prompt_click',
            label: 'MostonFrruit Prompt Click'
        });
        navigate("/frruit-gpt", {
            state: { question: question.trim(), fundamental: flag },
        });
    };

    const handleShowMostOnFrruit = () => {
        setShowMostOnFrruitDrawer(true);
    };

    const handleCloseMostOnFrruit = () => {
        setShowMostOnFrruitDrawer(false);
    };

    const handleShowSuggestedPrompts = () => {
        setShowSuggestedPromptsDrawer(true);
    };

    const handleCloseSuggestedPrompts = () => {
        setShowSuggestedPromptsDrawer(false);
    };

    useEffect(() => {
        dispatch(getTrendingDashboardData());
    }, [dispatch]);

    return (
        <>
            <div className='hide-on-large-screens-dashboard'>
                <div className='dashboardTextForMobile'>Home</div>
                {/* <div onClick={handleViewAllClick} className='dashboardTextForMobile'>Latest News<img src={RightWhiteArrow} width={16} height={16} style={{ objectFit: 'contain', cursor: 'pointer' }} /></div> */}
            </div>
            <div className='popular-questions-css'>
                <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                    <button onClick={handleBackButtonClick} className='light-blue-btn me-2'><img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />Back</button>
                </div>
                <div className='heading-text'>Market Summary and Standout Stocks</div>
                <div className='desc-text mt-1'>Get comprehensive market insights and discover trending stocks</div>
                
                {marketSummaryLoading && (
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                        <div className='spinner-border text-primary' role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </div>
                        <span className='ms-2'>Loading market summary...</span>
                    </div>
                )}
                
                {marketSummaryError && (
                    <div className='alert alert-danger mt-3' role='alert'>
                        Error loading market summary: {marketSummaryError}
                    </div>
                )}
                
                {marketSummaryData && (
                    <>
                        {/* Market Summary Section */}
                        <div className='box-content position-relative mt-3'>
                            <div className='title mb-3'>Market Summary</div>
                            <div className='row'>
                                {marketSummaryData.market_summary?.summary_points?.slice(0, 6).map((point, index) => (
                                    <div key={index} className='col-lg-6 col-md-6 col-sm-12 mb-3'>
                                        <div className='market-summary-card'>
                                            <div className='market-summary-title'>{point.title}</div>
                                            <div className='market-summary-text'>{point.summary}</div>
                                            <div className='market-summary-age'>{point.age}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Standout Stocks Section */}
                        <div className='box-content position-relative mt-3'>
                            <div className='title mb-3'>Standout Stocks</div>
                            <div className='row'>
                                <div className='col-lg-6 col-md-6 col-sm-12 mb-3'>
                                    <div className='standout-section'>
                                        <div className='standout-section-title'>Top Gainers</div>
                                        {marketSummaryData.standouts_analysis?.topGainers?.map((stock, index) => (
                                            <div key={index} className='standout-stock-card mb-2'>
                                                <div className='d-flex justify-content-between align-items-start'>
                                                    <div className='stock-info'>
                                                        <div className='stock-name'>{stock.name}</div>
                                                        <div className='stock-reason'>{stock.reason}</div>
                                                    </div>
                                                    <div className='stock-change positive'>+{stock.change}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-12 mb-3'>
                                    <div className='standout-section'>
                                        <div className='standout-section-title'>Top Losers</div>
                                        {marketSummaryData.standouts_analysis?.topLosers?.map((stock, index) => (
                                            <div key={index} className='standout-stock-card mb-2'>
                                                <div className='d-flex justify-content-between align-items-start'>
                                                    <div className='stock-info'>
                                                        <div className='stock-name'>{stock.name}</div>
                                                        <div className='stock-reason'>{stock.reason}</div>
                                                    </div>
                                                    <div className='stock-change negative'>{stock.change}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {chatSuggestions?.length > 0 &&
                    <>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='title mt-3'>Suggested Prompts</div>
                            <div onClick={handleShowSuggestedPrompts} style={{ cursor: 'pointer', color: '#4563E4', fontWeight: 600 }}>View All</div>
                        </div>
                        <div className='row hide-in-mobile' >
                            {chatSuggestions.filter(item => item?.prompt_text && item.prompt_text.trim() !== '').slice(0, 9).map((item, index) => (
                                <div onClick={() => { routePromptFrruitGPT(item?.prompt_text, 'news_bing') }} key={index} className='col-lg-4' style={{ cursor: 'pointer' }}>
                                    <div className='prompts-text-bg mt-2' style={{ cursor: 'pointer' }}>
                                        <div className=' d-flex justify-content-between align-items-center w-100' >
                                            <p className='prompts-text'>{item?.prompt_text}</p>
                                            <img style={{ width: 24, objectFit: 'contain' }} src={quesIcon} className={`my-anchor-element-${index}`} />
                                        </div>

                                    </div>
                                    <Tooltip absolute fixed anchorSelect={`.my-anchor-element-${index}`} place="left" className="bg-primary">
                                        <div style={{ width: '370px', fontSize: '14px' }}>
                                            {item?.prompt_description ? item?.prompt_description : item?.prompt_text}</div>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex flex-column hide-in-desktop">
                            {[0, 3].map((startIdx) => (
                                <div
                                    className="d-flex mb-3 mobile-scroll"
                                    key={startIdx}
                                >
                                    {chatSuggestions.filter(item => item?.prompt_text && item.prompt_text.trim() !== '').slice(startIdx, startIdx + 3).map((item, index) => (
                                        <div
                                            onClick={() => { routePromptFrruitGPT(item?.prompt_text, 'news_bing') }}
                                            key={index}
                                            className="col-11 me-3"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="prompts-text-bg mb-2" style={{ cursor: 'pointer' }}>
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <p className="prompts-text">{item?.prompt_text}</p>
                                                    <img
                                                        style={{ width: 24, objectFit: 'contain' }}
                                                        src={quesIcon}
                                                        className={`my-anchor-element-${index}`}
                                                        alt={`Icon ${index}`}
                                                    />
                                                </div>
                                            </div>
                                            <Tooltip
                                                absolute
                                                fixed
                                                anchorSelect={`.my-anchor-element-${index}`}
                                                place="left"
                                                className="bg-primary"
                                            >
                                                <div style={{ width: '370px', fontSize: '14px' }}>
                                                    {item?.prompt_description ? item?.prompt_description : item?.prompt_text}
                                                </div>
                                            </Tooltip>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </>
                }
            </div>
            {/* Right Drawer for Most on Frruit */}
            <RightDrawer
                isOpen={showMostOnFrruitDrawer}
                onClose={handleCloseMostOnFrruit}
                title="Most on Frruit"
                width="500px"
            >
                <div className='viewModal'>
                    <div>
                        {mostOnFrruitGpt?.rows?.filter(text => text?.question && text.question.trim() !== '').map((text, index) => (
                            <div onClick={() => { routePromptFrruitGPT(text?.question, 'news_bing'); handleCloseMostOnFrruit(); }} key={index} className='d-flex justify-content-between align-items-center blue-box mb-2' style={{ cursor: 'pointer' }}>
                                <p className='text'>{text?.question?.replace(/\b\w/g, char => char.toUpperCase())}</p>
                                <img src={RightBlueArrow} className='me-1 ms-2' width={10} style={{ objectFit: 'contain' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </RightDrawer>

            {/* Right Drawer for Suggested Prompts */}
            <RightDrawer
                isOpen={showSuggestedPromptsDrawer}
                onClose={handleCloseSuggestedPrompts}
                title="Suggested Prompts"
                width="500px"
            >
                <div className='viewModal'>
                    <div>
                        {chatSuggestions?.filter(text => text?.prompt_text && text.prompt_text.trim() !== '').map((text, index) => (
                            <div onClick={() => { routePromptFrruitGPT(text?.prompt_text, 'news_bing'); handleCloseSuggestedPrompts(); }} key={index} className='prompts-text-bg' style={{ cursor: 'pointer' }}>
                                <div className='d-flex justify-content-between align-items-center w-100'>
                                    <p className='prompts-text'>{text?.prompt_text?.replace(/\b\w/g, char => char.toUpperCase())}</p>
                                    <div className='d-flex align-items-center'>
                                        <img style={{ width: 24, height: 24, objectFit: 'contain' }} src={quesIcon} className={`my-anchor-element-drawer-${index} hide-in-mobile`} />
                                        <img src={RightBlueArrow} className='ms-2' width={10} height={10} style={{ objectFit: 'contain' }} />
                                    </div>
                                    <Tooltip absolute fixed anchorSelect={`.my-anchor-element-drawer-${index}`} place="left" className="bg-primary hide-in-mobile">
                                        <div style={{ width: '370px', fontSize: '14px' }}>
                                            {text?.prompt_description ? text?.prompt_description : text?.prompt_text}
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </RightDrawer>
        </>
    )
}

export default PopularQuestions