import React, { useState, useEffect, useMemo, useRef } from 'react';
// import LeftBox from '../../components/leftBox/LeftBox';
// import DashboardRightBox from '../../components/dashboardRightBox/DashboardRightBox';
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
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews, fetchTrendingStocksFromAI, getInvestorStories, getMostOnFrruitGpt, getStockIndexes, getTrendingNews, getTrendingStocks, setStoryIndex, setStoryViewed } from './slice';
import { getPromptSuggestion, searchSuggestedPrompt } from '../frruitGPT/slice';
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
// COMMENTED OUT FOR FUTURE PAYMENT GATEWAY INTEGRATION
// import PaymentModal from '../../components/paymentModal/PaymentModal';
import WhiteChevronImg from '../../assets/images/white-dropdown.png'
import CloseImage from '../../assets/images/close_icon.png'
import SelectedFlagIcon from '../../assets/images/selected-flag.png'
import SendIconMobile from '../../assets/images/send_icon_mobile.png'
import PopularQuestions from './PopularQuestions';
import InvestorStories from './InvestorStories';
import RoundChevronRight from '../../assets/images/navigate_icon.png'
import TrendingStockImg from '../../assets/images/trending_stocks_img.png'
import ContentSearchImg from '../../assets/images/content_search_img.png'
import QuestionImage from '../../assets/images/popular_questions_img.png'
import AlertImg from '../../assets/images/exclamation.png'
import ModalWalkthrough from '../../components/modalWalkthrough/ModalWalkthrough';

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
    const [show4, setShow4] = useState(false);
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
    const [error, setError] = useState(false);
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [sentiment, setSentiment] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const dropdownRef = useRef(null);
    const location = useLocation();
    const [showModalWalkthrough, setShowModalWalkthrough] = useState(false);
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

    const handleFlagShow = () => {
        setShow4(true)
    };

    const handleFlagClose = () => {
        setShow4(false)
    };

    const handleBackButtonClick = () => {
        setShowPopularOpinions(!showPopularOpinions);
        setShowAllContent(true)
    };

    const handleInvestorStoriesBackClick = () => {
        setShowInvestorStories(!showInvestorStories);
        setShowAllContent(true)
    };

    const stockboxData = [
        {
            imagesource: TrendingStockImg,
            title: 'Trending Stocks',
            subtitle: 'Explore trending stocks curated by AI'
        },
        {
            imagesource: ContentSearchImg,
            title: 'Content Search',
            subtitle: 'Upload documents and videos to extract key insights instantly with AI'
        },
        {
            imagesource: QuestionImage,
            title: 'Popular Questions',
            subtitle: 'Explore popular and most-asked questions to guide your AI search'
        },
    ]

    const handleClick = (title) => {
        if (title === 'Popular Questions') {
            setShowPopularOpinions(!showPopularOpinions);
            setShowAllContent(false);
        } else if (title === 'Investor Stories & Trending Stocks') {
            setShowInvestorStories(!showInvestorStories);
            setShowAllContent(false);
        } else if(title === 'Content Search') {
            navigate("/market-content-gpt")
        } 
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

    const flagList = [
        { name: 'All', flag: 'news', description: 'Search news, summarize & get TLDRs across premium data sources' },
        // { name: 'News + Web', flag: 'news_bing', description: 'Search across the entire internet' },
        { name: 'Fundamentals', flag: 'fund', description: 'Compare company fundamentals data, financials, stock screener, and corporate actions' },
        // { name: 'Screener', flag: 'screener', description: 'Screen markets in real time based on your queries' },
        // { name: 'Videos', flag: 'youtube', description: 'Discover insights from videos without watching' },
        { name: 'Social Opinions', flag: 'reddit', description: 'Search discussions and opinions on social media' }
    ];

    const dispatch = useDispatch()
    const { trendingStocks, trendingNews, mostOnFrruitGpt, storyViewed, investorStory, storyIndex, isLoading, investorStoryLoading, indexLoader, stockIndexes, investorStoryError, cmotsNews } = useSelector(state => state.dashboardSlice);
    const { chatSuggestions, suggestionLoader, suggestionError, suggestedQuestionsList } = useSelector(state => state.fruitGPTSlice);
    const { userCredits, userPlan } = useSelector(state => state.userSlice)
    // const [showLeftBox, setShowLeftBox] = useState(true);
    // useEffect(() => {
    //     const handleResize = () => {
    //         setShowLeftBox(window.innerWidth >= 769);
    //     };
    //     window.addEventListener('resize', handleResize);
    //     handleResize();
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

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

    // const routePromptFrruitGPT = (question, flag) => {
    //     if (question) {
    //         ReactGA.event({
    //             category: 'Dashboard',
    //             action: 'mostonfrruit_prompt_click',
    //             label: 'MostonFrruit Prompt Click'
    //         });
    //         navigate("/frruit-gpt", {
    //             state: { question, fundamental: flag },
    //         });
    //     }
    // };

    const routePromptFrruitGPT = (question, flag) => {
        if (!question.trim()) {
            setError(true);
            return;
        }
        setError(false);
        ReactGA.event({
            category: 'Dashboard',
            action: 'mostonfrruit_prompt_click',
            label: 'MostonFrruit Prompt Click'
        });
        navigate("/frruit-gpt", {
            state: { question, fundamental: flag },
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
        // dispatch(getAvaliableCredit())
        dispatch(getUserPlan());
        // const interval = setInterval(() => {
        //     if (!filtersApplied) {
        //         dispatch(fetchAllNews(''));
        //     }
        // }, 60000 * 3);
        // return () => {
        //     clearInterval(interval)
        // }
    }, [])

    useEffect(() => {
        if (!filtersApplied) {
            const interval = setInterval(() => {
                dispatch(fetchAllNews(''))
            }, 60000 * 3);
            return () => {
                clearInterval(interval)
            }
        }
    }, [filtersApplied, dispatch]);

    const handleSentimentChange = (value) => {
        setSentiment(value);
        setFiltersApplied(true);
    };

    const handleSortOrderChange = (value) => {
        setSortOrder(value);
        setFiltersApplied(true);
    };

    const handleResetFilters = () => {
        setSentiment('');
        setSortOrder('');
        setFiltersApplied(false);
    };

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
        setShowAllContent(false);
        setShowInvestorStories(false);
        setShowPopularOpinions(false);
    };
    const toggleShowAllContent = () => {
        setShowAllContent(prevState => !prevState);
        handleResetFilters()
    };
    const [showAllContent, setShowAllContent] = useState(true);
    const [showPopularOpinions, setShowPopularOpinions] = useState(false);
    const [showInvestorStories, setShowInvestorStories] = useState(false);

    const handleChange = (e) => {
        setQuestion(e.target.value)
        if (e.target.value.trim()) {
            setError(false);
        }
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
    const placeholderText = (flag === 'news' || flag === 'news_bing') ? 'Search news, summarize & get TLDRs' : (flag === 'fund'|| flag === 'screener') ? 'Compare company data, financials,stock screener and actions' : flag === 'youtube' ? 'Discover insights from videos without watching' : 'Search discussions and opinions on social media'

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
        if (value === 'Stock Screener') {
            setFlag('screener')
        } else {
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

    useEffect(() => {
        if (location.state?.from === '/market') {
            setShowModalWalkthrough(true);
        } else {
            setShowModalWalkthrough(false);
        }
    }, [location.state]);

    return (
        <>
            {
                ((indexLoader || investorStoryLoading || suggestionLoader) && !isData) &&
                <Loader />
            }
            {showModalWalkthrough && 
                <ModalWalkthrough showModalWalkthrough={showModalWalkthrough} setShowModalWalkthrough={setShowModalWalkthrough} />
            }
            {/* {showCreditModal &&
                <CreditOverModal show={showCreditModal} handleClose={handleCloseCreditModal} onButtonClick={handleCreditButton} />
            } */}
            {showSearchModal &&
                <ActivateWebSearch show2={showSearchModal} handleClose2={handleCloseSearchModal} handleClose1={handleWebSearchProceed} />
            }
            <div className='dashboardHome row justify-content-between m-0'>
                {/* {showLeftBox && (
                    <div className='col-lg-3 column-pad dashboardLeftboxHideClass'>
                        <LeftBox />
                    </div>
                )} */}
                <>
                    {showAllContent &&
                        <div className='col-lg-7 column-pad mx-auto' style={{ float: 'none' }}>
                            <div className='hide-on-large-screens-dashboard'>
                                <div className='dashboardTextForMobile'>Home</div>
                                {/* <div onClick={handleViewAllClick} className='dashboardTextForMobile'>Latest News<img src={RightWhiteArrow} width={16} height={16} style={{ objectFit: 'contain', cursor: 'pointer' }} /></div> */}
                            </div>
                            <div className='dashboard'>
                                <div className='d-flex flex-column justify-content-between mb-3' style={{ height: window.innerWidth > 768 ? window.innerHeight - 102 : window.innerHeight - 115 }}>
                                    <div>
                                        <div style={{ marginTop: 12, textAlign: 'center' }}>
                                            <p className='title-header px-3'>Perform AI search across
                                                <span style={{ color: '#4563e4' }}> Financial Markets</span> 
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row px-4 justify-content-center'>
                                        <p className='explore-text mb-auto p-2 text-center' style={{ width: '100%' }}>You may want to explore?</p>
                                        {stockboxData.map((item, index) => (
                                            <div className='col-xl-4 d-flex justify-content-center' key={index} onClick={() => handleClick(item.title)} style={{ cursor: 'pointer' }}>
                                                <div className='stockbox' style={{ width: '100%', maxWidth: '300px' }}>
                                                    <div className='hide-in-mobile'>
                                                        <div className='d-flex justify-content-between'>
                                                            <img src={item.imagesource} className='icon-image' />
                                                            <button className='btn1' >
                                                                <img src={RoundChevronRight} className='icon-image2' />
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <p className='boxheader'>{item.title}</p>
                                                            <p className='boxsubheader'>{item.subtitle}</p>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-between hide-in-desktop'>
                                                        <img src={item.imagesource} className='icon-image' />
                                                        <div style={{ marginLeft: 10 }}>
                                                            <p className='boxheader'>{item.title}</p>
                                                            <p className='boxsubheader'>{item.subtitle}</p>
                                                        </div>
                                                        <button className='btn1' onClick={() => handleClick(item.title)}>
                                                            <img src={RoundChevronRight} className='icon-image2' />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className={window.innerWidth >= 500 ? 'blue-box-alert mx-4 mt-2' : 'blue-box-alert mx-4 mb-0'} style={{ textAlign: 'center' }}>
                                            <div className='d-flex justify-content-center'>
                                                <img src={AlertImg} className='alert-img' />
                                            </div>
                                            <div className='alert-desc'>While we strive to deliver the best actionable insights using AI. Gathering and analyzing company data or videos may take a moment, so we kindly ask for your patience while we process everything!</div>
                                        </div>
                                        <div className={window.innerWidth >= 500 ? 'd-flex justify-content-center mt-3' : 'd-flex justify-content-center mt-2'}>
                                            <p className='blue-box-dashboard alert-desc-dashboard text-center'>Frruit doesn't provide personalized stock advice or buy/sell recommendations.</p>
                                        </div>
                                    </div>
                                    <div className='dashboard-container'>
                                        <div className='suggested-prompts-container'>
                                            <>
                                                <div className='customTab-frruit-gpt hide-in-mobile'>
                                                    <div className='d-flex align-items-center justify-content-center mobile-scroll-Css'>
                                                        <div className='d-flex align-items-center me-3'>
                                                            <div className='tab-name-css'>Choose Search Focus</div>
                                                            <img src={StraightArrowIcon} style={{ width: 20, objectFit: 'contain' }} />
                                                        </div>
                                                        <div className={(flag === 'news' || flag === 'news_bing') ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: (flag === 'news' || flag === 'news_bing') ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                            onClick={() => setFlag('news')}
                                                        > All </div>
                                                        <div className={(flag === 'fund' || flag === 'screener') ? `tab-name-css tab-box-css` : `tab-name-css`} style={{ backgroundColor: (flag === 'fund' || flag === 'screener') ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                            onClick={() => selectedFund === 'Company Data' ? setFlag('fund') : setFlag('screener')}
                                                        > Fundamentals </div>
                                                        {/* <div className={flag === 'youtube' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'youtube' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                            onClick={() => setFlag('youtube')}
                                                        > Videos </div> */}
                                                        <div className={flag === 'reddit' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'reddit' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                            onClick={() => setFlag('reddit')}
                                                        > Social Opinions </div>
                                                    </div>
                                                </div>
                                                <div className='search-dashboard-main d-flex align-items-end'>
                                                    <div class="form-group hide-in-mobile">
                                                        <div style={{ position: 'relative' }}>
                                                            {/* {(flag === 'news' || flag === 'news_bing') &&
                                                                <div className="form-check form-switch checkbox-position hide-in-mobile">
                                                                    <input
                                                                        style={{ cursor: 'pointer' }}
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        onChange={handleWebSearchChange}
                                                                        checked={showWebSearch}
                                                                    /> <span className={showWebSearch ? 'web-search-active' : 'web-search-default'}>Web Search</span>
                                                                </div>
                                                            } */}
                                                            {(flag === 'fund' || flag === 'screener') &&
                                                                <div className="fundDropDownPosition hide-in-mobile" onClick={handleFundClick}>
                                                                    <div className='searchInputDropdowntext'>{selectedFund}<img src={ArrowDownIcon} style={{ width: 24, height: 24, objectFit: 'contain', marginLeft: 5 }} className={showDropdown ? 'rotate-icon rotated' : 'rotate-icon'} /></div>
                                                                </div>
                                                            }
                                                            <input
                                                                className={`${(flag === 'news' || flag === 'news_bing') && question.length > 0 && suggestedQuestionsList.length > 0 ? 'form-control-suggestion' : (flag === 'news' || flag === 'news_bing') ? 'form-control-newsTab' : (flag === 'fund' || flag === 'screener') ? (showDropdown ? 'form-control-funds-only' : 'form-control-fund') : 'form-control'}`}
                                                                style={{ height: 48 }}
                                                                value={question}
                                                                onChange={handleChange}
                                                                placeholder={placeholderText}
                                                                onKeyDown={handleKeyPress}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="form-group hide-in-desktop">
                                                        <div className="form-group hide-in-desktop">
                                                            <div className="responsive-search-box">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div className='header-text-focus'>Select focus</div>
                                                                    <div className="flags-blue-button" onClick={handleFlagShow}>
                                                                        <div className="flag-white-text">
                                                                            {
                                                                                flag === 'news' ? 'All' :
                                                                                    flag === 'fund' ? 'Fundamentals' :
                                                                                        flag === 'youtube' ? 'Videos' :
                                                                                            flag === 'reddit' ? 'Social Media' :
                                                                                                flag === 'news_bing' ? 'News + Web' :
                                                                                                    flag === 'screener' ? 'Screener' :
                                                                                                        'Choose your focus'
                                                                            }
                                                                        </div>
                                                                        <img src={WhiteChevronImg} className="white-chevron" />
                                                                    </div>
                                                                </div>
                                                                <div style={{ position: 'relative' }} className='mt-3 d-flex justify-content-start'>
                                                                    <input
                                                                        className="responsive-input-field w-100"
                                                                        value={question}
                                                                        onChange={handleChange}
                                                                        placeholder='Ask anything'
                                                                        onKeyDown={handleKeyPress}
                                                                    />
                                                                    <img className='send-image' src={SendIconMobile} alt='Send' onClick={() => routePromptFrruitGPT(question, flag)} />            
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img className='send-image hide-in-mobile' src={SendIcon} alt='Send' onClick={() => routePromptFrruitGPT(question, flag)} />
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
                                                {error && <div className='error-message'>Please enter a search query.</div>}
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
                                                {/* Web Search toggle hidden - removed for now */}
                                                {/* {(flag === 'news' || flag === 'news_bing') &&
                                                    <div className="form-check form-switch checkbox-position hide-in-desktop hide-in-mobile">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            onChange={handleWebSearchChange}
                                                        /> <span className={showWebSearch ? 'web-search-active' : 'web-search-default'}>Web Search</span>
                                                    </div>
                                                } */}
                                                {(flag === 'fund') &&
                                                    <div className="fundDropDownPosition hide-in-desktop hide-in-mobile" onClick={handleFundClick}>
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
                    {/* {showAllContent &&
                        // <div className='col-lg-2 column-pad dashboardRightBoxNewsHide'>
                        //     <DashboardRightBox newsData={cmotsNews?.rows} mostFrruitData={mostOnFrruitGpt?.rows} onViewAllClick={handleViewAllClick} />
                        // </div>
                    } */}
                    {!showAllContent && !showPopularOpinions && !showInvestorStories &&
                        <div className='col-lg-9 column-pad'>
                            <NewsViewAll backBtnClick={toggleShowAllContent} sentiment={sentiment} sortOrder={sortOrder} filtersApplied={filtersApplied} onSentimentChange={handleSentimentChange} onSortOrderChange={handleSortOrderChange} onResetFilters={handleResetFilters} newsData={cmotsNews?.rows} />
                        </div>
                    }
                    {!showAllContent && showPopularOpinions && 
                        <div className='col-lg-9 column-pad'>
                            <PopularQuestions mostOnFrruitGpt={mostOnFrruitGpt} handleBackButtonClick={handleBackButtonClick} chatSuggestions={chatSuggestions} handleViewAllClick={handleViewAllClick} />
                        </div>
                    }
                    {!showAllContent && !showPopularOpinions && showInvestorStories &&
                        <div className='col-lg-9 column-pad'>
                            <InvestorStories handleInvestorStoriesBackClick={handleInvestorStoriesBackClick} handleViewAllClick={handleViewAllClick} shouldShowStory={shouldShowStory} storiesData={storiesData} investorStory={investorStory} storyEnum={storyEnum} storyEnum2={storyEnum2} storyViewed={storyViewed} handleShow={handleShow} trendingStocks={trendingStocks} />
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
                                            <div key={index} style={{ position: 'relative', width: 800, height: 470, background: story.themeBg, borderRadius: 20, padding: 20 }} className='mobile-vertical-scroll'>
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
                                        <p className='text'>{text?.question?.replace(/\b\w/g, char => char.toUpperCase())}</p>
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
                <Modal
                    show={show4}
                    onHide={handleFlagClose}
                    size="lg"
                    className="custom-bottom-modal"
                >
                    <Modal.Header className='pb-0'>
                        <div className="modal-header-text">Select focus</div>
                        <img src={CloseImage} style={{ width: 24 }} onClick={handleFlagClose} />
                    </Modal.Header>
                    <Modal.Body className='pt-0'>
                        {flagList.map((item, index) => (
                            <div
                                key={index}
                                className={`${flag === item.flag ? 'active-flag-box' : 'inactive-flag-box'} mt-3`}
                                onClick={() => { setFlag(item.flag); handleFlagClose() }}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: flag === item.flag ? '#F1F4FD' : '',
                                    color: flag === item.flag ? '#4563E4' : '#B4B3B9'
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="flag-name">{item.name}</div>
                                    {flag === item.flag && <img src={SelectedFlagIcon} style={{ width: 20 }} />}
                                </div>
                                <div className="flag-desc mt-2">{item.description}</div>
                            </div>
                        ))}
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default Dashboard;
