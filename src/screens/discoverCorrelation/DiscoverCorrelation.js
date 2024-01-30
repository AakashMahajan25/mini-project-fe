import React, { useRef, useState } from 'react'
import TopBar from '../../components/topBar/TopBar'
import StockPriceScroll from '../../components/stockPriceScroll/StockPriceScroll'
import LeftBox from '../../components/leftBox/LeftBox'
import './DiscoverCorrelation.scss';
import EventExplorerCard from '../../components/eventExplorerCard/EventExplorerCard';
import BackBtnArrow from '../../assets/images/back-btn-arrow.png';
import BuySellStockCard from '../../components/buySellStockCard/BuySellStockCard';
import { Nav, Tab, Tabs } from 'react-bootstrap'
import DiscoverCorrelationGraph from '../../components/graph/DiscoverCorrelationGraph';

function DiscoverCorrelation() {
    const itemsRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showEventDetails, setShowEventDetails] = useState(false);

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

    const handleCardClick = () => {
        setShowEventDetails(true);
    };
    const handleBackButtonClick = () => {
        setShowEventDetails(false);
    };

    const tabData = [
        { label: 'Regulatory Event' },
        { label: 'Corporate Action Events' },
        { label: 'Capital Market Events' },
        { label: 'Regulatory Event2' },
        { label: 'Corporate Action Events2' },
        { label: 'Capital Market Events2' },
        { label: 'Regulatory Event3' },
        { label: 'Corporate Action Events3' },
        { label: 'Capital Market Events3' },
        { label: 'Regulatory Event4' },
        { label: 'Corporate Action Events4' },
        { label: 'Capital Market Events4' },
    ];
    const eventDataList = [
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#ECEFFC',
            buttonTextColor: '#4563E3'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#D632301A',
            buttonTextColor: '#D63230'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#40BC981A',
            buttonTextColor: '#40BC98'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#ECEFFC',
            buttonTextColor: '#4563E3'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#ECEFFC',
            buttonTextColor: '#4563E3'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#D632301A',
            buttonTextColor: '#D63230'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#D632301A',
            buttonTextColor: '#D63230'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#40BC981A',
            buttonTextColor: '#40BC98'
        },
        {
            title: 'Indian Stocks Likely to be impacted by budget 2024',
            eventType: 'Regulatory Event',
            buttonLabel: 'Know more',
            buttonBackgroundColor: '#40BC981A',
            buttonTextColor: '#40BC98'
        },
    ];
    const stockData = [
        {
            companyName: 'TCS',
            ltpValue: 3903,
            percentageChange: 0.5,
            changeInLastMonth: +41.86
        },
        {
            companyName: 'Infosys',
            ltpValue: 1850,
            percentageChange: -0.8,
            changeInLastMonth: -12.5
        },
        {
            companyName: 'Infosys',
            ltpValue: 1850,
            percentageChange: -0.8,
            changeInLastMonth: -12.5
        },
    ];
    const blueBoxLabels = [
        'IT Sector in India is expected to benefit from the 2024 budget.',
        'Telecom sectors in India is anticipated to gain from the 2024 budget.',
        'Indias Fintech Industry is expected to see benefits from the 2024 budget.',
        'The semiconductor Industry in India is anticipated to benefit from the 2024 budget.',
        'The Digital Gaming Sector in India is expected to gain from the 2024 budget.',
        'Indias EV Industry is anticipated to benefit from the 2024 budget.',
    ];
    return (
        <>
            <div className='row justify-content-between m-0'>
                <div className='col-lg-3 column-pad'>
                    <LeftBox />
                </div>
                <div className='col-lg-9 column-pad Discover-Correlation-css'>
                    <div className='Discover-Correlation-container mt-4'>
                        {!showEventDetails && (
                            <>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='title' style={{ marginBottom: 20 }}>Event Explorer</div>
                                    <div className='viewAllTeaxt' style={{ marginBottom: 20 }}>View All</div>
                                </div>
                                <div
                                    className='scroll-tabs-btn'
                                    ref={itemsRef}
                                    onMouseDown={handleMouseDown}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseUp={handleMouseUp}
                                    onMouseMove={handleMouseMove}
                                >
                                    <Nav variant="pills" defaultActiveKey={tabData[0].label}>
                                        {tabData.map((tab, index) => (
                                            <Nav.Item key={`${tab.label}-${index}`}>
                                                <Nav.Link className='me-3' eventKey={tab.label}>{tab.label}</Nav.Link>
                                            </Nav.Item>
                                        ))}
                                    </Nav>
                                </div>
                                <div className='row'>
                                    {eventDataList.map((eventData, index) => (
                                        <div key={index} className='col-lg-4 column-pad'>
                                            <EventExplorerCard {...eventData} onCardClick={handleCardClick} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {showEventDetails &&
                            <>
                                <div className='d-flex justify-content-start align-items-center' style={{ marginBottom: 20 }}>
                                    <button onClick={handleBackButtonClick} className='light-blue-btn me-2'><img src={BackBtnArrow} style={{ width: 7, height: 13, objectFit: 'contain', marginRight: 5, marginTop: -2 }} />Back</button>
                                    <div className='title'>Event Explorer</div>
                                </div>
                                <div className='box'>
                                    <div className='title' style={{ marginBottom: 10 }}>Indian Stocks Likely to be impacted be budget 2024</div>
                                    <div className='light-blue-btn' style={{ marginBottom: 10 }}>Regulatory Event</div>
                                    <div >
                                        <Tab.Container defaultActiveKey="first">
                                            <Nav className='customDiscoverCorrelationtabs' variant="pills">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first">Returns</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second">Connections</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                            <Tab.Content className='mt-3'>
                                                <Tab.Pane eventKey="first">
                                                    <div className='title-2' style={{ marginBottom: 10 }}>Stocks that get affected the most  (in %)</div>
                                                    <div className='row'>
                                                        <div className='col-lg-3'>
                                                            <div>
                                                                {stockData.map((stock, index) => (
                                                                    <BuySellStockCard
                                                                        key={index}
                                                                        companyName={stock.companyName}
                                                                        ltpValue={stock.ltpValue}
                                                                        percentageChange={stock.percentageChange}
                                                                        changeInLastMonth={stock.changeInLastMonth}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-9 column-pad'>
                                                            <DiscoverCorrelationGraph
                                                                graphData={{
                                                                    labels: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
                                                                    data: [800, 650, 300, 550, 852, 157, 900, 350, 1000, 432]
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <div className='title-2' style={{ marginBottom: 10 }}>Stocks that get affected the most  (in %)</div>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            {blueBoxLabels.map((label, index) => (
                                                                <div key={index} className='blue-box-label'>{label}</div>
                                                            ))}
                                                        </div>
                                                        <div className='col-lg-6'>

                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Tab.Container>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiscoverCorrelation
