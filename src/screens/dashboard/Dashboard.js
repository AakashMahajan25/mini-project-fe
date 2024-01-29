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
import './Dashboard.scss';
import TrendingStocksCard from '../../components/trendingStocks/TrendingStocksCard'

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

function Dashboard() {
    const itemsRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - itemsRef.current.offsetLeft);
        setScrollLeft(itemsRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - itemsRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        itemsRef.current.scrollLeft = scrollLeft - walk;
        requestAnimationFrame(() => handleMouseMove(e));
    };
    return (
        <>
            <div className='dashboardHome row justify-content-between m-0'>
                <div className='col-lg-3 column-pad'>
                    <LeftBox />
                </div>
                <div className='col-lg-7 column-pad'>
                    <div className='dashboard mt-4'>
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
                        <div className='dashboard-container'>
                            <p className='stories-title' style={{ marginBottom: 10 }}>Trending Stocks</p>
                            <div
                                className='scroll-tabs-btn'
                                ref={itemsRef}
                                onMouseDown={handleMouseDown}
                                onMouseLeave={handleMouseLeave}
                                onMouseUp={handleMouseUp}
                                onMouseMove={handleMouseMove}
                            >
                                <div className='d-flex'>
                                    {trendingStocksData.map((stockData, index) => (
                                        <div className='col-lg-6' key={index}>
                                            <div className='me-2' >
                                                <TrendingStocksCard {...stockData} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2 column-pad'>
                    <DashboardRightBox />
                </div>
            </div>
        </>
    )
}

export default Dashboard