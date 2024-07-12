import React, { useState, useEffect, useMemo, useRef } from 'react';
import LeftBox from '../../components/leftBox/LeftBox';
import DashboardRightBox from '../../components/dashboardRightBox/DashboardRightBox';
import Stories1 from '../../assets/images/watchlist_news.png';
import Stories2 from '../../assets/images/session_news.png';
import Stories3 from '../../assets/images/hot_pursuit_news.png';
import Stories4 from '../../assets/images/corporate_news.png';
import Stories5 from '../../assets/images/economy_news.png';
import Stories6 from '../../assets/images/corporate_results_news.png';
import Stories7 from '../../assets/images/market_news.png';
import CloseIcon from '../../assets/images/close_icon.png';
import StoriesImg from '../../assets/images/stories-img-1.png';
import StoriesImg2 from '../../assets/images/stories-img-2.png';
import quesIcon from '../../assets/images/i-icon.png';
import PrevBtn from '../../assets/images/prev-btn.png';
import NextBtnicon from '../../assets/images/next-btn.png';
import LeftBtn from '../../assets/images/left-slider-btn.png';
import RightBtn from '../../assets/images/right-slider-btn.png';
import SendIcon from '../../assets/images/send_icon.png';
import './Dashboard.scss';
import '../../components/frruitGpt/BottomSearchBar.scss'
import TrendingStocksCard from '../../components/trendingStocks/TrendingStocksCard';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews, fetchTrendingStocksFromAI, getInvestorStories, getMostOnFrruitGpt, getStockIndexes, getTrendingNews, getTrendingStocks, setStoryIndex, setStoryViewed } from './slice';
import { getPromptSuggestion,searchSuggestedPrompt } from '../frruitGPT/slice';
// import { searchSuggestedPrompt } from '../../screens/frruitGPT/slice'
import Loader from '../../components/loader/Loader';
import RightWhiteArrow from '../../assets/images/right-arrow.png';
import NewsViewAll from '../../components/dashboard/NewsViewAll';
import RightArrow from '../../assets/images/right-arrow.png';
import RightBlueArrow from '../../assets/images/blue-right-arrow.png';
import CloseImg from '../../assets/images/close_icon.png';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import ReactGA from 'react-ga4';
import ArrowIcon from '../../assets/images/arrow-img.png'
import RightArrowIcon from '../../assets/images/arrow-img.png'
import StraightArrowIcon from '../../assets/images/straight-arrow.png'
// import PopupModal from '../../components/PopupModal/PopupModal';
import { getAvaliableCredit, getUserPlan } from '../profile/usersSlice';
import CreditOverModal from '../../components/creditOverModal/CreditOverModal';
import ActivateWebSearch from '../../components/activateWebSearch/ActivateWebSearch';
import ArrowDownIcon from '../../assets/images/accordiun-down-arrow.png'
import RightIcon from '../../assets/images/charm_tick.png'

const storyEnum = {
    watchlist_news: 'isWatchlistViewed',
    session_news: 'isSessionViewed',
    hot_pursuit_news: 'isHotPursuitViewed',
    corporate_news: 'isCorporateViewed',
    economy_news: 'isEconomyViewed',
    corporate_results_news: 'isCorporateResultsViewed',
    market_news: 'isMarketViewed',
}
const storyEnum2 = {
    watchlist_news: 'watchlistNews',
    session_news: 'sessionNews',
    hot_pursuit_news: 'hotPursuitNews',
    corporate_news: 'corporateNews',
    economy_news: 'economyNews',
    corporate_results_news: 'corporateResultsNews',
    market_news: 'marketNews',
}

const storyEnum3 = {
    watchlist_news: 'watchlistNews',
    session_news: 'sessionNews',
    hot_pursuit_news: 'hotPursuitNews',
    corporate_news: 'corporateNews',
    economy_news: 'economyNews',
    corporate_results_news: 'corporateResultsNews',
    market_news: 'marketNews',
}
// const leftPosition = window.innerWidth < 768 ? 370 : 370;
// const rightPosition = window.innerWidth < 768 ? 370 : 370;
const rightPositionModal = window.innerWidth < 768 ? -80 : -80;
const topPositionModal = window.innerWidth < 768 ? -10 : -10;

