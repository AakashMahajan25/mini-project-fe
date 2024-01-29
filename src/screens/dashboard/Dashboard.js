import React, { useRef, useState } from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftBox from '../../components/leftBox/LeftBox'
import DashboardRightBox from '../../components/dashboardRightBox/DashboardRightBox'
import Stories1 from '../../assets/images/stories-icon-1.png';
import Stories2 from '../../assets/images/stories-icon-2.png';
import Stories3 from '../../assets/images/stories-icon-3.png';
import Stories4 from '../../assets/images/stories-icon-4.png';
import Stories5 from '../../assets/images/stories-icon-5.png';
import SendIcon from '../../assets/images/send_icon.png';
import './Dashboard.scss';
import TrendingStocksCard from '../../components/trendingStocks/TrendingStocksCard'
import Slider from 'react-slick'

const storiesData = [
    { src: Stories1, onClick: () => handleOnClick(1) },
    { src: Stories2, onClick: () => handleOnClick(2) },
    { src: Stories3, onClick: () => handleOnClick(3) },
    { src: Stories4, onClick: () => handleOnClick(4) },
    { src: Stories5, onClick: () => handleOnClick(5) },
    { src: Stories1, onClick: () => handleOnClick(6) },
    { src: Stories2, onClick: () => handleOnClick(7) },
    { src: Stories3, onClick: () => handleOnClick(8) },
    { src: Stories1, onClick: () => handleOnClick(9) },
    { src: Stories2, onClick: () => handleOnClick(10) },
];

function handleOnClick(storyNumber) {
    console.log(`Clicked on story ${storyNumber}`);
}
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

const promptText = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
]
function Dashboard() {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2.3,
        swipeToSlide: true,
        arrows: false
    };
    return (
        <>
            <div className='dashboardHome row justify-content-between m-0'>
                <div className='col-lg-3'>
                    <LeftBox />
                </div>
                <div className='col-lg-7'>
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
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className='dashboard-slider'>
                                    <p className='stories-title' style={{ marginBottom: 10 }}>Trending Stocks</p>
                                    <Slider {...settings}>
                                        {trendingStocksData.map((stockData, index) => (
                                            <TrendingStocksCard {...stockData} />
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                            <div className='dashboard-container'>
                                <div className='suggested-prompts-container'>
                                    <p className='stories-title' style={{ marginBottom: 15 }}>Suggested Prompts</p>
                                    <div className='row' >
                                        {promptText.map((prompts, index) => (
                                            <div className='col-lg-6 mb-3' style={{ cursor: 'pointer' }}>
                                                <div className='prompts-text-bg'>
                                                    <p className='prompts-text'>{prompts}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='search-dashboard-main'>
                                        <div className='text-main-bg'>Type your message here</div>
                                        <img className='send-image' src={SendIcon} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2'>
                    <DashboardRightBox />
                </div>
            </div>
        </>
    )
}

export default Dashboard