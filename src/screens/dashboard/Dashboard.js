import React, { useState, useEffect, useMemo } from 'react';
import LeftBox from '../../components/leftBox/LeftBox';
import DashboardRightBox from '../../components/dashboardRightBox/DashboardRightBox';
import Stories1 from '../../assets/images/stories-icon-1.png';
import Stories2 from '../../assets/images/stories-icon-2.png';
import Stories3 from '../../assets/images/stories-icon-3.png';
import Stories4 from '../../assets/images/stories-icon-4.png';
import Stories5 from '../../assets/images/stories-icon-5.png';
import StoriesImg from '../../assets/images/stories-img-1.png';
import StoriesImg2 from '../../assets/images/stories-img-2.png';
import PrevBtn from '../../assets/images/prev-btn.png';
import NextBtnicon from '../../assets/images/next-btn.png';
import SendIcon from '../../assets/images/send_icon.png';
import './Dashboard.scss';
import TrendingStocksCard from '../../components/trendingStocks/TrendingStocksCard';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getInvestorStories, getMostOnFrruitGpt, getStockIndexes, getTrendingNews, getTrendingStocks } from './slice';
import { getPromptSuggestion } from '../frruitGPT/slice';


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
            <div className={className} onClick={onClick}>
                <img src={NextBtnicon} style={{ width: 44, position: 'absolute', top: -110, right: 225 }} />
            </div>
        )
    }

    const [show, setShow] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [storyIndex, setStoryIndex] = useState(0);
    const [showOverlay, setShowOverlay] = useState(false);
    const [stories, setStories] = useState([]);
    const [storyType, setStoryType] = useState([]);


    const handleShow = (data) => {
        console.log('data::::::::::', data)
        setStoryType(data)
        setShow(true);
    };

    const storiesData = [
        { src: Stories1, onClick: handleShow, storyType: 'Topics_news' },
        { src: Stories2, onClick: handleShow, storyType: 'Watchlist_news' },
        { src: Stories3, onClick: handleShow, storyType: 'Tren_stock_news' },
        { src: Stories4, onClick: handleShow, storyType: 'Trending_news' },
    ];

    const dispatch = useDispatch()
    const { trendingStocks, trendingNews, mostOnFrruitGpt, storyViewed, investorStory, } = useSelector(state => state.dashboardSlice);
    const { chatSuggestions } = useSelector(state => state.fruitGPTSlice);


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2.3,
        swipeToSlide: true,
        arrows: false,
        beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    };
    const storyImg = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    };

    const storyImages = [
        { src: StoriesImg, text: 'Lorem Ipsum is simply dummy text 1' },
        { src: StoriesImg2, text: 'Lorem Ipsum is simply dummy text 2' },
        { src: StoriesImg, text: 'Lorem Ipsum is simply dummy text 3' },
        { src: StoriesImg2, text: 'Lorem Ipsum is simply dummy text 4' },
        { src: StoriesImg, text: 'Lorem Ipsum is simply dummy text 5' },
        { src: StoriesImg2, text: 'Lorem Ipsum is simply dummy text 6' },
    ];

    const navigate = useNavigate();
    const routeChangeFrruitGPT = () => {
        let path = `/frruit-gpt`;
        navigate(path);
    };

    const routePromptFrruitGPT = (question) => {
        navigate("/frruit-gpt", {
            state: { question },
        });

    };

    useEffect(() => {
        dispatch(getTrendingStocks())
        dispatch(getTrendingNews())
        dispatch(getMostOnFrruitGpt())
        dispatch(getPromptSuggestion(4))
        dispatch(getInvestorStories())
        dispatch(getStockIndexes())
    }, [])

    useEffect(() => {
        getStoryData()
    }, [storyType])
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
        console.log('data', data)
        let tempData = []
        if (data?.length > 0) {
            if (storyType === 'Topics_news') {
                for (const el of data) {
                    tempData.push({
                        themeBg: getRandomColor(),
                        mainHeading: el['title'],
                        storyImage: true,
                        viewImage: el['banner_image'],
                        bottomsubDescription: el['summary']
                    })
                }
            } else {
                for (const el of data) {
                    tempData.push({
                        themeBg: getRandomColor(),
                        mainHeading: el['Headline'],
                        storyImage: true,
                        viewImage: el['Image URL'],
                        bottomsubDescription: el['Summary']
                    })
                }
            }
        }
        setStories(tempData)
    }



    console.log('investorStory', investorStory)
    console.log('stories', stories)
    console.log('storytype', storyType)
    console.log('storyEnum3[storyType]', storyEnum3[storyType])

    const colors = ['#4563E4', '#40BC98', '#023047', '#D63230', "#FB8500"]

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    return (
        <div className='dashboardHome row justify-content-between m-0'>
            <div className='col-lg-3 column-pad'>
                <LeftBox />
            </div>
            <div className='col-lg-7 column-pad'>
                <div className='dashboard mt-4'>
                    <div className='d-flex flex-column justify-content-between' style={{ height: window.innerHeight - 170 }}>
                        <div className='d-flex flex-column'>
                            {
                            shouldShowStory&&
                            <div className='dashboard-container'>
                                <p className='stories-title' style={{ marginBottom: 10 }}>Investors Stories</p>
                                <div className='d-flex align-items-center' style={{ marginBottom: 20 }}>
                                    {storiesData.map((img, i) => {
                                        return (
                                            !storyViewed[storyEnum[img?.storyType]] && investorStory[storyEnum2[img?.storyType]].length > 0 ?
                                                <img
                                                    key={'MStories' + i}
                                                    style={{ width: 60, objectFit: 'contain', cursor: 'pointer',marginRight: 20 }}
                                                    src={img.src}
                                                    onClick={()=>handleShow({ storyType: img.storyType })}
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
                                <p className='stories-title' style={{ marginBottom: 10 }}>Trending Stocks</p>
                                <Slider {...settings}>
                                    {trendingStocks.map((stockData, index) => (
                                        <TrendingStocksCard key={index} {...stockData} />
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <div className='dashboard-container'>
                            <div className='suggested-prompts-container'>
                                <p className='stories-title' style={{ marginBottom: 15 }}>Suggested Prompts</p>
                                <div className='row' >
                                    {chatSuggestions.map((item, index) => (
                                        <div onClick={() => { routePromptFrruitGPT(item?.prompt) }} key={index} className='col-lg-6 mb-3' style={{ cursor: 'pointer' }}>
                                            <div className='prompts-text-bg'>
                                                <p className='prompts-text'>{item?.prompt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='search-dashboard-main' onClick={routeChangeFrruitGPT}>
                                    <div className='text-main-bg'>Type your message here</div>
                                    <img className='send-image' src={SendIcon} alt='Send' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-2 column-pad'>
                <DashboardRightBox newsData={trendingNews} mostFrruitData={mostOnFrruitGpt?.rows} />
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-custom-modal-styling-title"
                size="lg"
                centered
                className='custom-modal'
            >
                <Modal.Header closeButton>
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
                            {stories.map((image, index) => {
                                return (
                                    <div className='d-flex justify-content-center'>
                                        <div key={index} style={{ position: 'relative' }}>
                                            <img src={image.viewImage} width={720} height={500} style={{ objectFit: 'cover', borderRadius: 25 }} />
                                            <div className='stories-img-text'>{image.bottomsubDescription}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Dashboard;