function Dashboard() {
    // const [showSuggestions, setShowSuggestions] = useState(false);
    const PreviousBtn = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick}>
                <img src={PrevBtn} style={{ width: 44, position: 'absolute', top: -110, left: 370 }} />
            </div>
        )
    }
    const NextBtn = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick}>
                <img src={NextBtnicon} style={{ width: 44, position: 'absolute', top: -110, right: 370 }} />
            </div>
        )
    }
    const PreviousBtn2 = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick} style={{ position: 'relative' }}>
                <img src={LeftBtn} style={{ width: 40, position: 'absolute', top: -18, right: -150 }} />
            </div>
        )
    }
    const NextBtn2 = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick} style={{ position: 'relative' }}>
                <img src={RightBtn} style={{ width: 40, position: 'absolute', top: -98, right: -140 }} />
            </div>
        )
    }
    const PreviousBtn3 = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick} style={{ position: 'relative' }}>
                <img src={LeftBtn} style={{ width: 40, position: 'absolute', top: -67, right: -190 }} />
            </div>
        )
    }
    const NextBtn3 = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick} style={{ position: 'relative' }}>
                <img src={RightBtn} style={{ width: 40, position: 'absolute', top: -147, right: -180 }} />
            </div>
        )
    }

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [stories, setStories] = useState([]);
    const [storyType, setStoryType] = useState([]);
    const [question, setQuestion] = useState('');
    const [flag, setFlag] = useState('news');
    const [showWebSearch, setShowWebSearch] = useState(false);
    const [showCreditModal, setShowCreditModal] = useState(false);
    const handleCloseCreditModal = () => setShowCreditModal(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [selectedFund, setSelectedFund] = useState('Company Data');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const handleCloseSearchModal = () => {
        setShowSearchModal(false);
        setShowWebSearch(false);
        setFlag('news')
    }
    const storyRef = useRef()

    const handleShow = (data) => {
        setStoryType(data)
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
        setActiveIndex(0)
    };
    const handleShow2 = (data) => {
        setShow2(true);
    };
    const handleClose2 = () => {
        setShow2(false);
    };
    const handleShow3 = (data) => {
        setShow3(true);
    };
    const handleClose3 = () => {
        setShow3(false);
    };

    const storiesData = [
        { src: Stories1, onClick: handleShow, storyType: 'watchlist_news', title: 'WatchList', lightBackground: '#EFF2FF', color: '#5F7DFF', },
        { src: Stories2, onClick: handleShow, storyType: 'session_news', title: 'Session', lightBackground: '#EEF6EE', color: '#54A153', },
        { src: Stories3, onClick: handleShow, storyType: 'hot_pursuit_news', title: 'Hot Pursuit', lightBackground: '#FDF0F0', color: '#EB6060', },
        { src: Stories4, onClick: handleShow, storyType: 'corporate_news', title: 'Corporate', lightBackground: '#F9F0FA', color: '#BB68C8', },
        { src: Stories5, onClick: handleShow, storyType: 'economy_news', title: 'Economy', lightBackground: '#F3F0FC', color: '#8361D9', },
        { src: Stories6, onClick: handleShow, storyType: 'corporate_results_news', title: 'Corporate Results', lightBackground: '#FEF9E9', color: '#ECBE1C', },
        { src: Stories7, onClick: handleShow, storyType: 'market_news', title: 'Market', lightBackground: '#EDF9F5', color: '#43BE9A', },
    ];

    const dispatch = useDispatch()
    const { trendingStocks, trendingNews, mostOnFrruitGpt, storyViewed, investorStory, storyIndex, isLoading, investorStoryLoading, indexLoader, stockIndexes, investorStoryError, cmotsNews } = useSelector(state => state.dashboardSlice);
    const { chatSuggestions, suggestionLoader, suggestionError,suggestedQuestionsList } = useSelector(state => state.fruitGPTSlice);
    const { userCredits, userPlan } = useSelector(state => state.userSlice)
    const [showLeftBox, setShowLeftBox] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            setShowLeftBox(window.innerWidth >= 769);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        swipeToSlide: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };
    const suggestionSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2.5,
        swipeToSlide: true,
        // arrows: false,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };
    const storyImg = {
        dots: false,
        infinite: false,
        speed: 100,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => { setActiveIndex(newIndex); dispatch(setStoryIndex({ type: storyType.storyType, number: newIndex })) },
        initialSlide: storyIndex[storyEnum2[storyType?.storyType]],
        ref: (slider) => { storyRef.current = slider }
    };

    const navigate = useNavigate();

    const routePromptFrruitGPT = (question, flag) => {
        if (question) {
            ReactGA.event({
                category: 'Dashboard',
                action: 'mostonfrruit_prompt_click',
                label: 'MostonFrruit Prompt Click'
            });
            navigate("/frruit-gpt", {
                state: { question, fundamental: flag },
            });
        }
    };
    const routeNews = (src) => {
        navigate("/news", {
            state: { src },
        });
    };

    useEffect(() => {
        if ((!isData)) {
            dispatch(getTrendingStocks()).unwrap()
                .then((res) => {
                    ReactGA.event({
                        category: 'Dashboard',
                        action: 'get_trending_stocks',
                        label: 'Get Trending Stocks'
                    });
                }).catch(err => {

                });
            dispatch(getTrendingNews())
            dispatch(fetchTrendingStocksFromAI())
            dispatch(getMostOnFrruitGpt(20)).unwrap()
                .then((res) => {
                    ReactGA.event({
                        category: 'Dashboard',
                        action: 'get_mostonfrruitgpt',
                        label: 'Get MostonFrruitGpt'
                    });
                }).catch(err => {

                });
            dispatch(getPromptSuggestion())
            dispatch(getInvestorStories()).unwrap()
                .then((res) => {
                    ReactGA.event({
                        category: 'Dashboard',
                        action: 'get_investor_stories',
                        label: 'Get Investor Stories'
                    });
                }).catch(err => {

                });
            // dispatch(getStockIndexes())
            dispatch(fetchAllNews(''))
        }
        dispatch(getAvaliableCredit())
        dispatch(getUserPlan());
        const interval = setInterval(() => {
            dispatch(fetchAllNews(''))
        }, 60000 * 3);
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        getStoryData()
    }, [storyType])

    const creditScore = userCredits?.totalCredits - userCredits?.usedCredits

    useEffect(() => {
        if (userPlan?.plan_name !== 'Beta' && creditScore <= 20) {
            setShowCreditModal(true);
        } else {
            setShowCreditModal(false);
        }
    }, [creditScore, userPlan]);

    useEffect(() => {
        if (showWebSearch) {
            setFlag('news_bing')
        }
    }, [showWebSearch])

    useEffect(() => {
        if (activeIndex === (stories?.length - 1) || (stories?.length === 1 && activeIndex === 0)) {
            dispatch(setStoryViewed(storyType.storyType));
        }
    }, [activeIndex, stories]);

    const shouldShowStory = useMemo(() => (
        (investorStory?.watchlistNews?.length > 0 ||
            investorStory?.sessionNews?.length > 0 ||
            investorStory?.hotPursuitNews?.length > 0 ||
            investorStory?.corporateNews?.length > 0 ||
            investorStory?.economyNews?.length > 0 ||
            investorStory?.corporateResultsNews?.length > 0 ||
            investorStory?.marketNews?.length > 0) ?
            ((investorStory?.watchlistNews?.length > 0 && !storyViewed?.isWatchlistViewed) ||
                (investorStory?.sessionNews?.length > 0 && !storyViewed?.isSessionViewed) ||
                (investorStory?.hotPursuitNews?.length > 0 && !storyViewed?.isHotPursuitViewed) ||
                (investorStory?.corporateNews?.length > 0 && !storyViewed?.isCorporateViewed) ||
                (investorStory?.economyNews?.length > 0 && !storyViewed?.isEconomyViewed) ||
                (investorStory?.corporateResultsNews?.length > 0 && !storyViewed?.isCorporateResultsViewed) ||
                (investorStory?.marketNews?.length > 0 && !storyViewed?.isMarketViewed)) : false
    ), [storyViewed, investorStory])

    const getStoryData = () => {
        const data = investorStory[storyEnum3[storyType.storyType]];
        let tempData = []
        if (data?.length > 0) {
            for (const el of data) {
                tempData.push({
                    themeBg: getRandomColor(),
                    mainHeading: el['Headline'],
                    newsDescription: el['News'],
                    time_stamp: el['time_stamp']
                    // storyImage: true,
                    // viewImage: el['Image URL'],
                    // bottomsubDescription: el['Summary'],
                    // url: el['URL']
                })
            }
        }
        setStories(tempData)
        setActiveIndex(storyIndex[storyEnum2[storyType?.storyType]])
        if (storyRef)
            storyRef.current?.slickGoTo(storyIndex[storyEnum2[storyType?.storyType]])
    }

    const colors = ['#4563E4', '#40BC98', "#2B69B6", "#A856E5", "#E35151", "#858585", "#CB6343", "#0CB8B8", "#8361D9", "#4563E4"]

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    const getFrruitClick = () => {
        navigate("/frruit-gpt", {
            // state: { question: 'What is happening in ' + symbol + ' stock' },
        });
    }

    const handleViewAllClick = () => {
        setShowAllContent(!showAllContent);
    };
    const toggleShowAllContent = () => {
        setShowAllContent(prevState => !prevState);
    };
    const [showAllContent, setShowAllContent] = useState(true);
    const handleChange = (e) => {
        setQuestion(e.target.value)
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            routePromptFrruitGPT(question, flag);
        }
    };

    const isData = useMemo(() => {
        return ((((investorStory?.watchlistNews?.length > 0 || investorStory?.sessionNews?.length > 0 || investorStory?.hotPursuitNews?.length > 0 || investorStory?.corporateNews?.length > 0 || investorStory?.economyNews?.length > 0 || investorStory?.corporateResultsNews?.length > 0 || investorStory?.marketNews?.length > 0) || investorStoryError) && (chatSuggestions?.length > 0 || suggestionError)))
    }, [investorStory, stockIndexes, chatSuggestions])

    const handleWebSearchChange = () => {
        const webSearch = localStorage.getItem('webSearch')
        setShowWebSearch(!showWebSearch);
        if (!webSearch) {
            setShowSearchModal(!showSearchModal);
        }
    };

    // const handleCheckboxChange = () => {
    //     setShowSuggestions(!showSuggestions);
    // };
    const placeholderText = (flag === 'news' || flag === 'news_bing') ? 'Search news, summarize, and get TLDRs.' : flag === 'fund' ? 'Compare company data, financials, and actions.' : flag === 'youtube' ? 'Discover insights from YouTube videos.' : 'Search discussions and opinions on Reddit.'

    useEffect(() => {
        if (showWebSearch) {
            setFlag('news_bing')
        } else {
            setFlag('news')
        }
    }, [showWebSearch])

    const handleCreditButton = () => {
        navigate("/profile", {
            state: { plans: true },
        });
    }

    const handleWebSearchProceed = () => {
        setShowSearchModal(!showSearchModal);
        localStorage.setItem('webSearch', true)
    }

    const handleFundClick = () => {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    };

    const handleOptionClick = (value) => {
        setSelectedFund(value);
        setShowDropdown(false);
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

    const routeChangeFrruitGPT = (question) => {
        navigate("/frruit-gpt", {
            state: { question, fundamental: 'news' },
        });
    };

    useEffect(() => {
        const searchQuestion = setTimeout(() => {
            if (question.length > 0 && flag === 'news') {
                dispatch(searchSuggestedPrompt(question))
            }
        }, 0);
        return () => clearTimeout(searchQuestion)
    }, [question])

    return (
        <>
            {
                ((indexLoader || investorStoryLoading || suggestionLoader) && !isData) &&
                <Loader />
            }
            {showCreditModal &&
                <CreditOverModal show={showCreditModal} handleClose={handleCloseCreditModal} onButtonClick={handleCreditButton} />
            }
            {showSearchModal &&
                <ActivateWebSearch show2={showSearchModal} handleClose2={handleCloseSearchModal} handleClose1={handleWebSearchProceed} />
            }
            <div className='dashboardHome row justify-content-between m-0'>
                {/* {showLeftBox && (
                    <div className='col-lg-3 column-pad dashboardLeftboxHideClass'>
                        <LeftBox />
                    </div>
                )} */}
                {/* <PopupModal/> */}
                <>
                    {showAllContent &&
                        <div className='col-lg-9 column-pad'
                        // style={{position: 'relative'}}
                        >
                            <div className='hide-on-large-screens-dashboard'>
                                <div className='dashboardTextForMobile'>Dashboard</div>
                                <div onClick={handleViewAllClick} className='dashboardTextForMobile'>Latest News<img src={RightWhiteArrow} width={16} height={16} style={{ objectFit: 'contain', cursor: 'pointer' }} /></div>
                            </div>
                            <div className='dashboard'>
                                <div className='d-flex flex-column justify-content-between mb-3' style={{ height: window.innerWidth > 768 ? window.innerHeight - 102 : window.innerHeight - 115 }}>
                                    <div className='d-flex flex-column'>
                                        {
                                            shouldShowStory &&
                                            <div className='dashboard-container'>
                                                <p className='stories-title' style={{ marginBottom: 10 }}>Investors Stories</p>
                                                <div className='d-flex align-items-start mobile-scroll-dashboard'>
                                                    {storiesData.map((img, i) => {
                                                        return (
                                                            !storyViewed[storyEnum[img?.storyType]] && investorStory[storyEnum2[img?.storyType]]?.length > 0 ?
                                                                <div className='d-flex flex-column align-items-center' style={{ marginRight: 20, cursor: 'pointer' }} onClick={() => handleShow({ storyType: img.storyType })}>
                                                                    {/* <img
                                                                    key={'MStories' + i}
                                                                    style={{ width: 60, objectFit: 'contain', cursor: 'pointer'}}
                                                                    src={img.src}
                                                                    // alt={`Story ${index}`}
                                                                    /> */}
                                                                    <div key={'MStories' + i} className='d-flex align-items-center justify-content-center storyOuterContainer' style={{ border: `1px solid ${img?.color}`, borderRadius: 35 }}>
                                                                        <p className='storyCircleInnerText' style={{ background: img?.lightBackground, borderRadius: 25, textAlign: 'center', fontWeight: '700', color: img?.color }}>{img?.title.slice(0, 1)}
                                                                        </p>
                                                                    </div>
                                                                    <p style={{ marginBottom: 0, fontSize: 13, color: '#6F7387', fontWeight: '500', textAlign: 'center' }}>{img?.title}</p>
                                                                </div>
                                                                :
                                                                null
                                                        )
                                                    }
                                                    )}
                                                </div>
                                            </div>
                                        }
                                        <div className='dashboard-slider'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <p className='stories-title' style={{ marginBottom: 10 }}>Trending stocks for today</p>
                                                <p className='stories-title marginCustomDashboard' style={{ marginBottom: 10, color: '#4563E4', cursor: 'pointer' }} onClick={handleShow3}>View All</p>
                                            </div>
                                            <Slider {...settings}>
                                                {trendingStocks?.slice(0, 10).map((stockData, index) => (
                                                    <TrendingStocksCard key={index} {...stockData} />
                                                ))}
                                            </Slider>
                                        </div>
                                    </div>
                                    <div className='dashboard-container'>
                                        <div className='suggested-prompts-container'>
                                            {mostOnFrruitGpt?.rows?.length > 0 &&
                                                <>
                                                    <div className='box-content position-relative'>
                                                        <div className='d-flex align-items-center justify-content-between'>
                                                            <div className='title'>Most on Frruit</div>
                                                            <div onClick={handleShow2} style={{ cursor: 'pointer', color: '#4563E4', fontWeight: 600 }}>View All</div>
                                                        </div>
                                                        <Slider
                                                            prevArrow={<PreviousBtn2 />}
                                                            nextArrow={<NextBtn2 />}
                                                            {...suggestionSettings}
                                                        >
                                                            {mostOnFrruitGpt?.rows?.slice(0, 4).map((text, index) => (
                                                                <div onClick={() => { routePromptFrruitGPT(text?.question, 'fund') }} key={index} className='col-lg-6'>
                                                                    <div className='mostOnFrruitBox mb-2' style={{ marginRight: 10 }}>
                                                                        <div className='d-flex justify-content-between align-items-center' >
                                                                            <p className='text'>{text?.question}</p>
                                                                            <img style={{ width: 24, objectFit: 'contain' }} src={RightArrow} alt={`Arrow ${index}`} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </Slider>
                                                    </div>
                                                </>
                                            }
                                            {chatSuggestions?.length > 0 &&
                                                <>
                                                    <p className='stories-title'>Suggested Prompts</p>
                                                    <div className='row' >
                                                        <Slider
                                                            prevArrow={<PreviousBtn3 />}
                                                            nextArrow={<NextBtn3 />}
                                                            {...suggestionSettings}>
                                                            {chatSuggestions.map((item, index) => (
                                                                <div onClick={() => { routePromptFrruitGPT(item?.prompt_text, 'fund') }} key={index} className='col-lg-6' style={{ cursor: 'pointer' }}>
                                                                    <div className='prompts-text-bg' style={{ marginRight: 10, cursor: 'pointer' }}>
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
                                                        </Slider>
                                                    </div>
                                                </>
                                            }
                                            <>
                                                <div className='customTab-frruit-gpt'>
                                                    <div className='d-flex align-items-center mobile-scroll-Css'>
                                                        <div className='d-flex align-items-center me-3'>
                                                            <div className='tab-name-css'>Choose Focus</div>
                                                            <img src={StraightArrowIcon} style={{ width: 20, objectFit: 'contain' }} />
                                                        </div>
                                                        <div className={(flag === 'news' || flag === 'news_bing') ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: (flag === 'news' || flag === 'news_bing') ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
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
                                                        > Reddit </div>
                                                        {/* <div className={flag === 'news' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'news' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                            onClick={() => setFlag('news')}
                                                        > News </div>
                                                        <div className={flag == 'fundamentals' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag == 'fundamentals' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                            onClick={() => setFlag('fundamentals')}
                                                        > Fundamentals </div>
                                                        <div className={flag == 'youTube' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag == 'youTube' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                            onClick={() => setFlag('youTube')}
                                                        > YouTube </div>
                                                        <div className={flag == 'reddit' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag == 'reddit' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                            onClick={() => setFlag('reddit')}
                                                        >Reddit </div>
                                                        <div className={flag == 'similarDays' ? `tab-name-css tab-box-css` : `tab-name-css`} style={{ backgroundColor: flag == 'similarDays' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                            onClick={() => setFlag('similarDays')}
                                                        >Similar Days </div> */}
                                                    </div>
                                                </div>
                                                <div className='search-dashboard-main d-flex align-items-end'>
                                                    <div class="form-group">
                                                        <div style={{ position: 'relative' }}>
                                                            {(flag === 'news' || flag === 'news_bing') &&
                                                                <div className="form-check form-switch checkbox-position hide-in-mobile">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        onChange={handleWebSearchChange}
                                                                        checked={showWebSearch}
                                                                    /> <span className={showWebSearch ? 'web-search-active' : 'web-search-default'}>Web Search</span>
                                                                </div>
                                                            }
                                                            {(flag === 'fund') &&
                                                                <div className="fundDropDownPosition hide-in-mobile" onClick={handleFundClick}>
                                                                    <div className='searchInputDropdowntext'>{selectedFund}<img src={ArrowDownIcon} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 5 }} className={showDropdown ? 'rotate-icon rotated' : 'rotate-icon'} /></div>
                                                                </div>
                                                            }
                                                            <input
                                                                // className={(flag === 'news' || flag === 'news_bing') ? "form-control-newsTab" : 'form-control'}
                                                                // className='form-control'
                                                                className={`${(flag === 'news' || flag === 'news_bing') && question.length > 0 && suggestedQuestionsList.length > 0 ? 'form-control-suggestion' : (flag === 'news' || flag === 'news_bing') ? 'form-control-newsTab' : flag === 'fund' ? (showDropdown ? 'form-control-funds-only' : 'form-control-fund') : 'form-control'}`}
                                                                style={{ height: 48 }}
                                                                value={question}
                                                                onChange={handleChange}
                                                                placeholder={placeholderText}
                                                                onKeyDown={handleKeyPress}
                                                            />
                                                        </div>
                                                    </div>
                                                    <img className='send-image' src={SendIcon} alt='Send' onClick={() => routePromptFrruitGPT(question, flag)} />
                                                </div>
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
                                                        /> <span className={showWebSearch ? 'web-search-active' : 'web-search-default'}>Web Search</span>
                                                    </div>
                                                }
                                                {(flag === 'fund') &&
                                                    <div className="fundDropDownPosition hide-in-desktop" onClick={handleFundClick}>
                                                        <div className='searchInputDropdowntext'>{selectedFund}<img src={ArrowDownIcon} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 5 }} className={showDropdown ? 'rotate-icon rotated' : 'rotate-icon'} /></div>
                                                    </div>
                                                }
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {showAllContent &&
                        <div className='col-lg-3 column-pad dashboardRightBoxNewsHide'>
                            <DashboardRightBox newsData={cmotsNews?.rows} mostFrruitData={mostOnFrruitGpt?.rows} onViewAllClick={handleViewAllClick} />
                        </div>
                    }
                    {!showAllContent &&
                        <div className='col-lg-12 column-pad'>
                            <NewsViewAll backBtnClick={toggleShowAllContent} newsData={cmotsNews?.rows} />
                        </div>
                    }
                </>
                <Modal
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="example-custom-modal-styling-title"
                    size="lg"
                    centered
                    className='custom-modal'
                >
                    <Modal.Header style={{ position: 'absolute', right: rightPositionModal, top: topPositionModal }}>
                        <div onClick={handleClose} style={{ cursor: 'pointer' }}><img src={CloseIcon} style={{ width: 24, height: 24 }} /></div>
                    </Modal.Header>
                    <Modal.Body className="custom-modal-body">
                        <div style={{}}>
                            <div className='row position-relative justify-content-between' style={{ padding: '0px 30px', top: 20 }}>
                                {[...new Array(stories?.length)].map((value, index) => (
                                    <div
                                        key={index}
                                        className='col'
                                        style={{
                                            top: '10px',
                                            height: 6,
                                            borderRadius: 10,
                                            backgroundColor: index === storyIndex[storyEnum2[storyType?.storyType]] ? '#fff' : 'rgba(229, 229, 229, 0.5)',
                                            zIndex: 10,
                                            // paddingRight: 20,
                                            marginRight: 3,
                                            marginLeft: 3,
                                        }}
                                    />
                                ))}
                            </div>
                            <Slider prevArrow={<PreviousBtn />}
                                nextArrow={<NextBtn />} {...storyImg}>
                                {stories.map((story, index) => {
                                    return (
                                        <div className='d-flex justify-content-center'>
                                            <div key={index} style={{ position: 'relative', width: 800, height: 470, background: story.themeBg, borderRadius: 20, padding: 20 }}>
                                                {/* <div style={{ background: 'white', borderRadius: 20, padding: 16, width: '100%', marginTop: 20, height: 250 }}>
                                                    <img src={story.viewImage} style={{ objectFit: 'cover', borderRadius: 20, filter: 'grayscale(60%)', width: '100%', height: 220 }} />
                                                </div> */}
                                                <div className='stories-headline'>{story.mainHeading}</div>
                                                <div className='stories-sub-headline' dangerouslySetInnerHTML={{ __html: story.newsDescription }}></div>
                                                <div className='stories-sub-headline' >{story?.time_stamp}</div>
                                                {/* <div className='d-flex justify-content-between align-items-center mt-3'>
                                                    <button className='white-btn-main  d-flex align-items-center justify-content-center' onClick={getFrruitClick} style={{ width: '48%' }}>{'Get Frruit'}  <img src={RightWhiteArrow} style={{ width: 20, objectFit: 'contain', marginLeft: 5 }} /></button>
                                                    <div onClick={() => routeNews(story.url)} style={{ width: '100%', cursor: 'pointer' }}>
                                                        <p className='secondary-btn' style={{ textDecoration: 'none', textAlign: 'center', width: '48%' }}> {'View More'}  </p>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal show={show2}
                    onHide={handleClose2}
                    size='lg'
                    className='viewModal'
                    scrollable
                    centered
                >
                    <Modal.Header>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div className='header-text'>Most on Frruit</div>
                            <div onClick={() => handleClose2()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                                <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='viewModal'>
                            <div>
                                {mostOnFrruitGpt?.rows?.map((text, index) => (
                                    <div onClick={() => { routePromptFrruitGPT(text?.question, 'fund') }} key={index} className='d-flex justify-content-between align-items-center blue-box mb-2' style={{ cursor: 'pointer' }}>
                                        <div>{text?.question}</div>
                                        <img src={RightBlueArrow} className='me-1' width={10} style={{ objectFit: 'contain' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal show={show3}
                    onHide={handleClose3}
                    size='lg'
                    className='viewModal2'
                    scrollable
                    centered
                >
                    <Modal.Header>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div className='header-text'>Trending stocks for today</div>
                            <div onClick={() => handleClose3()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                                <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='viewModal2 '>
                            <div className='row' style={{ marginLeft: 0 }}>

                                {trendingStocks?.map((stockData, index) => (
                                    <div className='col-lg-6 column-pad mb-3 pointer'>
                                        <TrendingStocksCard key={index} {...stockData} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default Dashboard;
