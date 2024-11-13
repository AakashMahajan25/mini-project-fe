import React, { useState } from 'react'
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import RightWhiteArrow from '../../assets/images/right-arrow.png';
import TrendingStocksCard from '../../components/trendingStocks/TrendingStocksCard';
import Modal from 'react-bootstrap/Modal';
import CloseImg from '../../assets/images/close_icon.png';

function InvestorStories({ handleInvestorStoriesBackClick, handleViewAllClick, shouldShowStory, storiesData, investorStory, storyEnum, storyEnum2, storyViewed, handleShow, trendingStocks }) {

    const [showTrendingStocks, setShowTrendingStocks] = useState(false);

    const handleShowTrendingStocks = () => {
        setShowTrendingStocks(true);
    };
    const handleCloseTrendingStocks = () => {
        setShowTrendingStocks(false);
    };

    return (
        <>
            <div className='hide-on-large-screens-dashboard'>
                <div className='dashboardTextForMobile'>Home</div>
                <div onClick={handleViewAllClick} className='dashboardTextForMobile'>Latest News<img src={RightWhiteArrow} width={16} height={16} style={{ objectFit: 'contain', cursor: 'pointer' }} /></div>
            </div>
            <div className='popular-questions-css'>
                <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                    <button onClick={handleInvestorStoriesBackClick} className='light-blue-btn me-2'><img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />Back</button>
                </div>
                <div className='heading-text'>Investor Stories & Trending Stocks </div>
                <div className='desc-text mt-2'>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</div>
                {
                    shouldShowStory &&
                    <div className='dashboard-container'>
                        <p className='stories-title' style={{ marginBottom: 10 }}>Investors Stories</p>
                        <div className='d-flex align-items-start mobile-scroll-dashboard'>
                            {storiesData.map((img, i) => {
                                return (
                                    !storyViewed[storyEnum[img?.storyType]] && investorStory[storyEnum2[img?.storyType]]?.length > 0 ?
                                        <div className='d-flex flex-column align-items-center' style={{ marginRight: 20, cursor: 'pointer' }} onClick={() => handleShow({ storyType: img.storyType })}>
                                            <div key={'MStories' + i} className='d-flex align-items-center justify-content-center storyOuterContainer' style={{ border: `1px solid ${img?.color}`, borderRadius: 35 }}>
                                                <p className='storyCircleInnerText' style={{ background: img?.lightBackground, borderRadius: 25, textAlign: 'center', fontWeight: '700', color: img?.color }}>{img?.title.slice(0, 1)}
                                                </p>
                                            </div>
                                            <p style={{ marginBottom: 0, fontSize: 13, color: '#6F7387', fontWeight: '500', textAlign: 'center' }}>{img?.title}</p>
                                        </div>
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
                        <p className='stories-title'>Trending stocks for today</p>
                        <p className='stories-title marginCustomDashboard' style={{ marginBottom: 10, color: '#4563E4', cursor: 'pointer' }} onClick={handleShowTrendingStocks}>View All</p>
                    </div>
                    <div className='row hide-in-mobile'>
                        {trendingStocks?.slice(0, 12).map((stockData, index) => (
                            <div className='col-lg-3 col-6 pe-0' style={{marginTop: 16}}>
                                <TrendingStocksCard key={index} {...stockData} />
                            </div>
                        ))}
                    </div>
                    <div className='row hide-in-desktop'>
                        {trendingStocks?.slice(0, 6).map((stockData, index) => (
                            <div className='col-lg-3 col-6 pe-0' style={{marginTop: 20}}>
                                <TrendingStocksCard key={index} {...stockData} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                show={showTrendingStocks}
                onHide={handleCloseTrendingStocks}
                size='lg'
                className='viewModal2'
                scrollable
                centered
            >
                <Modal.Header>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className='header-text'>Trending stocks for today</div>
                        <div onClick={() => handleCloseTrendingStocks()} className=' align-items-center' style={{ cursor: 'pointer' }}>
                            <img src={CloseImg} className='me-1' width={32} style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='viewModal2'>
                        <div className='row' style={{ marginLeft: 0 }}>
                            {trendingStocks?.map((stockData, index) => (
                                <div className='col-lg-6 column-pad mb-3 pointer'>
                                    <TrendingStocksCard key={index} {...stockData} />
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default InvestorStories