import React, { useState, useEffect, useMemo } from 'react';
import LeftBox from '../../components/leftBox/LeftBox';
import DashboardRightBox from '../../components/dashboardRightBox/DashboardRightBox';
import Stories1 from '../../assets/images/stories-icon-1.png';
import Stories2 from '../../assets/images/stories-icon-2.png';
import Stories3 from '../../assets/images/stories-icon-3.png';
import Stories4 from '../../assets/images/stories-icon-4.png';
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
import TrendingStocksCard from '../../components/trendingStocks/TrendingStocksCard';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getInvestorStories, getMostOnFrruitGpt, getStockIndexes, getTrendingNews, getTrendingStocks, setStoryViewed } from './slice';
import { getPromptSuggestion } from '../frruitGPT/slice';
import Loader from '../../components/loader/Loader';
import RightWhiteArrow from '../../assets/images/right-arrow.png';
import NewsViewAll from '../../components/dashboard/NewsViewAll';
import RightArrow from '../../assets/images/right-arrow.png';
import RightBlueArrow from '../../assets/images/blue-right-arrow.png';
import CloseImg from '../../assets/images/close_icon.png';


const storyEnum = {
    Topics_news: 'isTopicViewed',
    Watchlist_news: 'isWatchListViewed',
    Tren_stock_news: 'isStockViewed',
    Trending_news: 'isNewsViewed'
}
const storyEnum2 = {
    Topics_news: 'topicsNews',
    Watchlist_news: 'watchlistNews',
    Tren_stock_news: 'trendingStock',
    Trending_news: 'trendingNews'
}

const storyEnum3 = {
    Topics_news: 'topicsNews',
    Watchlist_news: 'watchlistNews',
    Tren_stock_news: 'trendingStock',
    Trending_news: 'trendingNews'
}


