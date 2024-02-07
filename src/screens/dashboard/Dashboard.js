import React, { useState, useEffect } from 'react';
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
import { getMostOnFrruitGpt, getTrendingNews, getTrendingStocks } from './slice';
import { getPromptSuggestion } from '../frruitGPT/slice';

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

    const handleShow = () => {
        setShow(true);
    };

    const storiesData = [
        { src: Stories1, onClick: handleShow },
        { src: Stories2, onClick: handleShow },
        { src: Stories3, onClick: handleShow },
        { src: Stories4, onClick: handleShow },
        { src: Stories5, onClick: handleShow },
        { src: Stories1, onClick: handleShow },
        { src: Stories2, onClick: handleShow },
        { src: Stories3, onClick: handleShow },
        { src: Stories1, onClick: handleShow },
        { src: Stories2, onClick: handleShow },
    ];

    const promptText = [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    ];
    const dispatch = useDispatch()
    const { trendingStocks, trendingNews, mostOnFrruitGpt } = useSelector(state => state.dashboardSlice);
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
    }, [])


    return (
        <div className='dashboardHome row justify-content-between m-0'>
            <div className='col-lg-3 column-pad'>
                <LeftBox />
            </div>
            <div className='col-lg-7 column-pad'>
                <div className='dashboard mt-4'>
                    <div className='d-flex flex-column justify-content-between' style={{ height: window.innerHeight - 170 }}>
                        <div className='d-flex flex-column'>
                            <div className='dashboard-container'>
                                <p className='stories-title' style={{ marginBottom: 10 }}>Investors Stories</p>
                                <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 20 }}>
                                    {storiesData.map((story, index) => (
                                        <img
                                            key={index}
                                            style={{ width: 60, objectFit: 'contain', cursor: 'pointer' }}
                                            src={story.src}
                                            onClick={story.onClick}
                                            alt={`Story ${index}`}
                                        />
                                    ))}
                                </div>
                            </div>
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
                            {[...new Array(storyImages?.length)].map((value, index) => (
                                <div
                                    key={index}
                                    className='col'
                                    style={{
                                        top: '10px',
                                        height: 6,
                                        borderRadius: 10,
                                        backgroundColor: index === activeIndex ? 'white' : 'blue',
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
                            {storyImages.map((image, index) => {
                                return (
                                    <div className='d-flex justify-content-center'>
                                        <div key={index} style={{ position: 'relative' }}>
                                            <img src={image.src} width={720} height={500} style={{ objectFit: 'cover', borderRadius: 25 }} />
                                            <div className='stories-img-text'>{image.text}</div>
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
