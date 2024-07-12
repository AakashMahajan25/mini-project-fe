import React, { useEffect, useRef, useState } from 'react';
import TabsMui from '@mui/material/Tabs';
import TabMui from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftBox from '../../components/leftBox/LeftBox'
import './DiscoverCorrelation.scss';
import EventExplorerCard from '../../components/eventExplorerCard/EventExplorerCard';
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import BuySellStockCard from '../../components/buySellStockCard/BuySellStockCard';
import { Modal, Nav, Tab, Tabs } from 'react-bootstrap'
import DiscoverCorrelationGraph from '../../components/graph/DiscoverCorrelationGraph';
import { useDispatch, useSelector } from 'react-redux';
import { deductEventCredits, getTrendingEvents } from './slice';
import BarChart from '../../components/barChart/BarChart';
import { getStockIndexes } from '../dashboard/slice';
import { Graph } from "react-d3-graph";
import FullScreenIcon from '../../assets/images/ic_baseline_fullscreen.png'
import { toast } from 'react-toastify';
import SingleBarGraph from '../../components/singleBarGraph/SingleBarGraph';
import CloseImg from '../../assets/images/close_icon.png';
import SearchIcon from '../../assets/images/search-icon.png';
// import NetworkGraph from '../../components/networkGraph/NetworkGraph';
import ReactGA from 'react-ga4';
import Slider from 'react-slick';
import LeftArrow from '../../assets/images/LeftArrow.png'
import Rightarrow from '../../assets/images/RightArrow.png';
import StockImage from '../../assets/images/SimilarDays 1.png';
import ReturnsImage from '../../assets/images/ReturnsImage.png';
import EarthIcon from '../../assets/images/earth_icon.png';
import EconomicIcon from '../../assets/images/Economy_icon.png';
import ArrowRight from '../../assets/images/arrows_right.png';
import Search from '../../assets/images/Search.png';