function Dashboard() {
    const PreviousBtn = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick}>
                <img src={PrevBtn} style={{ width: 44, position: 'absolute', top: -110, left: 225 }} />
            </div>
        )
    }
    const NextBtn = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick} style={{ position: 'relative' }}>
                <img src={NextBtnicon} style={{ width: 44, position: 'absolute', top: -110, right: 225 }} />
            </div>
        )
    }
    const PreviousBtn2 = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick}>
                <img src={LeftBtn} style={{ width: 40, position: 'absolute', top: 33, right: -813 }} />
            </div>
        )
    }
    const NextBtn2 = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick}>
                <img src={RightBtn} style={{ width: 40, position: 'absolute', top: 33, right: 35 }} />
            </div>
        )
    }
    const PreviousBtn3 = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick}>
                <img src={LeftBtn} style={{ width: 40, position: 'absolute', top: 40, right: -827 }} />
            </div>
        )
    }
    const NextBtn3 = (props) => {
        const { className, onClick } = props
        return (
            <div className={className} onClick={onClick}>
                <img src={RightBtn} style={{ width: 40, position: 'absolute', top: 40, right: 45 }} />
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
        { src: Stories1, onClick: handleShow, storyType: 'Topics_news' },
        { src: Stories2, onClick: handleShow, storyType: 'Watchlist_news' },
        { src: Stories3, onClick: handleShow, storyType: 'Tren_stock_news' },
        { src: Stories4, onClick: handleShow, storyType: 'Trending_news' },
    ];

    const dispatch = useDispatch()
    const { trendingStocks, trendingNews, mostOnFrruitGpt, storyViewed, investorStory, isLoading, investorStoryLoading, indexLoader, stockIndexes } = useSelector(state => state.dashboardSlice);
    const { chatSuggestions, suggestionLoader } = useSelector(state => state.fruitGPTSlice);


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        swipeToSlide: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    };
    const suggestionSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        swipeToSlide: true,
        // arrows: false,
        autoplay: false,
        autoplaySpeed: 2000,
    };
    const storyImg = {
        dots: false,
        infinite: false,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    };

    const navigate = useNavigate();

    const routePromptFrruitGPT = (question) => {
        if (question) {
            navigate("/frruit-gpt", {
                state: { question },
            });
        }
    };
    const routeNews = (src) => {
            navigate("/news", {
                state: { src },
            });
    };

    useEffect(() => {
        dispatch(getTrendingStocks())
        dispatch(getTrendingNews())
        dispatch(getMostOnFrruitGpt(20))
        dispatch(getPromptSuggestion(4))
        dispatch(getInvestorStories())
        dispatch(getStockIndexes())
    }, [])

    useEffect(() => {
        getStoryData()
    }, [storyType])

    useEffect(() => {
        if (activeIndex === (stories?.length - 1) || (stories?.length === 1 && activeIndex === 0)) {
            dispatch(setStoryViewed(storyType.storyType));
        }
    }, [activeIndex, stories]);

    const shouldShowStory = useMemo(() => (
        (investorStory.topicsNews.length > 0 ||
            investorStory.watchlistNews.length > 0 ||
            investorStory.trendingStock.length > 0 ||
            investorStory.trendingNews.length > 0) ?
            ((investorStory.watchlistNews.length > 0 && !storyViewed.isWatchListViewed) ||
                (investorStory.trendingStock.length > 0 && !storyViewed.isStockViewed) ||
                (investorStory.topicsNews.length > 0 && !storyViewed.isTopicViewed) ||
                (investorStory.trendingNews.length > 0 && !storyViewed.isNewsViewed)) : false
    ), [storyViewed, investorStory])

    const getStoryData = () => {
        const data = investorStory[storyEnum3[storyType.storyType]];
        let tempData = []
        if (data?.length > 0) {
            if (storyType === 'Topics_news') {
                for (const el of data) {
                    tempData.push({
                        themeBg: getRandomColor(),
                        mainHeading: el['title'],
                        storyImage: true,
                        viewImage: el['banner_image'],
                        bottomsubDescription: el['summary'],
                        url: el['URL']
                    })
                }
            } else {
                for (const el of data) {
                    tempData.push({
                        themeBg: getRandomColor(),
                        mainHeading: el['Headline'],
                        storyImage: true,
                        viewImage: el['Image URL'],
                        bottomsubDescription: el['Summary'],
                        url: el['URL']
                    })
                }
            }
        }
        setStories(tempData)
    }

    const colors = ['#4563E4', '#40BC98', '#023047', '#D63230', "#FB8500"]

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
            routePromptFrruitGPT(question);
        }
    };
    return (
        <>
            {
                (indexLoader || isLoading) &&
                <Loader />
            }
            <div className='dashboardHome row justify-content-between m-0'>
                <div className='col-lg-3 column-pad'>
                    <LeftBox />
                </div>
                <>
                    {showAllContent &&
                        <div className='col-lg-7 column-pad'>
                            <div className='dashboard mt-4'>
                                <div className='d-flex flex-column justify-content-between' style={{ height: window.innerHeight - 140 }}>
                                    <div className='d-flex flex-column'>
                                        {
                                            shouldShowStory &&
                                            <div className='dashboard-container'>
                                                <p className='stories-title' style={{ marginBottom: 10 }}>Investors Stories</p>
                                                <div className='d-flex align-items-center' style={{ marginBottom: 20 }}>
                                                    {storiesData.map((img, i) => {
                                                        return (
                                                            !storyViewed[storyEnum[img?.storyType]] && investorStory[storyEnum2[img?.storyType]].length > 0 ?
                                                                <img
                                                                    key={'MStories' + i}
                                                                    style={{ width: 60, objectFit: 'contain', cursor: 'pointer', marginRight: 20 }}
                                                                    src={img.src}
                                                                    onClick={() => handleShow({ storyType: img.storyType })}
                                                                // alt={`Story ${index}`}
                                                                />
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
                                                <p className='stories-title' style={{ marginBottom: 10 }}>Trending Stocks</p>
                                                <p className='stories-title' style={{ marginBottom: 10, color: '#4563E4', cursor: 'pointer', marginRight: 16 }} onClick={handleShow3}>View All</p>
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
                                                    <div className='box-content position-relative' style={{ marginBottom: 28 }}>
                                                        <div className='d-flex align-items-center justify-content-between mb-3'>
                                                            <div className='title'>Most on Frruit</div>
                                                            <div onClick={handleShow2} style={{ cursor: 'pointer', color: '#4563E4', fontWeight: 600 }}>View All</div>
                                                        </div>
                                                        <Slider
                                                            prevArrow={<PreviousBtn2 />}
                                                            nextArrow={<NextBtn2 />}
                                                            {...suggestionSettings}
                                                        >
                                                            {mostOnFrruitGpt?.rows?.slice(0, 4).map((text, index) => (
                                                                <div onClick={() => { routePromptFrruitGPT(text?.question) }} key={index} className='col-lg-6'>
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
                                            {chatSuggestions.length > 0 &&
                                                <>
                                                    <p className='stories-title' style={{ marginBottom: 15 }}>Suggested Prompts</p>
                                                    <div className='row mb-4' >
                                                        <Slider
                                                            prevArrow={<PreviousBtn3 />}
                                                            nextArrow={<NextBtn3 />}
                                                            {...suggestionSettings}>
                                                            {chatSuggestions.slice(0, 4).map((item, index) => (
                                                                <div onClick={() => { routePromptFrruitGPT(item?.prompt) }} key={index} className='col-lg-6 mb-3' style={{ cursor: 'pointer' }}>
                                                                    <div className='prompts-text-bg' style={{ marginRight: 10, cursor: 'pointer' }}>
                                                                        <div className=' d-flex justify-content-between align-items-center w-100' >
                                                                            <p className='prompts-text'>{item?.prompt}</p>
                                                                            <img style={{ width: 24, objectFit: 'contain' }} src={quesIcon} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </Slider>
                                                    </div>
                                                </>
                                            }
                                            <div className='search-dashboard-main'>
                                                <div class="form-group">
                                                    <input
                                                        class="form-control"
                                                        value={question}
                                                        onChange={handleChange}
                                                        placeholder="Type your message here"
                                                        onKeyDown={handleKeyPress}
                                                    />
                                                </div>
                                                <img className='send-image' src={SendIcon} alt='Send' onClick={() => routePromptFrruitGPT(question)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {showAllContent &&
                        <div className='col-lg-2 column-pad'>
                            <DashboardRightBox newsData={trendingNews} mostFrruitData={mostOnFrruitGpt?.rows} onViewAllClick={handleViewAllClick} />
                        </div>
                    }
                    {!showAllContent &&
                        <div className='col-lg-9 column-pad'>
                            <NewsViewAll backBtnClick={toggleShowAllContent} newsData={trendingNews} />
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
                    <Modal.Header style={{ position: 'absolute', right: -300, top: -40 }}>
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
                                            backgroundColor: index === activeIndex ? 'blue' : 'white',
                                            zIndex: 10,
                                            paddingRight: 20,
                                            marginRight: 5,
                                            marginLeft: 5,
                                        }}
                                    />
                                ))}
                            </div>
                            <Slider prevArrow={<PreviousBtn />}
                                nextArrow={<NextBtn />} {...storyImg}>
                                {stories.map((story, index) => {
                                    return (
                                        <div className='d-flex justify-content-center'>
                                            <div key={index} style={{ position: 'relative', width: 800, height: 550, background: story.themeBg, borderRadius: 20, padding: 20 }}>
                                                <div style={{ background: 'white', borderRadius: 20, padding: 16, width: '100%', marginTop: 20, height: 250 }}>
                                                    <img src={story.viewImage} style={{ objectFit: 'cover', borderRadius: 20, filter: 'grayscale(60%)', width: '100%', height: 220 }} />
                                                </div>
                                                <div className='stories-img-text'>{story.mainHeading}</div>
                                                <div className='d-flex justify-content-between align-items-center mt-2'>
                                                    <button className='white-btn-main  d-flex align-items-center justify-content-center' onClick={getFrruitClick} style={{ width: '48%' }}>{'Get Frruit'}  <img src={RightWhiteArrow} style={{ width: 20, objectFit: 'contain', marginLeft: 5 }} /></button>
                                                    <a className='secondary-btn' href={story.url} target='_blank' style={{ textDecoration: 'none', textAlign: 'center', width: '48%' }}> {'View More'}  </a>
                                                </div>
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
                                    <div onClick={() => { routePromptFrruitGPT(text?.question) }} key={index} className='d-flex justify-content-between align-items-center blue-box mb-2' style={{ cursor: 'pointer' }}>
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
                            <div className='header-text'>Trending Stocks</div>
                            <div onClick={() => handleClose3()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                                <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='viewModal2'>
                            <div className='row' style={{marginLeft:0}}>

                                {trendingStocks?.slice(0, 10).map((stockData, index) => (
                                    <div className='col-lg-6 column-pad mb-3'>
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
