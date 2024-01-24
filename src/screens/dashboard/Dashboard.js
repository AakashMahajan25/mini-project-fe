import React from 'react'
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

const storiesData = [
    { src: Stories1, onClick: () => handleOnClick(1) },
    { src: Stories2, onClick: () => handleOnClick(2) },
    { src: Stories3, onClick: () => handleOnClick(3) },
    { src: Stories4, onClick: () => handleOnClick(4) },
    { src: Stories5, onClick: () => handleOnClick(5) },
    { src: Stories1, onClick: () => handleOnClick(6) },
    { src: Stories2, onClick: () => handleOnClick(7) },
    { src: Stories3, onClick: () => handleOnClick(8) },
];

function handleOnClick(storyNumber) {
    console.log(`Clicked on story ${storyNumber}`);
}

function Dashboard() {
    return (
        <>
            <TopBar />
            <StockPriceScroll />
            <div className='row justify-content-between m-0'>
                <div className='col-lg-2'>
                    <LeftBox />
                </div>
                <div className='col-lg-8'>
                    <div className='dashboard mt-4'>
                        <div className='dashboard-container'>
                            <p className='stories-title' style={{ marginBottom: 10 }}>Investors Stories</p>
                            <div className='d-flex justify-content-between align-items-center' style={{marginBottom:20}}>
                                {storiesData.map((story, index) => (
                                    <img
                                        key={index}
                                        style={{ width: 75, objectFit: 'contain', cursor: 'pointer' }}
                                        src={story.src}
                                        onClick={story.onClick}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='dashboard-container'>
                        <p className='stories-title' style={{ marginBottom: 10 }}>Trending Stocks</p>
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