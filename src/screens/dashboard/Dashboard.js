import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';



// Mui Dropdown
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography
} from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
import { fetchAllNews, fetchTrendingStocksFromAI, getInvestorStories, getMostOnFrruitGpt, getStockIndexes, getTrendingNews, getTrendingStocks, setStoryIndex, setStoryViewed, getTrendingDashboardData } from './slice';
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
import TrendingStocks from './TrendingStocks';

// Flag components
const FlagIcon = ({ countryCode, size = 20, className = '' }) => {
    const flagUrls = {
        'US': 'https://flagcdn.com/32x24/us.png',
        'IN': 'https://flagcdn.com/32x24/in.png',
        'GB': 'https://flagcdn.com/32x24/gb.png',
        'CA': 'https://flagcdn.com/32x24/ca.png',
        'AU': 'https://flagcdn.com/32x24/au.png',
        'DE': 'https://flagcdn.com/32x24/de.png',
        'FR': 'https://flagcdn.com/32x24/fr.png',
        'JP': 'https://flagcdn.com/32x24/jp.png',
        'CN': 'https://flagcdn.com/32x24/cn.png',
        'BR': 'https://flagcdn.com/32x24/br.png'
    };

    const flagUrl = flagUrls[countryCode];

    if (!flagUrl) {
        return <span style={{ fontSize: '16px' }}>🏳️</span>;
    }

    return (
        <img
            src={flagUrl}
            alt={`${countryCode} flag`}
            className={className}
            style={{
                width: size,
                height: size * 0.75,
                objectFit: 'contain',
                borderRadius: '2px',
                display: 'block'
            }}
        />
    );
};

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
    const [show5, setShow5] = useState(false);
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
    const countryDropdownRef = useRef(null);
    const location = useLocation();
    const countries = [
        { code: 'IN', name: 'India Markets' },
        { code: 'US', name: 'US Markets' },
    ];

    const [showModalWalkthrough, setShowModalWalkthrough] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(() => {
        // Initialize from localStorage or default to India
        const savedCountryCode = localStorage.getItem("selectedCountry");

        if (savedCountryCode) {
            const savedCountryObj = countries.find(
                (country) => country.code === savedCountryCode
            );
            if (savedCountryObj) {
                return savedCountryObj.name;
            } else {
                // Invalid code in localStorage, reset to default
                localStorage.setItem("selectedCountry", "IN");
                return "India";
            }
        }
        // No saved value, set default
        localStorage.setItem("selectedCountry", "IN");
        return "India";
    });
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

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

    const handleCountryShow = () => {
        setShow5(true)
    };

    const handleCountryClose = () => {
        setShow5(false)
    };

    const handleBackButtonClick = () => {
        setShowPopularOpinions(!showPopularOpinions);
        setShowAllContent(true)
    };

    const handleInvestorStoriesBackClick = () => {
        setShowInvestorStories(!showInvestorStories);
        setShowAllContent(true)
    };

    const handleTrendingStocksBackClick = () => {
        setShowTrendingStocks(!showTrendingStocks);
        setShowAllContent(true)
    };

    const stockboxData = [
        {
            imagesource: TrendingStockImg,
            title: 'Trending Stocks for Today',
            subtitle: 'Explore trending stocks for today curated by AI'
        },
        // {
        //     imagesource: ContentSearchImg,
        //     title: 'Content Search',
        //     subtitle: 'Upload documents and videos to extract key insights instantly with AI'
        // },
        {
            imagesource: QuestionImage,
            title: 'Market Summary and Standout Stocks',
            subtitle: 'Get comprehensive market insights and discover trending stocks'
        },
    ]

    const handleClick = (title) => {
        if (title === 'Market Summary and Standout Stocks') {
            setShowPopularOpinions(!showPopularOpinions);
            setShowAllContent(false);
        } else if (title === 'Investor Stories & Trending Stocks') {
            setShowInvestorStories(!showInvestorStories);
            setShowAllContent(false);
        } else if (title === 'Content Search') {
            navigate("/market-content-gpt")
        } else if (title === 'Trending Stocks for Today') {
            setShowTrendingStocks(!showTrendingStocks);
            setShowAllContent(false);
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
        // { name: 'Fundamentals', flag: 'fund', description: 'Compare company fundamentals data, financials, stock screener, and corporate actions' },
        // { name: 'Screener', flag: 'screener', description: 'Screen markets in real time based on your queries' },
        // { name: 'Videos', flag: 'youtube', description: 'Discover insights from videos without watching' },
        { name: 'Social Opinions', flag: 'reddit', description: 'Search discussions and opinions on social media' }
    ];

    const dispatch = useDispatch()
    const { trendingStocks, trendingNews, mostOnFrruitGpt, storyViewed, investorStory, storyIndex, isLoading, investorStoryLoading, indexLoader, stockIndexes, investorStoryError, cmotsNews, marketSummaryData, marketSummaryLoading, marketSummaryError } = useSelector(state => state.dashboardSlice);
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


    const handleCountrySelect = (event) => {
        const countryName = event.target.value; 


        // Prevent selection if already selected
        if (selectedCountry === countryName) {

            return;
        }


        setSelectedCountry(countryName);

        // Find the country code and store it in localStorage
        const selectedCountryObj = countries.find(
            (country) => country.name === countryName
        );


        if (selectedCountryObj) {

            localStorage.setItem("selectedCountry", selectedCountryObj.code);
        } else {
            console.log("ERROR: Country object not found!");
        }
    };

    const handleCountrySelectMobile = (countryName) => {
        // Prevent selection if already selected
        if (selectedCountry === countryName) {
            return;
        }

        setSelectedCountry(countryName);

        // Find the country code and store it in localStorage
        const selectedCountryObj = countries.find(
            (country) => country.name === countryName
        );

        if (selectedCountryObj) {
            localStorage.setItem("selectedCountry", selectedCountryObj.code);
        } else {
            console.log("ERROR: Country object not found!");
        }
    };


    // Ensure selectedCountry is properly initialized from localStorage on mount
    useEffect(() => {
        const savedCountryCode = localStorage.getItem('selectedCountry');
        if (savedCountryCode) {
            const savedCountryObj = countries.find(country => country.code === savedCountryCode);
            if (savedCountryObj && savedCountryObj.name !== selectedCountry) {
                console.log('Correcting selectedCountry from localStorage:', savedCountryObj.name);
                setSelectedCountry(savedCountryObj.name);
            }
        }
    }, []);

    const handleCountryDropdownToggle = () => {
        if (!showCountryDropdown && countryDropdownRef.current) {
            const rect = countryDropdownRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.top - 8, // Position above the button with some margin
                left: rect.right - 200 // Align with the right edge of the button
            });
        }
        setShowCountryDropdown(!showCountryDropdown);
    };

    useEffect(() => {
        if ((!isData)) {
            const currentCountryCode = localStorage.getItem("selectedCountry") || 'IN';
            dispatch(getTrendingStocks(currentCountryCode)).unwrap()
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
            // Get the market from localStorage summaryMarket or default to 'IN'
            const summaryMarket = localStorage.getItem('summaryMarket') || 'IN';
            dispatch(getTrendingDashboardData(summaryMarket)).unwrap()
                .then((res) => {
                    ReactGA.event({
                        category: 'Dashboard',
                        action: 'get_trending_dashboard_data',
                        label: 'Get Trending Dashboard Data'
                    });
                }).catch(err => {
                    console.log('Error fetching trending dashboard data:', err);
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

        // Set trendingCountry to IN whenever Dashboard loads
        localStorage.setItem("trendingCountry", "IN");
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
    const [showTrendingStocks, setShowTrendingStocks] = useState(false);

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
    const placeholderText = (flag === 'news' || flag === 'news_bing') ? 'Search news, summarize & get TLDRs' : (flag === 'fund' || flag === 'screener') ? 'Compare company data, financials,stock screener and actions' : flag === 'youtube' ? 'Discover insights from videos without watching' : 'Search discussions and opinions on social media'

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

    // Click outside handler for country dropdown
    useEffect(() => {
        function handleCountryClickOutside(event) {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setShowCountryDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleCountryClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleCountryClickOutside);
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
                                        {/* <div style={{ marginTop: 12, textAlign: 'center' }}>
                                            <p className='title-header px-3'>Perform AI search across
                                                <span style={{ color: '#4563e4' }}> Financial Markets</span> 
                                            </p>
                                        </div> */}
                                    </div>
                                    <div className='row px-4'>
                                        <div className='mb-4'>
                                            <p className='explore-text mb-3 p-2' style={{ textAlign: 'center' }}>You may want to explore?</p>
                                        </div>
                                        <div className='row justify-content-center' style={{gap: window.innerWidth <= 768 ? 10 : 30}}>
                                            {stockboxData.map((item, index) => (
                                                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mb-3' key={index} onClick={() => handleClick(item.title)} style={{ cursor: 'pointer', flex: '1 1 0', maxWidth: window.innerWidth <= 768 ? 'calc(100% - 10px)' : 'calc(50% - 15px)' }}>
                                                    <div className='stockbox' style={{ width: '100%', minHeight: window.innerWidth <= 768 ? '100px' : '140px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                                                        <div className='hide-in-mobile' style={{ flex: 1 }}>
                                                            <div className='d-flex justify-content-between'>
                                                                {/* <img src={item.imagesource} className='icon-image' /> */}
                                                                <button className='btn1' style={{ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)' }}>
                                                                    <img src={RoundChevronRight} className='icon-image2' />
                                                                </button>
                                                            </div>
                                                            <div style={{ paddingRight: '50px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                                <p className='boxheader' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                                                                <p className='boxsubheader'>{item.subtitle}</p>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-center hide-in-desktop'>
                                                            {/* <img src={item.imagesource} className='icon-image' /> */}
                                                            <div style={{ marginLeft: window.innerWidth <= 768 ? 8 : 10, flex: 1, paddingRight: window.innerWidth <= 768 ? '8px' : '10px' }}>
                                                                <p className='boxheader' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: window.innerWidth <= 768 ? '14px' : 'inherit' }}>{item.title}</p>
                                                                <p className='boxsubheader' style={{ fontSize: window.innerWidth <= 768 ? '12px' : 'inherit' }}>{item.subtitle}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        {/* <div className={window.innerWidth >= 500 ? 'blue-box-alert mx-4 mt-2' : 'blue-box-alert mx-4 mb-0'} style={{ textAlign: 'center' }}>
                                            <div className='d-flex justify-content-center'>
                                                <img src={AlertImg} className='alert-img' />
                                            </div>
                                            // {/* <div className='alert-desc'>While we strive to deliver the best actionable insights using AI. Gathering and analyzing company data or videos may take a moment, so we kindly ask for your patience while we process everything!</div> 
                                        </div> */}

                                    </div>
                                    <div className='dashboard-container'>
                                        <div className={window.innerWidth >= 500 ? 'd-flex justify-content-center mt-3' : 'd-flex justify-content-center mt-2'}>
                                            <p className='blue-box-dashboard alert-desc-dashboard text-center'>Frruit doesn't provide personalized stock advice or buy/sell recommendations.</p>
                                        </div>
                                        <div className='suggested-prompts-container'>
                                            <>
                                                <div className='customTab-frruit-gpt hide-in-mobile'>
                                                    <div className='d-flex align-items-center justify-content-between mobile-scroll-Css'>
                                                        <div className='d-flex align-items-center'>
                                                            <FormControl
                                                                sx={{
                                                                    background: "#F1F4FD",
                                                                    borderRadius: "8px",
                                                                    border: "1px solid #E8ECFF",
                                                                    minWidth: "160px",
                                                                    width: "180px",
                                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                                        border: "none"
                                                                    },
                                                                    "&:hover": {
                                                                        background: "#E8ECFF"
                                                                    }
                                                                }}
                                                            >
                                                                <Select
                                                                    labelId="country-label"
                                                                    value={selectedCountry}
                                                                    onChange={handleCountrySelect}
                                                                    displayEmpty
                                                                    sx={{
                                                                        height: "36px",
                                                                        px: 1.5,
                                                                        fontSize: "14px",
                                                                        fontWeight: "500",
                                                                        color: "#4563E4",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        "& .MuiSelect-select": {
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            py: 0,
                                                                            pr: "24px !important"
                                                                        },
                                                                        "& .MuiSelect-icon": {
                                                                            color: "#4563E4"
                                                                        }
                                                                    }}
                                                                    renderValue={(value) => {
                                                                        if (!value) return "Select a country";
                                                                        const country = countries.find((c) => c.name === value);
                                                                        return (
                                                                            <Box display="flex" alignItems="center">
                                                                                <Box
                                                                                    sx={{
                                                                                        width: "16px",
                                                                                        height: "12px",
                                                                                        display: "flex",
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        marginRight: "6px",
                                                                                        borderRadius: "2px",
                                                                                        overflow: "hidden"
                                                                                    }}
                                                                                >
                                                                                    <FlagIcon countryCode={country?.code} size={16} />
                                                                                </Box>
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontWeight: 500,
                                                                                        fontSize: "14px",
                                                                                        color: "#4563E4",
                                                                                        whiteSpace: "nowrap",
                                                                                        overflow: "hidden",
                                                                                        textOverflow: "ellipsis"
                                                                                    }}
                                                                                >
                                                                                    {country?.name}
                                                                                </Typography>
                                                                            </Box>
                                                                        );
                                                                    }}
                                                                    MenuProps={{
                                                                        PaperProps: {
                                                                            sx: {
                                                                                borderRadius: "8px",
                                                                                border: "1px solid #E8ECFF",
                                                                                backgroundColor: "white",
                                                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                                                                mt: -1
                                                                            }
                                                                        },
                                                                        anchorOrigin: {
                                                                            vertical: 'top',
                                                                            horizontal: 'left',
                                                                        },
                                                                        transformOrigin: {
                                                                            vertical: 'bottom',
                                                                            horizontal: 'left',
                                                                        }
                                                                    }}
                                                                >
                                                                    {countries.map((country) => (
                                                                        <MenuItem
                                                                            key={country.code}
                                                                            value={country.name}
                                                                            sx={{
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                height: "40px",
                                                                                padding: "8px 12px",
                                                                                fontSize: "14px",
                                                                                fontWeight: "500",
                                                                                color: "#4563E4",
                                                                                backgroundColor: "transparent",
                                                                                "&.Mui-selected": {
                                                                                    backgroundColor: "#F1F4FD",
                                                                                    color: "#4563E4"
                                                                                },
                                                                                "&:hover": {
                                                                                    backgroundColor: "#F1F4FD"
                                                                                }
                                                                            }}
                                                                        >
                                                                            <Box marginRight="8px">
                                                                                <FlagIcon countryCode={country.code} size={16} />
                                                                            </Box>
                                                                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#4563E4" }}>
                                                                                {country.name}
                                                                            </Typography>
                                                                            {selectedCountry === country.name && (
                                                                                <Box
                                                                                    sx={{
                                                                                        width: "6px",
                                                                                        height: "6px",
                                                                                        backgroundColor: "#4563E4",
                                                                                        borderRadius: "50%",
                                                                                        marginLeft: "auto"
                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                            <img src={StraightArrowIcon} style={{ width: 20, objectFit: 'contain', marginLeft: 10, marginRight: 10 }} />
                                                            <div className={(flag === 'news' || flag === 'news_bing') ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: (flag === 'news' || flag === 'news_bing') ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                                onClick={() => setFlag('news')}
                                                            > All </div>
                                                            {/* <div className={(flag === 'fund' || flag === 'screener') ? `tab-name-css tab-box-css` : `tab-name-css`} style={{ backgroundColor: (flag === 'fund' || flag === 'screener') ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                                onClick={() => selectedFund === 'Company Data' ? setFlag('fund') : setFlag('screener')}
                                                            > Fundamentals </div> */}
                                                            {/* <div className={flag === 'youtube' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'youtube' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                                onClick={() => setFlag('youtube')}
                                                            > Videos </div> */}
                                                            <div className={flag === 'reddit' ? `tab-name-css tab-box-css me-2` : `tab-name-css me-2`} style={{ backgroundColor: flag === 'reddit' ? '#F1F4FD' : '', color: '#4563E4', cursor: 'pointer' }}
                                                                onClick={() => setFlag('reddit')}
                                                            > Social Opinions </div>
                                                        </div>
                                                        {/* <div className='country-dropdown position-relative'>
                                                            <button
                                                                ref={countryDropdownRef}
                                                                className='country-selector-btn d-flex align-items-center justify-content-between'
                                                                onClick={handleCountryDropdownToggle}
                                                                style={{
                                                                    background: 'white',
                                                                    border: '1px solid #dee2e6',
                                                                    borderRadius: '12px',
                                                                    padding: '12px 16px',
                                                                    fontSize: '14px',
                                                                    fontWeight: '500',
                                                                    cursor: 'pointer',
                                                                    minWidth: '180px',
                                                                    height: '48px',
                                                                    color: '#2c3e50',
                                                                    pointerEvents: "auto"
                                                                }}
                                                            >
                                                                <div className='d-flex align-items-center' style={{ flex: 1 }}>
                                                                    <div style={{
                                                                        width: '24px',
                                                                        height: '18px',
                                                                        marginRight: '10px',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        borderRadius: '2px',
                                                                        overflow: 'hidden',
                                                                        backgroundColor: 'transparent'
                                                                    }}>
                                                                        <FlagIcon countryCode={countries.find(c => c.name === selectedCountry)?.code} size={24} />
                                                                    </div>
                                                                    <span style={{
                                                                        fontWeight: '600',
                                                                        color: '#2c3e50',
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis'
                                                                    }}>
                                                                        {selectedCountry}
                                                                    </span>
                                                                </div>
                                                                <div style={{
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    marginLeft: '8px'
                                                                }}>
                                                                    <img
                                                                        src={ArrowDownIcon}
                                                                        style={{
                                                                            width: '16px',
                                                                            height: '16px',
                                                                            transform: showCountryDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                                                                            transition: 'transform 0.3s ease',
                                                                            filter: 'brightness(0.6)'
                                                                        }}
                                                                        alt='dropdown'
                                                                    />
                                                                </div>
                                                            </button>

                                                            {showCountryDropdown && ReactDOM.createPortal(
                                                                <div
                                                                    className="country-dropdown-overlay"
                                                                    style={{
                                                                        position: 'fixed',
                                                                        top: 0,
                                                                        left: 0,
                                                                        right: 0,
                                                                        bottom: 0,
                                                                        zIndex: 9999,
                                                                        background: 'transparent'
                                                                    }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setShowCountryDropdown(false);
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="country-dropdown-menu"
                                                                        style={{
                                                                            position: 'fixed',
                                                                            top: `${dropdownPosition.top}px`,
                                                                            left: `${dropdownPosition.left}px`,
                                                                            background: 'white',
                                                                            border: '1px solid #dee2e6',
                                                                            borderRadius: '12px',
                                                                            zIndex: 10000,
                                                                            minWidth: '200px',
                                                                            width: '200px',
                                                                            pointerEvents: 'auto',
                                                                            maxHeight: '300px',
                                                                            overflowY: 'auto',
                                                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                                                        }}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Prevent overlay click
                                                                        }}
                                                                    >
                                                                        {countries.map((country, index) => (
                                                                            <div
                                                                                key={country.code}
                                                                                className="country-option d-flex align-items-center"
                                                                                onClick={(e) => {
                                                                                    console.log("ITEM CLICK START", country.name);
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    handleCountrySelect(country.name);
                                                                                    console.log("ITEM CLICK END");
                                                                                }}
                                                                                onMouseDown={(e) => {
                                                                                    // Prevent button from losing focus
                                                                                    e.preventDefault();
                                                                                }}
                                                                                style={{
                                                                                    padding: '12px 16px',
                                                                                    cursor: 'pointer',
                                                                                    borderBottom: index < countries.length - 1 ? '1px solid #f1f3f4' : 'none',
                                                                                    backgroundColor: selectedCountry === country.name ? '#e3f2fd' : 'transparent',
                                                                                    borderRadius:
                                                                                        index === 0
                                                                                            ? '12px 12px 0 0'
                                                                                            : index === countries.length - 1
                                                                                                ? '0 0 12px 12px'
                                                                                                : '0',
                                                                                    height: '48px',
                                                                                    transition: 'background-color 0.2s ease'
                                                                                }}
                                                                                onMouseEnter={(e) => {
                                                                                    if (selectedCountry !== country.name) {
                                                                                        e.target.style.backgroundColor = '#f8f9fa';
                                                                                    }
                                                                                }}
                                                                                onMouseLeave={(e) => {
                                                                                    if (selectedCountry !== country.name) {
                                                                                        e.target.style.backgroundColor = 'transparent';
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <div style={{ marginRight: '12px' }}>
                                                                                    <FlagIcon countryCode={country.code} size={22} />
                                                                                </div>
                                                                                <span style={{ pointerEvents: 'none' }}>{country.name}</span>
                                                                                {selectedCountry === country.name && (
                                                                                    <div
                                                                                        style={{
                                                                                            width: '8px',
                                                                                            height: '8px',
                                                                                            backgroundColor: '#1565c0',
                                                                                            borderRadius: '50%',
                                                                                            marginLeft: 'auto',
                                                                                            pointerEvents: 'none'
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>,
                                                                document.body
                                                            )}
                                                        </div> */}

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
                                                                    <div className="d-flex" style={{ gap: '8px' }}>
                                                                        <div className="flags-blue-button" onClick={handleCountryShow} style={{ minWidth: 'auto', padding: '6px 12px' }}>
                                                                            <div className="flag-white-text d-flex align-items-center">
                                                                                <div style={{
                                                                                    width: '16px',
                                                                                    height: '12px',
                                                                                    marginRight: '4px',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    borderRadius: '2px',
                                                                                    overflow: 'hidden'
                                                                                }}>
                                                                                    <FlagIcon countryCode={countries.find(c => c.name === selectedCountry)?.code} size={16} />
                                                                                </div>
                                                                                {countries.find(c => c.name === selectedCountry)?.code}
                                                                            </div>
                                                                            <img src={WhiteChevronImg} className="white-chevron" />
                                                                        </div>
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
                    {!showAllContent && !showPopularOpinions && !showInvestorStories && !showTrendingStocks &&
                        <div className='col-lg-12 column-pad'>
                            <NewsViewAll backBtnClick={toggleShowAllContent} sentiment={sentiment} sortOrder={sortOrder} filtersApplied={filtersApplied} onSentimentChange={handleSentimentChange} onSortOrderChange={handleSortOrderChange} onResetFilters={handleResetFilters} newsData={cmotsNews?.rows} />
                        </div>
                    }
                    {!showAllContent && showPopularOpinions &&
                        <div className='col-lg-12 column-pad'>
                            <PopularQuestions
                                mostOnFrruitGpt={mostOnFrruitGpt}
                                handleBackButtonClick={handleBackButtonClick}
                                chatSuggestions={chatSuggestions}
                                handleViewAllClick={handleViewAllClick}
                                marketSummaryData={marketSummaryData}
                                marketSummaryLoading={marketSummaryLoading}
                                marketSummaryError={marketSummaryError}
                                dispatch={dispatch}
                            />
                        </div>
                    }
                    {!showAllContent && !showPopularOpinions && showInvestorStories &&
                        <div className='col-lg-12 column-pad'>
                            <InvestorStories handleInvestorStoriesBackClick={handleInvestorStoriesBackClick} handleViewAllClick={handleViewAllClick} shouldShowStory={shouldShowStory} storiesData={storiesData} investorStory={investorStory} storyEnum={storyEnum} storyEnum2={storyEnum2} storyViewed={storyViewed} handleShow={handleShow} trendingStocks={trendingStocks} />
                        </div>
                    }
                    {!showAllContent && !showPopularOpinions && !showInvestorStories && showTrendingStocks &&
                        <div className='col-lg-12 column-pad'>
                            <TrendingStocks handleBackButtonClick={handleTrendingStocksBackClick} trendingStocks={trendingStocks} />
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
                            <div className='row' style={{ marginLeft: 0, marginRight: 0 }}>

                                {trendingStocks?.map((stockData, index) => (
                                    <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-3 px-2 pointer'>
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
                <Modal
                    show={show5}
                    onHide={handleCountryClose}
                    size="lg"
                    className="custom-bottom-modal"
                >
                    <Modal.Header className='pb-0'>
                        <div className="modal-header-text">Select market</div>
                        <img src={CloseImage} style={{ width: 24 }} onClick={handleCountryClose} />
                    </Modal.Header>
                    <Modal.Body className='pt-0'>
                        {countries.map((country, index) => (
                            <div
                                key={index}
                                className={`${selectedCountry === country.name ? 'active-flag-box' : 'inactive-flag-box'} mt-3`}
                                onClick={() => { handleCountrySelectMobile(country.name); handleCountryClose() }}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: selectedCountry === country.name ? '#F1F4FD' : '',
                                    color: selectedCountry === country.name ? '#4563E4' : '#B4B3B9'
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div style={{
                                            width: '20px',
                                            height: '15px',
                                            marginRight: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '2px',
                                            overflow: 'hidden'
                                        }}>
                                            <FlagIcon countryCode={country.code} size={20} />
                                        </div>
                                        <div className="flag-name">{country.name}</div>
                                    </div>
                                    {selectedCountry === country.name && <img src={SelectedFlagIcon} style={{ width: 20 }} />}
                                </div>
                            </div>
                        ))}
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default Dashboard;
