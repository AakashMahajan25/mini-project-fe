import React from 'react'
import './ChatGpt.scss'
import ProfileIcon from '../../assets/images/profile_image.png'
import ArrowGrey from '../../assets/images/arrow-right-grey.png'
import DefaultImg from '../../assets/images/market-content-default-img.png'
import LogoCircle from '../../assets/images/frruit-logo-circle.png'
import TataLogo from '../../assets/images/Tata_Consultancy_Services_Logo.png'
import UpGreenArrow from '../../assets/images/up-arrow-outline.png'
import DownRedArrow from '../../assets/images/down-arrow-outline.png'
import Slider from 'react-slick'
import TrendingStocksCard from '../trendingStocks/TrendingStocksCard'
import DiscoverCorrelationGraph from '../graph/DiscoverCorrelationGraph'
import BarChart from '../barChart/BarChart'
import { useSelector } from 'react-redux'
import { replaceNewlinesWithBr } from '../../utils/utils'
import { useLoading, Audio, SpinningCircles, Circles, ThreeDots } from '@agney/react-loading';
import { useLocation } from 'react-router'
import UploadDocImg from '../../assets/images/doc-img.png'
import { useNavigate } from 'react-router-dom';
import quesIcon from '../../assets/images/i-icon.png';

function ChatGpt(props) {
    const { chatSuggestions } = useSelector(state => state.fruitGPTSlice);
    const location = useLocation()
    const path = location.pathname === '/market-content-gpt'
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" color="blue" />,
    });
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8.5,
        swipeToSlide: true,
        arrows: false,
    };

    var stocksettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3.2,
        swipeToSlide: true,
        arrows: false
    };

    var graphSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1.5,
        swipeToSlide: true,
        arrows: false,
    };

    const fundamental = [
        {
            title: 'Market Cap',
            value: '1295'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
        {
            title: 'Market Cap',
            value: '129497.95'
        },
    ]
    const trendingStocksData = [
        {
            stockName: 'TCS',
            ltpLabel: 'LTP',
            ltpValue: '3903',
            percentageChange: '0.5%',
            buyButtonText: 'Buy',
            sellButtonText: 'Sell',
            fruitButtonText: 'Get Frruit',
        },
        {
            stockName: 'TCS',
            ltpLabel: 'LTP',
            ltpValue: '3903',
            percentageChange: '-0.5%',
            buyButtonText: 'Buy',
            sellButtonText: 'Sell',
            fruitButtonText: 'Get Frruit',
        },
        {
            stockName: 'TCS',
            ltpLabel: 'LTP',
            ltpValue: '3903',
            percentageChange: '0.5%',
            buyButtonText: 'Buy',
            sellButtonText: 'Sell',
            fruitButtonText: 'Get Frruit',
        },
        {
            stockName: 'TCS',
            ltpLabel: 'LTP',
            ltpValue: '3903',
            percentageChange: '-0.5%',
            buyButtonText: 'Buy',
            sellButtonText: 'Sell',
            fruitButtonText: 'Get Frruit',
        },
        {
            stockName: 'TCS',
            ltpLabel: 'LTP',
            ltpValue: '3903',
            percentageChange: '0.5%',
            buyButtonText: 'Buy',
            sellButtonText: 'Sell',
            fruitButtonText: 'Get Frruit',
        },
    ];
    const { containerRef, docStatus = false, docName = '', newChat, selectedType } = props;

    const { chatHistory, frruitLoader } = useSelector(state => state.fruitGPTSlice);
    const { contentChatHistory, contentGPTLoader } = useSelector(state => state.contentGPTSlice);
    const renderGraph = (chartData) => {
        const keys = Object.keys(chartData)
        if (keys?.length > 0) {
            let labels = chartData[keys[0]]?.years
            let data = chartData[keys[0]]?.metric_values

            if (data?.length > 0)
                return (
                    <div className='graphSlider' style={{ width: 600 }}>
                        <div className='chartGraph'>
                            <h4 className='title'>{chartData[keys[0]].metric_name}</h4>
                            <DiscoverCorrelationGraph
                                index={1}
                                graphData={{
                                    labels: [...labels].reverse(),
                                    data: [...data].reverse()
                                }}
                            />
                        </div>
                    </div>
                )
        }
    }
    const navigate = useNavigate();
    const routeChangeFrruitGPT = (question) => {
        navigate("/frruit-gpt", {
            state: { question },
        });
    };

    return (
        <>
            <div className='ChatGpt' style={{
                height: path ? window.innerHeight - 200 : window.innerHeight - 250,
                paddingBottom: chatHistory.length === 0 && !path ? 0 : 50,
                marginTop: path ? (contentChatHistory.length === 0 ? 60 : 10) : 60,
                marginBottom: 20,
            }} ref={containerRef}>
                {
                    (newChat && !path) && <div className='default-screens-content mt-4' style={{ height: window.innerHeight - 310 }}>
                            <div className='text-center'>
                                <img src={LogoCircle} width={57} style={{ objectFit: 'contain' }} />
                                <div className='help-text'>How can I help you today ?</div>
                                <div className='row'>
                                    {chatSuggestions.map((item, index) => (
                                        <div key={index} className='col-lg-6 column-pad' style={{ cursor: 'pointer' }} onClick={() => routeChangeFrruitGPT(item?.prompt)}>
                                            <div className='prompts-text-bg'>
                                                <div className=' d-flex justify-content-between align-items-center w-100' >
                                                    <p className='prompts-text'>{item?.prompt}</p>
                                                    <img style={{ width: 24, objectFit: 'contain' }} src={quesIcon} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                }
                {
                   (newChat && path) && <div className='default-screens-content' style={{ height: window.innerHeight - 310 }}>
                            <div className='text-center'>
                                <img src={DefaultImg} width={251.5} height={198.42} style={{ objectFit: 'contain' }} />
                                <div className='help-text'>How can I help you today ?</div>
                                <div className='default-para-text'>Supercharge your investment decisions : Attach documents or YouTube links on capital markets for GPT-driven insights!</div>
                            </div>
                        </div>
                       
                }
                {
                    chatHistory?.map((chat, index) =>
                        chat?.person === 'user' ?
                            <div className='rightChat'>
                                {/* <img src={ProfileIcon} className='profile-styles' /> */}
                                <div className='d-flex align-items-center my-2 floatRight'>
                                    <img src={ArrowGrey} className='arrow' />
                                    <p className='you-text'>You</p>
                                </div>
                                <div className='chat-text-container'>
                                    <h3 className='chat-text'>{chat?.text}</h3>
                                </div>
                            </div>
                            :
                            <div className='leftChat'>
                                {
                                    chatHistory[index - 1]?.person !== "bot" &&
                                    <div className='d-flex align-items-center my-2 floatLeft'>
                                        <img src={ArrowGrey} className='arrow' />
                                        <p className='you-text'>Frruit GPT</p>
                                    </div>
                                }
                                {
                                    chat.type === 'text' ?
                                        <div className='chat-text-container'>
                                            <h3 className='chat-text' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text || '') }}></h3>
                                        </div>
                                        : renderGraph(chat.text)
                                }
                                {
                                    chat.type === 'link' &&
                                    <div className='chat-text-container'>
                                        <h3 className='chat-text' >Key Points</h3>
                                        <h3 className='chat-text mt-1' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text?.Response?.Key_points || '') }}></h3>
                                        <h3 className='chat-text mt-2' >Summary</h3>
                                        <h3 className='chat-text' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text?.Response?.summary || '') }}></h3>
                                        <h3 className='chat-text mt-2' >Sentiment</h3>
                                        <h3 className='chat-text' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text?.Response?.sentiment || '') }}></h3>
                                    </div>

                                }
                                {/* <img src={LogoCircle} className='profile-styles' /> */}

                                {/* {
                    <div className='stock-list'>
                        <div className='d-flex align-items-center'>
                            <div className='image-stock'>
                                <img src={TataLogo} />
                            </div>
                            <div className='stock-text'>
                                <h3 className='stock-title'>TCS</h3>
                                <div className='d-flex align-items-center mt-1'>
                                    <h5 className='stock-subTitle'>LTP</h5>
                                    <h5 className='stock-price-green'>3903</h5>
                                    <h5 className='stock-price-green'>0.5%</h5>
                                    <img src={UpGreenArrow} className='arrow' />
                                </div>
                            </div>
                        </div>
                        <div className='button-stock-list'>
                            <button className='btn-green-buy'>Buy</button>
                            <button className='btn-red-sell'>Sell</button>
                        </div>
                    </div>
                } */}



                                {/* {
                                <div className='graphSlider'>
                                    <Slider {...graphSettings}>
                                        <div className='chartGraph'>
                                            <h4 className='title'>Price Chart</h4>
                                            <DiscoverCorrelationGraph
                                                index={1}
                                                graphData={{
                                                    labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
                                                    data: [800, 650, 300, 550, 852, 157, 900, 350, 1000, 432]
                                                }}
                                            />
                                        </div>
                                        <div className='chartGraph'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h4 className='title'>Financials</h4>
                                                <div className='d-flex align-items-center'>
                                                    <div className='blue-btn me-3' style={{ padding: '8px 33px', cursor: 'pointer' }}>Revenue</div>
                                                    <div className='light-blue-btn me-3' style={{ padding: '8px 33px', cursor: 'pointer' }}>Profit</div>
                                                    <div className='light-blue-btn' style={{ padding: '8px 33px', cursor: 'pointer' }}>Net Worth</div>
                                                </div>
                                            </div>
                                            <BarChart
                                                index={2}
                                                graphData={{
                                                    labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
                                                    data: [800, 650, 300, 550, 852, 157, 900, 350, 1000, 432]
                                                }}
                                            />
                                        </div>
                                    </Slider>
                                </div>

                            } */}

                                {/* <div className='fundamental-container'>
                    <h2 className='fundamental-maintitle'>Fundamentals</h2>
                    <Slider {...settings}>
                        {fundamental.map((fundamental) => (
                            <>
                                <div className='fundamental'>
                                    <h4 className='fundamental-title'>{fundamental?.title}</h4>
                                    <h4 className='fundamental-value'>{fundamental?.value}</h4>
                                </div>
                            </>

                        ))}
                    </Slider>
                </div> */}

                                {/* <div className='fundamental-container'>
                    <h2 className='fundamental-maintitle'>Similar Stocks</h2>
                    <Slider {...stocksettings}>
                        {trendingStocksData.map((stockData, index) => (
                            <TrendingStocksCard {...stockData} />
                        ))}
                    </Slider>
                </div> */}


                            </div>
                    )}

                {(contentChatHistory.length > 0 && docStatus && selectedType === 'attachment') && <div className='rightChat'>
                    {/* <img src={ProfileIcon} className='profile-styles' /> */}
                    <div className='d-flex align-items-center my-2 floatRight'>
                        <img src={ArrowGrey} className='arrow' />
                        <p className='you-text'>You</p>
                    </div>
                    <div className='chat-text-container'>
                        <div className='d-flex'>
                            <div className='attached-doc-white-box'>
                                <img src={UploadDocImg} width={44} style={{ objectFit: 'contain' }} />
                                <div className='pdf-name me-2'>{docName}</div>
                            </div>
                        </div>
                    </div>
                </div>}
                {
                    contentChatHistory?.map((chat, index) =>
                        chat?.person === 'user' ?

                            <div className='rightChat' style={{ marginTop: 0 }}>
                                {/* <img src={ProfileIcon} className='profile-styles' /> */}
                                <div className='d-flex align-items-center my-2 floatRight'>
                                    <img src={ArrowGrey} className='arrow' />
                                    <p className='you-text'>You</p>
                                </div>
                                <div className='chat-text-container'>
                                    <h3 className='chat-text'>{chat?.text}</h3>
                                </div>
                            </div>


                            :
                            <div className='leftChat'>
                                {
                                    contentChatHistory[index - 1]?.person !== "bot" &&
                                    <div className='d-flex align-items-center my-2 floatLeft'>
                                        <img src={ArrowGrey} className='arrow' />
                                        <p className='you-text'>Market Content GPT</p>
                                    </div>
                                }
                                {
                                    chat.type === 'link' ?
                                        <div className='chat-text-container'>
                                            <h3 className='chat-text' style={{ fontWeight: '700' }}>Key Points:-</h3>
                                            <h3 className='chat-text mt-1' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text?.Key_points || '') }}></h3>
                                            <h3 className='chat-text mt-2' style={{ fontWeight: '700' }}>Summary:-</h3>
                                            <h3 className='chat-text mt-1' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text?.summary || '') }}></h3>
                                            <h3 className='chat-text mt-2' style={{ fontWeight: '700' }}>Sentiment:-</h3>
                                            <h3 className='chat-text mt-1' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text?.sentiment || '') }}></h3>
                                        </div>
                                        :
                                        <div className='chat-text-container'>
                                            <h3 className='chat-text mt-1' dangerouslySetInnerHTML={{ __html: replaceNewlinesWithBr(chat?.text || '') }}></h3>
                                        </div>

                                }

                            </div>
                    )}
                {
                    (frruitLoader || contentGPTLoader) &&
                    <section {...containerProps} style={{ marginLeft: 20 }}>
                        {indicatorEl} {/* renders only while loading */}
                    </section>
                }
            </div>
        </>
    )
}

export default ChatGpt