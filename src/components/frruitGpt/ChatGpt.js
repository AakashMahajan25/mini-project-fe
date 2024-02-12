import React from 'react'
import './ChatGpt.scss'
import ProfileIcon from '../../assets/images/profile_image.png'
import ArrowGrey from '../../assets/images/arrow-right-grey.png'
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

function ChatGpt(props) {
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
    const { containerRef } = props;

    const { chatHistory } = useSelector(state => state.fruitGPTSlice);

    return (
        <div className='ChatGpt' style={{ height: window.innerHeight - 290 }} ref={containerRef}>
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
                            {/* <img src={LogoCircle} className='profile-styles' /> */}
                            <div className='d-flex align-items-center my-2 floatLeft'>
                                <img src={ArrowGrey} className='arrow' />
                                <p className='you-text'>Frruit GPT</p>
                            </div>

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

                            <div className='chat-text-container'>
                                <h3 className='chat-text' dangerouslySetInnerHTML={{__html: replaceNewlinesWithBr(chat?.text || '')}}></h3>
                            </div>

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
        </div>
    )
}

export default ChatGpt