function DiscoverCorrelation() {
    // const [showEventDetails, setShowEventDetails] = useState(false);
    // const [eventDetails, setEventDetails] = useState(false);
    // const dispatch = useDispatch()
    // const { trendingEvents } = useSelector(state => state.discoverCorrelationSlice);
    // const [show, setShow] = useState(false);
    // const [show3, setShow3] = useState(false);
    // const [value, setValue] = useState(0);
    // const [tickers, setTickers] = useState();
    // const [avgReturns, setAvgReturns] = useState();
    // const [showReturns, setShowReturns] = useState(true);
    // const [showConnections, setShowConnections] = useState(false);
    const [showLeftBox, setShowLeftBox] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            setShowLeftBox(window.innerWidth >= 769);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sliderRef = useRef(null);

    const goToPrev = () => {
        sliderRef.current.slickPrev();
    };

    const goToNext = () => {
        sliderRef.current.slickNext();
    };

    // const handleCardClick = async (data) => {
    //     dispatch(deductEventCredits(`?event_id=${data?.id}`)).unwrap().then(res => {
    //         setShowEventDetails(true);
    //         setEventDetails(data);
    //     }).catch(error => {
    //         toast.error(error.message || 'Event click validation Error')
    //     })
    // };
    // const handleBackButtonClick = () => {
    //     setShowEventDetails(false);
    // };

    // const tabData = [
    //     { label: 'Regulatory Event' },
    //     { label: 'Corporate Action Events' },
    //     { label: 'Capital Market Events' },
    //     { label: 'Regulatory Event2' },
    //     { label: 'Corporate Action Events2' },
    //     { label: 'Capital Market Events2' },
    //     { label: 'Regulatory Event3' },
    //     { label: 'Corporate Action Events3' },
    //     { label: 'Capital Market Events3' },
    //     { label: 'Regulatory Event4' },
    //     { label: 'Corporate Action Events4' },
    //     { label: 'Capital Market Events4' },
    // ];
    // const stockData = [
    //     {
    //         companyName: 'TCS',
    //         ltpValue: 3903,
    //         percentageChange: 0.5,
    //         changeInLastMonth: +41.86
    //     },
    //     {
    //         companyName: 'Infosys',
    //         ltpValue: 1850,
    //         percentageChange: -0.8,
    //         changeInLastMonth: -12.5
    //     },
    //     {
    //         companyName: 'Infosys',
    //         ltpValue: 1850,
    //         percentageChange: -0.8,
    //         changeInLastMonth: -12.5
    //     },
    // ];

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    // const graphData = () => {
    //     const ticker = [];
    //     const avgReturn = [];
    //     const reversedTickers = eventDetails?.response?.result_tickers?.slice().reverse(); // Reverse the tickers first
    //     reversedTickers.forEach(item => {
    //         ticker.push(item.ticker);
    //         avgReturn.push(item.avg_return.replace('%', ''));
    //     });
    //     setTickers(ticker);
    //     setAvgReturns(avgReturn);
    // };

    // useEffect(() => {
    //     dispatch(getTrendingEvents());
    //     dispatch(getStockIndexes())
    // }, []);

    // useEffect(() => {
    //     if (eventDetails) {
    //         graphData();
    //     }
    // }, [eventDetails])
    // const colors = ['#00E7F2', '#FDD8FF', '#D2F9BD', "#FFBCAB", "#D7B69F"]

    // const getRandomColor = () => {
    //     const randomIndex = Math.floor(Math.random() * colors.length);
    //     return colors[randomIndex];
    // }
    // const data = {
    //     nodes: [
    //         {
    //             "id": "Nvidia",
    //             "type": "Organization",
    //             "label": "Nvidia"
    //         },
    //         {
    //             "id": "S&P 500",
    //             "type": "Index",
    //             "label": "S&P 500"
    //         },
    //         {
    //             "id": "Dan H",
    //             "type": "Person",
    //             "label": "Dan H"
    //         },
    //         {
    //             "id": "Josh Schaer",
    //             "type": "Person",
    //             "label": "Josh Schaer"
    //         },
    //         {
    //             "id": "Amd",
    //             "type": "Organization",
    //             "label": "Amd"
    //         },
    //         {
    //             "id": "Intel",
    //             "type": "Organization",
    //             "label": "Intel"
    //         },
    //         {
    //             "id": "Options Ai",
    //             "type": "Organization",
    //             "label": "Options Ai"
    //         },
    //         {
    //             "id": "Microsoft",
    //             "type": "Organization",
    //             "label": "Microsoft"
    //         },
    //         {
    //             "id": "Google",
    //             "type": "Organization",
    //             "label": "Google"
    //         },
    //         {
    //             "id": "Azure",
    //             "type": "Product",
    //             "label": "Azure"
    //         },
    //         {
    //             "id": "Gemma",
    //             "type": "Product",
    //             "label": "Gemma"
    //         }
    //     ],
    //     edges: [
    //         {
    //             "from": "Nvidia",
    //             "to": "S&P 500",
    //             "label": "CONTRIBUTED_TO",
    //             "overall_sentiment": "Negative",
    //             "overall_score": -0.7,
    //             "colour": "red"
    //         },
    //         {
    //             "from": "Dan H",
    //             "to": "Nvidia",
    //             "label": "DISCUSSES",
    //             "overall_sentiment": "Neutral",
    //             "overall_score": 0.0,
    //             "colour": "blue"
    //         },
    //         {
    //             "from": "Josh Schaer",
    //             "to": "Nvidia",
    //             "label": "DISCUSSES",
    //             "overall_sentiment": "Neutral",
    //             "overall_score": 0.0,
    //             "colour": "blue"
    //         },
    //         {
    //             "from": "Amd",
    //             "to": "Nvidia",
    //             "label": "COMPETITOR",
    //             "overall_sentiment": "Neutral",
    //             "overall_score": 0.0,
    //             "colour": "blue"
    //         },
    //         {
    //             "from": "Intel",
    //             "to": "Nvidia",
    //             "label": "COMPETITOR",
    //             "overall_sentiment": "Neutral",
    //             "overall_score": 0.0,
    //             "colour": "blue"
    //         },
    //         {
    //             "from": "Options Ai",
    //             "to": "Nvidia",
    //             "label": "ANALYSES",
    //             "overall_sentiment": "Neutral",
    //             "overall_score": 0.0,
    //             "colour": "blue"
    //         },
    //         {
    //             "from": "Microsoft",
    //             "to": "Azure",
    //             "label": "OWNS",
    //             "overall_sentiment": "Neutral",
    //             "overall_score": 0.0,
    //             "colour": "blue"
    //         },
    //         {
    //             "from": "Google",
    //             "to": "Gemma",
    //             "label": "OWNS",
    //             "overall_sentiment": "Neutral",
    //             "overall_score": 0.0,
    //             "colour": "blue"
    //         }
    //     ],
    // };


    // data.nodes.forEach(node => {
    //     node.shape = "circle";
    //     node.color = getRandomColor();
    // });


    // const myConfig = {
    //     automaticRearrangeAfterDropNode: true,
    //     collapsible: true,
    //     directed: true,
    //     focusAnimationDuration: 0.75,
    //     focusZoom: 1,
    //     freezeAllDragEvents: false,
    //     highlightDegree: 2,
    //     highlightOpacity: 0.2,
    //     linkHighlightBehavior: true,
    //     maxZoom: 12,
    //     minZoom: 0.05,
    //     nodeHighlightBehavior: true,
    //     panAndZoom: false,
    //     staticGraph: false,
    //     staticGraphWithDragAndDrop: false,
    //     d3: {
    //         alphaTarget: 0.05,
    //         gravity: -100,
    //         linkLength: 100,
    //         linkStrength: 2,
    //         disableLinkForce: false
    //     },
    //     node: {
    //         color: "#d3d3d3",
    //         fontColor: "black",
    //         fontSize: 13,
    //         fontWeight: "normal",
    //         highlightColor: "#4563E4",
    //         highlightFontSize: 15,
    //         highlightFontWeight: "bold",
    //         highlightStrokeColor: "#4563E4",
    //         highlightStrokeWidth: 1.5,
    //         labelPosition: "",
    //         mouseCursor: "crosshair",
    //         opacity: 0.9,
    //         renderLabel: true,
    //         size: 200,
    //         strokeColor: "none",
    //         strokeWidth: 1.5,
    //         svg: "",
    //         symbolType: "circle",
    //         viewGenerator: null,
    //         labelProperty: 'name',
    //     },
    //     link: {
    //         color: "lightgray",
    //         fontColor: "black",
    //         fontSize: 10,
    //         fontWeight: "normal",
    //         highlightColor: "#4563E4",
    //         highlightFontSize: 13,
    //         highlightFontWeight: "normal",
    //         labelProperty: "label",
    //         mouseCursor: "pointer",
    //         opacity: 1,
    //         renderLabel: true,
    //         semanticStrokeWidth: true,
    //         strokeWidth: 2,
    //         markerHeight: 2,
    //         markerWidth: 2,
    //         type: "STRAIGHT",
    //         selfLinkDirection: "TOP_RIGHT",
    //         strokeDasharray: 0,
    //         strokeDashoffset: 0,
    //         strokeLinecap: "butt"
    //     }
    // };
    // const myConfigModal = {
    //     nodeHighlightBehavior: true,
    //     linkHighlightBehavior: true,
    //     height: window.innerHeight - 70,
    //     width: window.innerWidth,
    //     node: {
    //         size: 500,
    //         highlightStrokeColor: "#4563E4",
    //         labelProperty: 'name',
    //         fontSize: 14,
    //         highlightFontSize: 14,
    //     },
    //     link: {
    //         highlightColor: "#4563E4",
    //         strokeLinecap: 'round',
    //         renderLabel: true,
    //         fontSize: 12,
    //         highlightFontSize: 12,
    //     },
    // };

    //   const onClickNode = function(nodeId) {
    //     window.alert(`Clicked node ${nodeId}`);
    //   };

    //   const onClickLink = function(source, target) {
    //     window.alert(`Clicked link between ${source} and ${target}`);
    //   };
    // const handleShow = () => {
    //     setShow(true);
    // }
    // const returnClick = () => {
    //     ReactGA.event({
    //         category: 'Event Explorer',
    //         action: 'stock_performance_asper_returns',
    //         label: 'Stock Performance As Per Returns'
    //     });
    //     setShowConnections(false);
    //     setShowReturns(true);
    // }
    // const connectionsClick = () => {
    //     ReactGA.event({
    //         category: 'Event Explorer',
    //         action: 'stock_performance_asper_connections',
    //         label: 'Stock Performance As Per Connections'
    //     });
    //     setShowConnections(true);
    //     setShowReturns(false);
    // }
    // const handleShow2 = () => {
    //     setShow3(true);
    // };
    // const handleClose2 = () => {
    //     setShow3(false);
    // };

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <>
            <div className='row justify-content-between m-0'>
                {showLeftBox && (
                    <div className='col-xl-3 col-lg-4 column-pad'>
                        <LeftBox />
                    </div>
                )}

                <div className='col-xl-9 col-lg-8 column-pad Discover-Correlation-css'>
                    <div className='DiscoverCorrelationHeightDiv'>
                        {/* {!showEventDetails && (
                            <>
                                <div className='d-flex justify-content-start Discover-Correlation-container align-items-center'>
                                    <div className='title' style={{ marginBottom: 20 }}>Event Explorer</div> */}
                        {/* <div className='viewAllTeaxt' style={{ marginBottom: 20 }} onClick={handleShow2}>View All</div> */}
                        {/* </div>
                                <div className='d-flex justify-content-start Discover-Correlation-container align-items-center'>
                                <Box marginBottom={'20px'} sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
                                    <TabsMui
                                        value={value}
                                        onChange={handleChange}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable auto tabs example"
                                    >
                                        {tabData?.slice(0, window.innerWidth < 600 ? 1 : 4).map((tab, index) => (
                                            <TabMui key={index} label={tab.label} className='tab-css' />
                                        ))}
                                    </TabsMui>
                                </Box>
                                <div className='viewAllTeaxt' style={{ marginBottom: 25 }} onClick={handleShow2}>View All</div>
                                </div>
                                <div className='row Discover-Correlation-container-row row-gutter'>
                                    {trendingEvents?.map((eventData, index) => (
                                        <div key={index} className='col-lg-4 column-pad'>
                                            <EventExplorerCard
                                                question={eventData?.question}
                                                category={eventData?.response?.category}
                                                onCardClick={() => handleCardClick(eventData)}
                                                buttonTextColor={index % 2 === 0 ? '#40BC98' : '#D63230'}
                                                buttonBackgroundColor={index % 2 === 0 ? 'rgba(64, 188, 152, 0.1)' : 'rgba(214, 50, 48, 0.1)'}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )} */}
                        {/* {showEventDetails &&
                            <>
                                <div className='d-flex justify-content-start align-items-center Discover-Correlation-container' style={{ marginBottom: 20 }}>
                                    <button onClick={handleBackButtonClick} className='light-blue-btn me-2'><img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />Back</button>
                                    <div className='title'>Event Explorer</div>
                                </div>
                                <div className='Discover-Correlation-container'>
                                    <div className='box'>
                                        <div className='title' style={{ marginBottom: 10 }}>{eventDetails?.question}</div>
                                        <div className='light-blue-btn' style={{ marginBottom: 10 }}>{eventDetails?.response?.category}</div>
                                        <div >
                                            <div className='custom-tab-css'>
                                                <div className='d-flex align-items-center'>
                                                    <div className={`tab-css me-2`} style={{ backgroundColor: showReturns ? '#4563E4' : '#E5EAFF', color: showReturns ? '#fff' : '#4563E4' }}
                                                        onClick={returnClick}
                                                    > Return </div>
                                                    <div className={`tab-css`} style={{ backgroundColor: showConnections ? '#4563E4' : '#E5EAFF', color: showConnections ? '#fff' : '#4563E4' }}
                                                        onClick={connectionsClick}
                                                    > Connections </div>
                                                </div>
                                            </div>
                                            {
                                                showReturns &&
                                                <>
                                                    <div className='title-2' style={{ marginBottom: 10 }}>Stocks that get affected the most  (in %)</div>
                                                    <div className='row'>
                                                        <div className='col-lg-3 buySellStockCardSec'>
                                                            <div>
                                                                {eventDetails?.response?.result_tickers?.slice().reverse().map((stock, index) => (
                                                                    <BuySellStockCard
                                                                        key={index}
                                                                        companyName={stock.ticker}
                                                                        ltpValue={stock.ltpValue}
                                                                        percentageChange={stock.avg_return}
                                                                        changeInLastMonth={stock.changeInLastMonth}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9 column-pad customMarginForGraph'>
                                                            <SingleBarGraph
                                                                graphData={{
                                                                    labels: tickers,
                                                                    data: avgReturns
                                                                }}
                                                                index={3}
                                                                yAxisLabel={`Money`}
                                                                xAxisLabel={`Date`}
                                                                showXAxis={false}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            } */}
                        {/* {
                                                showConnections &&
                                                <>

                                                    <div className='title-2' style={{ marginBottom: 10 }}>Stocks that get affected the most  (in %)</div>
                                                    <div className='row'>
                                                        <div className='col-lg-5 eventDetailsCustomHeight'>
                                                            {eventDetails?.response?.similar_dates?.slice().reverse().map((label, index) => (
                                                                <div key={index} className='blue-box-label'>{label?.description}</div>
                                                            ))}
                                                        </div> */}
                        {/* <div className='col-lg-7' style={{ overflow: 'hidden', marginTop: -50, position: 'relative' }}>
                                                        <div style={{ position: 'relative', border: '1px solid #4563E4', borderRadius: 8, padding: 10 }}>
                                                            <div onClick={handleShow} style={{ position: 'absolute', right: 20, top: 0, display: 'flex', alignItems: 'center', cursor: 'pointer', backgroundColor: "white", padding: 5, zIndex: 100 }}>
                                                                <div style={{ color: '#4563E4' }}>Full Screen</div>
                                                                <img src={FullScreenIcon} width={24} top={24} />
                                                            </div>
                                                            <NetworkGraph height={'400px'} 
                                                            nodes={data.nodes}
                                                            edges={data.edges}
                                                            />
                                                        </div>
                                                    </div> */}
                        {/* </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        } */}


                    </div>
                    <div className='slider-sec-card'>
                        <p className='text-center coming-text'>Coming Soon !!</p>
                        <section>
                            <div className="container">
                                {/* <p className='main-heading'>Coming Soon!!</p> */}
                                <div className="row justify-content-between">
                                    <div className="col-lg-6">
                                        <div className="input-group position-relative search mb-3">
                                            <input
                                                type="text"
                                                className="form-control position-relative"
                                                placeholder="Search Market Events"
                                                aria-label="Search"
                                                value='Search Market Events'
                                                disabled
                                            />
                                            <div className="">
                                                <img
                                                    className="search-iconn position-absolute top-50 end-0 "
                                                    src={Search}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center card-inner-white-text pl-4 py-4 mt-4'>
                                            <div className="d-block mr-3">
                                                <h3 className="black-header black-header-custom" style={{ marginRight: 50, marginBottom: 20 }}>Interest rate changes impact on tech stocks</h3>
                                                <div className='d-flex align-items-center fifth-blue-box col-lg-2'>
                                                    <img src={EarthIcon} className="earth-icon mr-2" alt="" />
                                                    <p className="fifth-para-blue">
                                                        Macroeconomic Announcements
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={ArrowRight} className="arrow-right mr-5" alt="" />
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center card-inner-white-text pl-4 py-4 mt-4'>
                                            <div className="d-block mr-1">
                                                <h3 className="black-header">Impact on Railway stocks due to government policies</h3>
                                                <div className='d-flex align-items-center fifth-purple-box'>
                                                    <img src={EconomicIcon} className="earth-icon mr-2" alt="" />
                                                    <p className="fifth-para-red ">
                                                        Economic Policies
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={ArrowRight} className="arrow-right mr-5" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 GraphSlider">
                                        <div className="swiper swiper2">
                                            <div className="swiper-wrapper mt-3">
                                                <Slider ref={sliderRef} {...settings}>
                                                    <div className="swiper-slide">
                                                        <div className="">
                                                            <div className='container'>
                                                                <div className='d-flex justify-content-center'>
                                                                    <img src={StockImage} className="graph-banner" alt="" />
                                                                </div>
                                                                <h1 className="mb-0 pb-0 primary-header" style={{ fontSize: 35 }}>
                                                                    Similar Days
                                                                </h1>
                                                                <p className="primary-subheading">
                                                                    Identify the similar days of the past that get flagged through AI driven pattern recognition
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="swiper-slide">
                                                        <div className='container'>
                                                            <div className='d-flex justify-content-center'>
                                                                <img src={ReturnsImage} className="graph-banner" alt="" />
                                                            </div>
                                                            <h1 className="mb-0 pb-0 primary-header" style={{ fontSize: 35 }}>
                                                                Similar Days
                                                            </h1>
                                                            <p className="primary-subheading">
                                                                Identify the similar days of the past that get flagged through AI driven pattern recognition
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="swiper-slide">
                                                        <div className="">
                                                            <div className='container'>
                                                                <div className='d-flex justify-content-center'>
                                                                    <img src={ReturnsImage} className="graph-banner" alt="" />
                                                                </div>
                                                                <h1 className="mb-0 pb-0 primary-header" style={{ fontSize: 35 }}>
                                                                    Similar Days
                                                                </h1>
                                                                <p className="primary-subheading">
                                                                    Identify the similar days of the past that get flagged through AI driven pattern recognition
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Slider>
                                            </div>
                                            <div className="d-flex justify-content-center custom-btn">
                                                <button className="btn-arrow" onClick={goToPrev}>
                                                    <img className="s-icon" src={LeftArrow} alt="" />
                                                </button>
                                                <button className="btn-arrow ms-4" onClick={goToNext}>
                                                    <img className="s-icon" src={Rightarrow} alt="" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* <Modal show={show} fullscreen={true} onHide={() => setShow(false)} style={{ backgroundColor: '#fefefe' }}> */}
            {/* <Modal.Header closeButton>
                    <Modal.Title>Relation Graph</Modal.Title>
                </Modal.Header> */}
            {/* <NetworkGraph
                    height={window.innerHeight - 50}
                    nodes={data.nodes}
                    edges={data.edges}
                /> */}
            {/* </Modal> */}
            {/* <Modal show={show3}
                onHide={handleClose2}
                size='lg'
                className='selectmodalclass'
                scrollable
                centered
            >
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center w-100'>
                        <div className='searchbar-css'>
                            <div className="position-relative">
                                <input type="text" style={{ backgroundColor: 'white' }} className="form-control form-control-search input-width-css" placeholder='Search Preferences' />
                                <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                                    <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                                </div>
                            </div>
                        </div>
                        <div className=' align-items-center' onClick={handleClose2} style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='viewModal2'>
                        <div className='row' style={{ marginLeft: 0 }}>
                            {tabData.map((item, index) => (
                                <div key={index} className='selected'>{item.label}</div>
                            ))}
                            {tabData.map((item, index) => (
                                <div key={index} className='unSelected'>{item.label}</div>
                            ))}

                        </div>
                    </div>
                </Modal.Body>
            </Modal> */}
        </>
    )
}

export default DiscoverCorrelation
